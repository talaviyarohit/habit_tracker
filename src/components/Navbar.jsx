
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar    expand="lg">
      <Navbar.Brand as={Link} to="/" className="navbar">Habit Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/dashboard" className="navbar">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/add-habit " className="navbar">Add Habit</Nav.Link>
          <Nav.Link as={Link} to="/profile" className="navbar">Profile</Nav.Link>
          <Nav.Link as={Link} to="/notifications" className="navbar">Notifications</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
