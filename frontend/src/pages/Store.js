import axios from 'axios'
import React from 'react'
import { Redirect } from 'react-router-dom';

//const ws = new WebSocket('ws://localhost:1235/ws');


const Store = ({appUser, setAppUser, items}) => {
    
    const [currentUser, setCurrentUser] = React.useState('');
    const [cart, setCart] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState('');
    const[error, setError] = React.useState('');

   const itemSelector = (e) => {
        const val = e.currentTarget.value;
        //console.log(appUser);
        setSelectedItem( () =>  val );
   };

   const handleAddtoCart = () => {

        //console.log(`appUser = ${appUser}`);

        setCart( (cartItem) => {
            const newCart = cart.slice();
            newCart.push(selectedItem);
        
            return newCart;
        })   
    }

    const handleSubmit = () => {

     
        cart.forEach( (item, i) => {
            //console.log(`Transaction ${i}: ${appUser} + ${item}`);
            const transaction = {
                user: appUser,
                item: item,
            };
            
            axios.post("/api/addTransaction", transaction);
                
               
        });
            
    }   

   

    return (
        <div className='App'>
          
            <header>
                <h1>Store</h1>
            </header>
            <div className="items">
                <select onChange={itemSelector}>
                    
                     {items.map((item, i) => (
                         
                         <option key={i} value={item}>{i} : {item}</option>
                            
                    ))}
                        
                </select>
                <button onClick={handleAddtoCart}>Add to cart</button>
                <br></br>
            </div>
            <br></br>
            <div className="cart">
                <h1>Cart</h1>
                <div>
                    {cart.map( (cartItem, i) => (
                        <div key={i}>{cartItem}</div>
                    //  <button>Delete</button>
                        
                    ))}
                </div>
                <button onClick={handleSubmit}>Checkout</button>
            </div>
            
        
        </div>
    )
};

export default Store;