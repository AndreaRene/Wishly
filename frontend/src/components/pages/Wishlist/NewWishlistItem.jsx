import { useState, useEffect } from 'react';
import axiosInstance from '../../../services/axiosInstance';
import { useNavigate } from 'react-router-dom';
import './Wishlist.css';

const NewWishlistItem = () => {
    const [name, setName] = useState( '' );
    const [description, setDescription] = useState( '' );
    const [link, setLink] = useState( '' );
    const [price, setPrice] = useState( '' );
    const [store, setStore] = useState( '' );
    const [category, setCategory] = useState( 'choose' );
    const [username, setUsername] = useState( '' );

    const navigate = useNavigate();

    useEffect( () => {
        const storedUsername = localStorage.getItem( 'username' );
        setUsername( storedUsername );
    }, [] );

    const handleLinkBlur = ( e ) => {
        let value = e.target.value;
        if ( value && value.startsWith( 'http://' ) ) {
            value = value.replace( /^http:\/\//, 'https://' );
            setLink( value );
        } else if ( value && !value.startsWith( 'https://' ) ) {
            value = `https://${value}`;
            setLink( value );
        }
    };

    const handleSubmit = async ( event ) => {
        event.preventDefault();

        const wishlistItemData = {
            name,
            description,
            link,
            price,
            store,
            category,
        };

        try {
            await axiosInstance.post( '/wishlists/me/items/add/', wishlistItemData );
            navigate( '/wishlist' );
        } catch ( error ) {
            console.error( 'Error creating wishlist item:', error );
        }
    };

    return (
        <div className="new-wishlist-item-container">
            <section className="new-wishlist-item-header">
                <h1>Hello, { username || 'friend' }!</h1>
                <p>Add a new item to your wishlist</p>
            </section>
            <form onSubmit={ handleSubmit } className="new-wishlist-item-form">
                <label>
                    Item Name:
                    <input type="text" value={ name } onChange={ ( e ) => setName( e.target.value ) } required />
                </label>
                <label>
                    Description:
                    <textarea value={ description } onChange={ ( e ) => setDescription( e.target.value ) } />
                </label>
                <label>
                    Link:
                    <input type="url" value={ link } onChange={ ( e ) => setLink( e.target.value ) } onBlur={ handleLinkBlur } />
                </label>
                <label>
                    Price:
                    <input type="number" step="0.01" value={ price } onChange={ ( e ) => setPrice( e.target.value ) } />
                </label>
                <label>
                    Store:
                    <input type="text" value={ store } onChange={ ( e ) => setStore( e.target.value ) } />
                </label>
                <label>
                    Category:
                    <select value={ category } onChange={ ( e ) => setCategory( e.target.value ) } required>
                        <option value="choose" disabled>Choose a Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="books">Books</option>
                        <option value="clothing">Clothing</option>
                        <option value="home">Home & Kitchen</option>
                        <option value="toys">Toys & Games</option>
                        <option value="sports">Sports & Outdoors</option>
                        <option value="beauty">Beauty & Personal Care</option>
                        <option value="other">Other</option>
                    </select>
                </label>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default NewWishlistItem;
