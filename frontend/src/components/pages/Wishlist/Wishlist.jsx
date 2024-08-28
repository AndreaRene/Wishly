import { useState, useEffect } from 'react';
import axiosInstance from '../../../services/axiosInstance'; // Updated to use axiosInstance
import './Wishlist.css';
import AddIcon from '../../../assets/add_goldenrod.svg';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState( { items: [] } );
    const [loading, setLoading] = useState( true );
    const [error, setError] = useState( null );
    const navigate = useNavigate();

    useEffect( () => {
        const fetchWishlist = async () => {
            try {
                const response = await axiosInstance.get( '/wishlists/me/' );
                console.log( response.data );
                setWishlist( response.data );
            } catch ( error ) {
                setError( 'Failed to fetch wishlist.' );
                console.error( 'Error fetching wishlist:', error );
            } finally {
                setLoading( false );
            }
        };

        fetchWishlist();
    }, [] );

    if ( loading ) return <p>Loading wishlist...</p>;
    if ( error ) return <p>{ error }</p>;

    return (
        <div className="wishlist-page">
            <section className="wishlist-header">
                <h1>{ wishlist.name }</h1>
                <p>{ wishlist.description }</p>
            </section>
            <div className="wishlist-details">
                <ul>
                    { wishlist && wishlist.items && wishlist.items.map( ( item, index ) => (
                        <li key={ index }>
                            <h3>{ item.name }</h3>
                            <p>Category: { item.category }</p>
                            { item.price && <p>Price: ${ item.price }</p> }
                        </li>
                    ) ) }
                </ul>
            </div>

            {/* Floating Add Item Button */ }
            <div className="floating-button" onClick={ () => navigate( '/new-wishlist-item' ) }>
                <img src={ AddIcon } alt="Add Item" />
            </div>
        </div>
    );
};

export default Wishlist;
