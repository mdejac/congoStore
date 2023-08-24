import React from 'react'

const ProductScroll = ({searchType, products}) => {
    
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
    <div className="scroll-wrapper">
        <h2 className="text-2xl font-semibold mb-4">{searchType}</h2>
        <div className="scroll-controls">
            <button className="scroll-button prev-button" onClick={() => scrollContainer('furniture', 'left')}>
                &lt;
            </button>
            
            <div className="scroll-container" id="scroll-container-furniture">
                {products.map((product) => (
                    <div key={product.id} className="item pop-out-effect">
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
    
            <button className="scroll-button next-button" onClick={() => scrollContainer('furniture', 'right')}>
                &gt;
            </button>
        </div>
    </div>
  )
}

export default ProductScroll