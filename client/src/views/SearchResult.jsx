import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const SearchResult = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const {searchTerm} = useParams();
    const [allProductsByName, setAllProductsByName] = useState([]);
    const [allProductsByCategory, setAllProductsByCategory] = useState([]);
    const [allProductsByDescription, setAllProductsByDescription] = useState([]);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser.user);
        }
        else {
            navigate("/");
        }
    }, []);

    // useEffect(() => {
    //     axios.get(`http://127.0.0.1:5000/api/products/name/${searchTerm}`)
    //       .then(response => {
    //         setAllProductsByName(response.data);
    //       })
    //       .catch(error => {
    //         console.error('Error fetching data:', error);
    //       });
    // }, [searchTerm]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/products/category/${searchTerm}`)
          .then(response => {
            setAllProductsByCategory(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, [searchTerm]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/products/description/${searchTerm}`)
          .then(response => {
            console.log(response.data)
            setAllProductsByDescription(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, [searchTerm]);

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
        <>
        
        <div className="scroll-wrapper bg-secondary-100">
            <h2 className="text-2xl font-semibold mb-4 text-white">In Category {searchTerm}</h2>
            <div className="scroll-controls">
                <button className="scroll-button prev-button" onClick={() => scrollContainer('category', 'left')}>
                    &lt;
                </button>
                
                <div className="scroll-container" id={`scroll-container-${'category'}`}>
                    {allProductsByCategory.map((product) => (
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
        
                <button className="scroll-button next-button" onClick={() => scrollContainer('category', 'right')}>
                    &gt;
                </button>
            </div>
        </div>

        <div className="scroll-wrapper bg-secondary-100">
            <h2 className="text-2xl font-semibold mb-4 text-white">In Description {searchTerm}</h2>
            <div className="scroll-controls">
                <button className="scroll-button prev-button" onClick={() => scrollContainer('description', 'left')}>
                    &lt;
                </button>
                
                <div className="scroll-container" id={`scroll-container-${'description'}`}>
                    {allProductsByDescription.map((product) => (
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
        
                <button className="scroll-button next-button" onClick={() => scrollContainer('description', 'right')}>
                    &gt;
                </button>
            </div>
        </div>
        </>

        
    );
}

export default SearchResult