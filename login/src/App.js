import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Shopping from './pages/Shopping';
import Navbar from './components/Navbar';
import Item from './pages/Item';
import NewItem from './pages/NewItem';
import RegistrationForm from './pages/RegistrationForm';
import NotFound from './pages/NotFound';
import { useState } from 'react';
import SignOut from './pages/SignOut';
import Accounts from './pages/Accounts';
import UpdateItem from './pages/UpdateItem';
import Profile from './pages/Profile';

function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState('');
  return (
    // TODO: Account management for users.
    // TODO: Email Verification
    // TODO: Search and Filter Capabilities
    // TODO: Implement an Admin Portal.
    // TODO: Pagination
    // TODO: Render description in a textarea.
    // STRETCH: Implement auto deletion after a week.
    // STRETCH: Chat
    // STRETCH: ML Verification
    // EXTRA STRETCH: Bidding System
    <div className='App'>
      <Navbar auth={auth} user={user}/>
      <Routes>
        <Route path='/' element={<Home auth={auth} setAuth={setAuth} setUser={setUser}/>} />
        {/* <Route path='/login' element={<LoginForm auth={auth} setAuth={setAuth} setUser={setUser} />}/> */}
        <Route path='/registration' element={<RegistrationForm auth={auth}/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/shopping'>
          <Route index element={<Shopping auth={auth}/>}/>
          <Route path=':id' element={<Item auth={auth}/>}/>
          <Route path='new' element={<NewItem auth={auth} user={user}/>}/>
        </Route> 
        <Route path='/accounts'>
          <Route index element={<Accounts auth={auth} user={user}/>}/>
          <Route path=':id' element={<UpdateItem auth={auth} user={user}/>}/>
        </Route>
        <Route path='/profile/:id' element={<Profile auth={auth} setAuth={setAuth} user={user}/>} />
        <Route path='/signout' element={<SignOut auth={auth} setAuth={setAuth}/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
