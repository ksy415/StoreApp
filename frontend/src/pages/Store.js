import axios from 'axios'
import React from 'react'
import { Redirect } from 'react-router-dom';

//const ws = new WebSocket('ws://localhost:1235/ws');


const Store = ({appUser, setAppUser, items}) => {
    
    const [currentUser, setCurrentUser] = React.useState('');
    const [cart, setCart] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState('');
    const [transactionList, setTransactionList] = React.useState([]);
    
 
    // React.useEffect(() => {
    //    // if(transactionList.length === 0) {
           
    //    // }
    // });

    const fetchTransactions = () => {

        axios.get('/api/listTransactions')
        .then((res) => {
            setTransactionList(() => {
                let myList = JSON.parse(res.data);
                console.log(myList);
                

                return myList.transactionList;
            });
        });
    };
 
   const itemSelector = (e) => {
   // console.log(transactionList);
        const val = e.currentTarget.value;
        //console.log(appUser);
        setSelectedItem( () =>  val );
   };

   const handleAddtoCart = () => {

        //console.log(`appUser = ${appUser}`);
        

        setCart( () => {
            const newCart = cart.slice();
            newCart.push(selectedItem);
        
            return newCart;
        })   
    }

    const handleSubmit = () => {
        //console.log(transactions.length);
     
        cart.forEach( (item, i) => {
            console.log(`Transaction ${i}: ${appUser} + ${item}`);
            const transaction = {
                user: appUser,
                item: item,
            };
            
            axios.post("/api/addTransaction", transaction)
                .then((res) => {
                    if (res.data.success) {
                        console.log("Transaction added!");
                    } else {
                        console.log("Failed to add transaction");
                    }
                })
                .catch( () => "Error");

                
               
        });
            
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
            <div>
                <button onClick={fetchTransactions}>List Transactions</button>
            </div>
        
        </div>
    )
};

export default Store;