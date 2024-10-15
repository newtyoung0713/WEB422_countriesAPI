// components/MainNav.js
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";

export default function MainNav() {
  return (<>
    <Navbar bg="dark" variant="dark" className="fixed-top navbar-dark bg-dark">
      <Container>
        <Navbar.Brand>Sheng-Lin Yang</Navbar.Brand>
        <Nav className="me-auto">
          <Link href="/" passHref legacyBehavior>
            <Nav.Link>Countries</Nav.Link>
          </Link>
          <Link href="/about" passHref legacyBehavior>
            <Nav.Link>About</Nav.Link>
          </Link>
        </Nav>
      </Container>
    </Navbar>
    <br />
    <br />
  </>);
};