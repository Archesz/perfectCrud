import React from 'react'
import './Menu.scss'
import logo from '../../assets/images/logo.png'

function Menu() {
    return (
        <div className='menu-container'>
            
            <img src={logo} className='logo-img'/>

            <div className='menu-items'>

                <span className='menu-item'>Home</span>
                <span className='menu-item'>Estudantes</span>

            </div>

        </div>
    )
}

export default Menu