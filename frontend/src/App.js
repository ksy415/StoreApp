import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Store from './pages/Store';
import StoreManager from './pages/StoreManager';

const ws = new WebSocket('ws://localhost:1235/ws');

const App = () => {
  const [items, setItems] = React.useState([]);
  const [appUser, setAppUser] = React.useState(null);

  React.useEffect(() => {
    
    ws.addEventListener('message', addItem);  
    }, []);

  const addItem = (stringMessage) => {
        
    setItems((items) => {
      const newItems = items.slice();
      newItems.push(stringMessage.data);
      
      return newItems;
    });
  };

  const setUser = (username) => {
    setAppUser(username);
  //  console.log(username);
  }  

  return (
    <div>
      <nav className="nav">
        <Link to="/"> Home </Link>
        {<Link to="/login"> Login</Link>}
        {<Link to="/signup"> Sign Up</Link>}
        {<Link to="/store">Store</Link>}
        {<Link to="/storemanager">Store Manager</Link>}
      </nav>
      <Switch>
        <Route path="/login">
          <Login appUser={appUser} setAppUser={setAppUser} setUser={setUser}/>
        </Route>
        <Route path="/signup">
          <Signup appUser={appUser} setAppUser={setAppUser}/>
        </Route>
        <Route path="/store">
          <Store appUser={appUser} setAppUser={setAppUser}  items={items}/>
        </Route>
        <Route path="/storemanager">
          <StoreManager  appUser={appUser} setAppUser={setAppUser} items={items}/>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default App;