const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

// Database Connection
const DATABASE_NAME = 'FS'
const COLLECTION_NAME = 'products'
async function createProductCollection(client){
    await client.db(DATABASE_NAME).createCollection(COLLECTION_NAME);
};
async function connectDatabase(){
    const uri = `mongodb://127.0.0.1:27017/${DATABASE_NAME}/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.15`;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        await createProductCollection(client);
    } catch (e) {
        console.error(e);
    }
    return client;
}

async function getProducts(client){
    const products = await client.db(DATABASE_NAME).collection(COLLECTION_NAME).find().toArray();
    console.log('Products Retrieved:');
    return products;
}

async function insertProduct(client, product){
    const result = await client.db(DATABASE_NAME).collection(COLLECTION_NAME).insertOne(product);
    console.log('Successfully Inserted Product', result.insertedId);
}

async function updateProductById(client, id, updatedProduct){
    await client.db(DATABASE_NAME).collection(COLLECTION_NAME).replaceOne({"_id" : id}, updatedProduct);
    console.log('Successfully Updated Product');
}

async function deleteProductById(client, id){
    await client.db(DATABASE_NAME).collection(COLLECTION_NAME).deleteOne({"_id" : id});
    console.log('Successfully Deleted Product');
}

async function getProductsForUser(client, userId){
    const products = await client.db(DATABASE_NAME).collection(COLLECTION_NAME).find({user: userId}).toArray();
    console.log('Products Retrieved for user', userId);
    return products;
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('DB Server setup and running!');
})

app.get('/products', async (req, res) => {
    // TODO: Check authorization of user
    try{
        const mongoClient = await connectDatabase();
        const products = await getProducts(mongoClient);
        res.status(200).send(products);
        mongoClient.close();
    }catch(error){
        console.error(error);
        res.status(400).send(error)
    }
})

app.get('/products/:id', async (req, res) => {
    // TODO: Check authorization of user
    try{
        const mongoClient = await connectDatabase();
        const userId = req.params.id; 
        const products = await getProductsForUser(mongoClient, userId);
        res.status(200).send(products);
        mongoClient.close();
    }catch(error){
        console.error(error);
        res.status(400).send(error)
    }
})

app.post('/products', async (req, res) => {
    try{
        const mongoClient = await connectDatabase();
        const product = req.body;
        await insertProduct(mongoClient, product);
        mongoClient.close();
        res.status(200).send({});
    }catch(error){
        console.error(error);
        res.status(400).send(error)        
    }

})
app.put('/products/:id', async (req, res) => {
    try{
        const mongoClient = await connectDatabase();
        let updatedProduct = req.body;
        const id = new ObjectId(req.params.id);
        console.log(req.params);
        await updateProductById(mongoClient, id, updatedProduct)
        mongoClient.close();
        res.status(200).send({});
    }catch(error){
        console.error(error);
        res.status(400).send(error)        
    }
})
app.delete('/products/:id', async (req, res) => {
    try{
        const mongoClient = await connectDatabase();
        const id = new ObjectId(req.params.id);
        // console.log(id);
        await deleteProductById(mongoClient, id)
        mongoClient.close();
        res.status(200).send({});
    }catch(error){
        console.error(error);
        res.status(400).send(error)        
    }
})

app.listen(3002, () => {
    console.log('DB Server running on port 3002');
})