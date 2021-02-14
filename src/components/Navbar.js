import {Navbar, NavDropdown, Nav, Container,} from "react-bootstrap";
import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
      <Navbar bg="danger" expand="lg">
        <Container>
          <Navbar.Brand href="#home" style={{color:"black"}}> ENIGMACAMP </Navbar.Brand>
          <Navbar.Brand href="#home">
            <Link to="/units" style={{color:"black"}} >
              HOME
            </Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="INVENTORY" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  <Link to="/unitList"  style={{color:"black"}} >
                    UNIT
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <Link to="/items" style={{color:"black"}}>
                    {" "}
                    ITEM
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item href="#action/3.3">
                  <Link to="/stocks" style={{color:"black"}}>
                    STOCK
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default NavBar;
