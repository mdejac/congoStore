import React, {useState} from 'react'

const ProductForm = ({title, initialState, onSubmitProps, errors}) => {

    const [formData, setFormData] = useState(initialState);
    const FormStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;

    const handleInput = e => {
        setFormData({...formData, [e.target.id]:e.target.value});
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        onSubmitProps(formData)
      };

    return (
        <div>
            <form className='bg-primary-500 p-10 rounded-lg' onSubmit={onSubmitHandler}>
                <h1 className='mb-5'>Product {title}</h1>
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-black dark:text-black">Product Name:</label>
                    {errors['name'] && (
                    <p style={{ color: 'red' }}>{errors['name']}</p>
                    )}
                    <input className={FormStyles}
                        id='name'
                        type="text"
                        value={formData.name}
                        onChange={handleInput} />
                </div>
                <div>
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-black dark:text-black">Categories:</label>
                    {errors['category'] && (
                    <p style={{ color: 'red' }}>{errors['category']}</p>
                    )}
                    <input id='category' placeholder='Electronics, Home Goods, Gadgets...' className={FormStyles} type="text" value={formData.category} onChange={handleInput} />
                </div>
                <div>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-black dark:text-black">Description:</label>
                    {errors['description'] && (
                    <p style={{ color: 'red' }}>{errors['description']}</p>
                    )}
                    <textarea id='description' className={FormStyles} type="textarea" rows={4} cols={50} value={formData.description} onChange={handleInput} />
            </div>
            <div>
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-black dark:text-black">Price</label>
                    {errors['price'] && (
                    <p style={{ color: 'red' }}>{errors['price']}</p>
                    )}
                    <div className="relative">
                        <span className="absolute left-2 top-3 text-gray-600 dark:text-gray-300">$</span>
                        <input
                            id="price"
                            placeholder="0.00"
                            className={`block ${FormStyles} pl-8`}
                            type="number"
                            min="0.00"
                            step=".01"
                            value={parseFloat(formData.price).toFixed(2)}
                            onChange={handleInput}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-black dark:text-black">Quantity</label>
                    {errors['quantity'] && (
                    <p style={{ color: 'red' }}>{errors['quantity']}</p>
                    )}
                    <input id='quantity' placeholder='0' className={FormStyles} type="number" value={formData.quantity} onChange={handleInput} />
                </div>
                <div>
                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-black dark:text-black">Image Upload:</label>
                    {errors['img_url'] && (
                    <p style={{ color: 'red' }}>{errors['img_url']}</p>
                    )}
                    <input className={FormStyles} disabled={true} type="multipart-file" value={formData.img_url} onChange={handleInput} />
                </div>
                <button className='className="mt-5 rounded-lg bg-secondary-300 px-20 py-3 transition duration-500 hover:text-white' type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ProductForm