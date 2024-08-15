const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./db')
const sendVerificationEmail = require('./mailer');
const session = require('express-session');
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend origin
    credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not client JavaScript
        secure: false,  // Set to true if your app is served over HTTPS (false for local dev)
        maxAge: 1000 * 60 * 15 // 15 minutes
    }
}));


async function getAllUsers(username) {
    const query = `SELECT * FROM users`;
    return new Promise((resolve, reject) => {
        db.all(query, [username], (error, rows) => {
            if (error) {
                return reject(error);
            }
            resolve(rows);
        });
    });
}

function insertUser(user){
    const { username , password, email, name } = user;
    db.run(
        `INSERT INTO users (username, password, email, name) VALUES (?, ?, ?, ?)`,
        [username, password, email, name], (err) => {
            if(err){
                console.error(err)
            }
            else{
                console.log('User Inserted!')
            }
        }
    )
}

async function getUsers(username) {
    const query = `SELECT * FROM users where username = (?)`;
    return new Promise((resolve, reject) => {
        db.all(query, [username], (error, rows) => {
            if (error) {
                return reject(error);
            }
            resolve(rows);
        });
    });
}

async function updateUser(username, updatedUser) {
    const { name, password } = updatedUser;
    const query = `UPDATE users SET name = (?), password = (?) WHERE username = (?)`;
    return new Promise((resolve, reject) => {
        db.run(query, [name, password, username], function (error) {
            if (error) {
                return reject(error);
            }
            resolve(this.changes); 
        });
    });
}

async function deleteUser(username) {
    const query = `DELETE FROM users WHERE username = (?)`;
    return new Promise((resolve, reject) => {
        db.run(query, [username], function (error) {
            if (error) {
                return reject(error);
            }
            resolve(this.changes); 
        });
    });
}
app.get('/', async (req, res) => {
    res.status(200).send('Auth Server Initialized!')
    console.log(req.sessionID)
})

app.get('/users', async (req, res) => {
    try{
        const users = await getAllUsers();
        console.log('All users retrieved!');
        res.status(200).send(users);
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
})

app.get('/users/:id', async (req, res) => {
    try{
        const username = req.params.id;
        const existingUser = await getUsers(username);
        console.log('Existing user retrieved');
        res.status(200).send(existingUser[0]);
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
})

app.post('/users/registration', async (req, res) => {
    console.log(req.sessionID)
    try{
        const existingUser = await getUsers(req.body.username);
        if(existingUser.length !== 0){
            console.log('Username Taken');
            return res.status(401).send('Username is taken, please try again!')
        }

        const user = {
            username: req.body.username,
            password : await bcrypt.hash(req.body.password, 10),
            email: req.body.email,
            name: req.body.name
        }

        const secret = Math.floor(100000 + Math.random() * 900000);

        const result = await sendVerificationEmail(req.body.email, secret);

        if(result === 'ERROR'){
            return res.status(500).send('Internal Server Error');
        }
        

        // Store user in session
        req.session.user = user;

        // Store verification code in session. 
        req.session.secret = secret;
        console.log(req.session.secret);
        // console.log('New user registered');
        res.status(200).send('Registration Initiated');          
    }
    catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
})

app.post('/users/verification', async (req, res) => {
    console.log(req.sessionID)
    console.log(req.session.secret);
    console.log(req.session.user);
    console.log(req.body.secret);
    // get secret for the user based on session
    try{
        if(req.body.secret == req.session.secret){
            insertUser(req.session.user);
            console.log('Auth Successful')
            return res.status(200).send("Authentication Successful");
        }else{
            res.status(401).send('Invalid Credentials')
        }
    
        // console.log(user);
        // insertUser(user);
        // console.log('New user registered');
        // res.status(200).send(user);          
    }
    catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
})


app.post('/users/login', async (req, res) => {
    try{
        const user = await getUsers(req.body.username);
        if(user.length === 0){
            return res.status(404).send('No users found with the entered username')
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user[0].password)
        if(!isPasswordValid){
            return res.status(401).send('Invalid Password')
        }
        if(req.body.username === 'ADMIN'){
            console.log('Admin logged in');
            return res.status(200).send('ADMIN');
        }
        console.log('User login successful');
        res.status(200).send(user);
    }
    catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
})

app.put('/users/:id', async (req, res) => {
    try{
        const username = req.params.id;
        const updatedUser = req.body;
        updatedUser.password = await bcrypt.hash(req.body.password, 10);
        const affectedRows = await updateUser(username, updatedUser);
        if (affectedRows > 0) {
            console.log(`Successfully updated ${affectedRows} row(s).`);
        } else {
            console.log('No rows updated. User may not exist.');
        }
        res.status(200).send('Successful updation');
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error")
    }

    }
)

app.delete('/users/:id', async (req, res) => {
    try {
        const username = req.params.id;
        const affectedRows = await deleteUser(username);
        if (affectedRows > 0) {
            console.log(`Successfully deleted ${affectedRows} row(s).`);
        } else {
            console.log('No rows deleted. User may not exist.');
        }
        res.status(200).send('Deletion successful');
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
})

app.listen(3001, () => console.log('Auth server listening on port 3001...'));