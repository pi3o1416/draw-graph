
import React from 'react'
import logo from '../logo.png'

export function Navbar() {
    return (
        <div className="navbar has-shadow is-light" >
            <div className="navbar-brand">
                <img src={logo} alt="brand logo" height="150" width="150" />
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <p>Documentation</p>
                </div>
                <div className="navbar-item">
                    <p>Blog</p>
                </div>
                <div className="navbar-item">
                    <p>Get involved</p>
                </div>
                <div className="navbar-item">
                    <p>About us</p>
                </div>
            </div>
        </div>
    )
}
