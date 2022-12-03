import React from 'react'
import PropTypes from 'prop-types'
import Button from './NavBtn'
import {useLocation} from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  return (
    <header className='header'>
      <h1 >{title}</h1>
      {location.pathname === '/' && (
        <Button 
            text='Home'
            onClick={onAdd}
        />
      )}
    </header>
  );
};

export default Navbar;