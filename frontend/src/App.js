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

  const rootUpdate = (item) => {
    console.log('APP', item);
  }

  React.useEffect(() => {
    console.log("store test");
    ws.addEventListener('message', addItem);  
    }, []);

const addItem = (stringMessage) => {
       
  setItems((items) => {
    const newItems = items.slice();
    newItems.push(stringMessage.data);
    
    return newItems;
  });
};

  return (
    <div>
      <nav>
        <Link to="/"> Home </Link>
        {appUser && <Link to="/login"> Login</Link>}
        {appUser && <Link to="/signup"> Sign Up</Link>}
        {!appUser && <Link to="/store">Store</Link>}
        {!appUser && <Link to="/storemanager">Store Manager</Link>}
      </nav>
      <Switch>
        <Route path="/login">
          <Login appUser={appUser} setAppUser={setAppUser}/>
        </Route>
        <Route path="/signup">
          <Signup appUser={appUser} setAppUser={setAppUser}/>
        </Route>
        <Route path="/store">
          <Store appUser={appUser} setAppUser={setAppUser} updateTop={rootUpdate} items={items}/>
        </Route>
        <Route path="/storemanager">
          <StoreManager  appUser={appUser} setAppUser={setAppUser}/>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default App;