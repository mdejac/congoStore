import React, {useEffect, useState} from "react";
import axios from 'axios';

const ProductScroll = ({searchType}) => {

    const [products, setAllProducts] = useState([]);
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/products/category/${searchType}`)
          .then(response => {
            setAllProducts(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []);

    function scrollContainer(section, direction) {
        const container = document.getElementById(`scroll-container-${section}`);
        const scrollAmount = 600;
        if (direction === 'left') {
          container.scrollLeft -= scrollAmount;
        } else {
          container.scrollLeft += scrollAmount;
        }
    }
  
    return (
    <div className="mt-20 scroll-wrapper bg-secondary-100">
        <h2 className="text-2xl font-semibold mb-4 text-white">{searchType}</h2>
        <div className="scroll-controls">
            <button className="scroll-button prev-button" onClick={() => scrollContainer(searchType, 'left')}>
                &lt;
            </button>
            
            <div className="scroll-container" id={`scroll-container-${searchType}`}>
                {products.map((product) => (
                    <div key={product.id} className="item pop-out-effect bg-white rounded-md">
                        <div className="flex justify-between my-2">
                            <img src={product.img_url} alt="Image coming soon" className="card-img-top" />
                            <div className="card-item-price">
                                <p className="text-end">${product.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <a href={`/products/view/${product.id}`} className="block text-ellipsis max-w-full h-16">
                            <h5 className="text-lg font-semibold">{product.name}</h5>
                        </a>
                        <p className="card-text">
                        {product.description}
                        </p>
                    </div>
                ))}
            </div>  
    
            <button className="scroll-button next-button" onClick={() => scrollContainer(searchType, 'right')}>
                &gt;
            </button>
        </div>
    </div>
  )
}

export default ProductScroll