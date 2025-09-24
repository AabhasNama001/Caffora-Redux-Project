import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadLazyProduct, setProducts } from '../store/reducers/productSlice';
import axios from '../api/axiosconfig';

const UseInfiniteProducts = (category) => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.productReducer);
    const [hasMore, sethasMore] = useState(true);

    // Ye function sirf infinite scroll ke liye hai.
    // Ye hamesha products.length ko _start value ke roop me use karega.
    const fetchMoreProducts = async () => {
        try {
            const start = products.length;
            let queryString = `?_limit=6&_start=${start}`;
            
            if (category) {
                queryString += `&category=${encodeURIComponent(category)}`;
            }

            const { data } = await axios.get(`/products${queryString}`);
            if (data.length === 0) {
                sethasMore(false);
            } else {
                sethasMore(true);
                dispatch(loadLazyProduct(data));
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Ye useEffect hook initial load aur category change hone par chalta hai.
    // Ye hamesha _start=0 se products fetch karega.
    useEffect(() => {
        const fetchInitialProducts = async () => {
            try {
                // Jab bhi category change ho, hamesha start=0 se fetch kare.
                let queryString = `?_limit=6&_start=0`;
                
                if (category) {
                    queryString += `&category=${encodeURIComponent(category)}`;
                }

                const { data } = await axios.get(`/products${queryString}`);
                
                dispatch(setProducts(data)); // Ye Redux state ko reset kar dega.
                sethasMore(data.length > 0);
            } catch (err) {
                console.log(err);
            }
        };

        fetchInitialProducts();
    }, [category]); // Jab bhi 'category' ki value badlegi, ye hook phir se chalega.

    // Return statement me ab 'fetchMoreProducts' hai
    return { products, hasMore, fetchMoreProducts };
};

export default UseInfiniteProducts;