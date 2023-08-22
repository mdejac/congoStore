import React, { useState } from 'react';

function ProductDisplay({ product, onPurchase, onReview, onDeleteReview, onEditReview }) {
    const [review, setReview] = useState('');
    
    const handleReviewSubmit = () => {
        onReview(product.id, review);
        setReview('');
    };

    return (
        <div className="product-display">
            <h2>{product.name}</h2>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <button onClick={() => onPurchase(product.id)}>Buy It</button>

            <div className="review-section">
                <textarea 
                    value={review} 
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Leave your review here..."
                />
                <button onClick={handleReviewSubmit}>Submit Review</button>

                {product.reviews && product.reviews.map(r => (
                    r.userId === product.userId && (  // Assuming each review has a userId to match with the current logged-in user
                        <div key={r.id} className="user-review">
                            <p>{r.content}</p>
                            <button onClick={() => onEditReview(r.id)}>Edit</button>
                            <button onClick={() => onDeleteReview(r.id)}>Delete</button>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

export default ProductDisplay;
