import React from 'react'
import { Container } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Link from 'next/link';

export default function MainNav() {
  const token = true;
  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className='d-flex'>
          <Navbar.Brand href="/">COMFYHOME</Navbar.Brand>
          <Nav className="ms-auto">
            {/* <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Logout
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Container>
      </Navbar>
      {token &&
        <Tabs
        defaultActiveKey="products"
        transition={false}
        id="noanim-tab-example"
        className="mb-3 text"
      >
        <Tab eventKey="products" title={<Link style={{textDecoration:'none'}} href="/products">Products</Link>}>
          <h3>All Products List</h3>
        </Tab>
        <Tab eventKey="addproducts" title={<Link style={{textDecoration:'none'}} href="/addproducts">Add Products</Link>}>
          <h3>Enter Product Information</h3>
        </Tab>
      </Tabs>
      }
      
    </Container>
  )
}

