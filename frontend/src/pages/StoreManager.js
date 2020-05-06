import axios from 'axios'
import React from 'react'
import { Redirect } from 'react-router-dom';

const ws = new WebSocket('ws://localhost:1235/ws');

const StoreManager = () => {

    const[name, setName] = React.useState('');
    const[price, setPrice] = React.useState('');
    const[error, setError] = React.useState('');
    const[items, setItems] = React.useState([]);
   
  const addItem = (stringMessage) => {
    //console.log(stringMessage.data); //incoming from server
    setItems((items) => {
      const newItems = items.slice();
      newItems.push(stringMessage.data);
      console.log(newItems);
      return newItems;
    });
  };

    React.useEffect(() => {
      console.log("StoreManager test");
      ws.addEventListener('message', addItem);
      
    }, []);

    //sends the item to the server
    const handleAddItem = () => {
      
        const body = {
          name: name,
          price: price,
        };

        ws.send(body.name);

        axios.post('/api/addItem', body)
          .then((res) => {
            console.log(res.data);
            if(res.data.success) {
              console.log('Item added!');
              
            } else {
              setError(res.data.error);
            }
          })
          .catch(() => {
            setError("Failed to add item");
          });
      };



    const handleDeleteItem = () => {
        axios.post('api/deleteItem', name);
            
    }

    return (
        <div className="App">
            <h1>Store Manager</h1>
            <div>
                    <div> 
                        <label>Item name</label>
                        <input value={name} onChange={e => setName(e.target.value)} />     
                    </div>
                    <div>
                        <label>Price</label>
                        <input value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                    <div>
                        <button onClick={handleAddItem}>Add Item</button>
                    </div>
            </div>
            <div className="items">
              {items.map((items, i) => (
               <div className="item" key={i}>
                  <div>{i}</div>
                  <div className="item-content">{items}</div>
                   <button >Delete</button>
              </div>
              ))}
             </div>
    </div>
            
           
        
     
    )
};

export default StoreManager;