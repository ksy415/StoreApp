import axios from 'axios'
import React from 'react'
import { Redirect } from 'react-router-dom';

const ws = new WebSocket('ws://localhost:1235/ws');


const Store = ({appUser, setAppUser, updateTop}) => {
    
    
    const [cart, addCart] = React.useState([]);
    const [items, setItems] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState('');

    const addItem = (stringMessage) => {
       
        setItems((items) => {
          const newItems = items.slice();
          newItems.push(stringMessage.data);
          
          return newItems;
        });
    };

    const addToCart = () => {
        addCart( (cart) => {
            const newCart = cart.slice();
            newCart.push(selectedItem);
           
            return newCart;
        })   
    }

    
    React.useEffect(() => {
        console.log("store test");
        ws.addEventListener('message', addItem);  
    }, []);

   const itemSelector = (e) => {
        const val = e.currentTarget.value;
        
        setSelectedItem( () =>  val );
   };

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
                <button onClick={addToCart}>Add to cart</button>
                <br></br>
            </div>
            <div>
                <button>Checkout</button>
            </div>
            <br></br>
            <div>
                {selectedItem}
            </div>
            <div>
              
            </div>
        </div>
    )
};

export default Store;