// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

// function SellProduct({ user, onProductSubmit }) {
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState('');
//     const [quantity, setQuantity] = useState('');

//     const history = useHistory();

//     const handleSubmit = (e) => {
//         e.preventDefault();

        
//         onProductSubmit({
//             description,
//             price: parseFloat(price),
//             quantity: parseInt(quantity, 10),
//             sellerId: user.id 
//         });


//         history.push('/sell-it-route');  
//     };

//     return (
//         <div className="sell-product">
//             <h1>Welcome, {user.first_name}!</h1>
//             <h2>Add a product to sell</h2>

//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Description:</label>
//                     <textarea 
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         placeholder="Describe your product..."
//                     />
//                 </div>

//                 <div>
//                     <label>Price:</label>
//                     <input 
//                         type="number"
//                         value={price}
//                         onChange={(e) => setPrice(e.target.value)}
//                         placeholder="Enter product price..."
//                     />
//                 </div>

//                 <div>
//                     <label>Quantity:</label>
//                     <input 
//                         type="number"
//                         value={quantity}
//                         onChange={(e) => setQuantity(e.target.value)}
//                         placeholder="Enter available quantity..."
//                     />
//                 </div>

//                 <button type="submit">Submit Product</button>
//             </form>
//         </div>
//     );
// }

// export default SellProduct;
