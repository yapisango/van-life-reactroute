import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header>
      <Link to="/" className="site-logo">#VANLIFE</Link>
      <nav className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/vans">Vans</Link>
      </nav>
    </header>
  )
}

export default Navbar

