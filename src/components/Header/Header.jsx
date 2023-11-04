import React from 'react';
import './Header.css';
import Logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <nav className='header'>
            <img src={Logo} alt="logo" className='logo'/>
            <div className='nav-item'>
                <Link to="/Shop">Shop</Link>
                <Link to="/Order">Order</Link>
                <Link to="/Order Review">Order Review</Link>
                <Link to="/Manage Inventory">Manage Inventory</Link>
                <Link to="/Login">Login</Link>
            </div>
        </nav>
    );
};

export default Header;