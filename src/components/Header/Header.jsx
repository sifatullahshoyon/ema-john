import React, { useContext } from 'react';
import './Header.css';
import Logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
const Header = () => {
    const {user , logOut} = useContext(AuthContext);
    console.log(user)
    const handleSignOut = () => {
        logOut()
        .then(() => {})
        .catch((error) => {
            console.error(error.message);
        })
    };

    return (
        <nav className='header'>
            <img src={Logo} alt="logo" className='logo'/>
            <div className='nav-item'>
                <Link to="/Shop">Shop</Link>
                <Link to="/Order">Order</Link>
                <Link to="/Order Review">Order Review</Link>
                <Link to="/Manage Inventory">Manage Inventory</Link>
                <Link to="/Login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                {
                    user && <p style={{color: 'white'}}>Welcome  {user.email} <button onClick={handleSignOut}>Sign Out</button></p> 
                }
            </div>
        </nav>
    );
};

export default Header;