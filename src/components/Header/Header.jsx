import React from 'react';
import './Header.css';
import Logo from '../../images/Logo.svg';
const Header = () => {
    return (
        <nav className='header'>
            <img src={Logo} alt="logo" className='logo'/>
            <div className='nav-item'>
                <a href="/Order">Order</a>
                <a href="/Order Review">Order Review</a>
                <a href="/Manage Inventory">Manage Inventory</a>
                <a href="/Login">Login</a>
            </div>
        </nav>
    );
};

export default Header;