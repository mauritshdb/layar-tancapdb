import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavbarTop() {

    return (
        <Navbar sticky='top' bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/" className='cssTitle'>Layar Tancap DB</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="/login">Login</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
export default NavbarTop;