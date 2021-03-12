import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
function NavBar() {
  const id = window.sessionStorage.getItem('id') || '';
  const logout = () => {
    window.sessionStorage.removeItem('id')
    window.location.reload(false);
  }
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Wafer Electronics</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {id ?
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
            </Nav> :
            <Nav className="ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>}
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavBar
