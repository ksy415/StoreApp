import axios from 'axios'
import React from 'react'
import { Redirect } from 'react-router-dom';

const Store = ({appUser, setAppUser, items}) => {
    
    const [currentUser, setCurrentUser] = React.useState('');
    const [cart, setCart] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState('');
    const [transactionList, setTransactionList] = React.useState([]);
    
 
     React.useEffect(() => {
        
        //Sets the selected item to the first item on the list when the component first mounts
        if(selectedItem === '') {
            setSelectedItem(items[0]);
        }

     })

    const listTransactions = () => {
        axios.get('/api/listTransactions')
            .then((res) => {
                setTransactionList(() => {
                    let myList = JSON.parse(res.data);
                    const arrList = [];
                    myList.transactionList.forEach((transaction) => {
                        arrList.push(transaction);
                    })
    
                    return arrList;
                });
            });   
    };
 
   const itemSelector = (e) => {
        
        const val = e.currentTarget.value;
        setSelectedItem( () =>  val );
   };

   const handleAddtoCart = () => {

        setCart( () => {
            const newCart = cart.slice();
            newCart.push(selectedItem);
        
            return newCart;
        })   
    }

    const handleCheckout = () => {
      
     
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

    if(!appUser) {
        return <Redirect to ="/login"/>;
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
                        <div key={i}>
                            {cartItem}
                        </div>
                    ))}
                </div>
                <button onClick={handleCheckout}>Checkout</button>
            </div>
       
            <div>
                <button onClick={listTransactions}>List Transaction</button>
                
                {transactionList.map( (transaction, i) =>  {
                    if(appUser === transaction.user)
                    return (
                    <div key={i}> User: {transaction.user} Item: {transaction.item}</div> 
                    )
                })}
            
            </div>
        </div>
    )
};

export default Store;