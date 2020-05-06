import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = ({appUser, setAppUser, setUser}) => {

  const[username, setUsername] = React.useState('');
  const[password, setPassword] = React.useState('');
  const[error, setError] = React.useState('');

  const handleAuth = () => {
    const body = {
      username: username,
      password: password,
    };

    axios.post('/api/authenticate', body)
      .then((res) => {
       // console.log(res.data);
        if(res.data.success) {
         // console.log('Worked!');
          setUser(username);
        } else {
          setError(res.data.error);
        }
      })
      .catch(() => {
        setError("Failed to log in");
      });
  };

  if(appUser) {
    //console.log(appUser);
    return <Redirect to ="/store"/> ;
    
  }
  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          /> 
      </div>
      <div>
        <input 
          type = "password"
          value = {password}
          onChange = {e => setPassword(e.target.value)}/>
      </div>
      <div>
        <button disabled={!username || !password  } onClick={handleAuth}>Login</button>
      </div>
      <div>
        {error && <strong> {error} </strong>}
      </div>
     
      </div>
  );
};

export default Login;
