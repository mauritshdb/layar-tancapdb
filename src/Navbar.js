import './Navbar.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import axios from "axios";

function NavbarTop() {
    const isLogIn = Boolean(localStorage.getItem("session") || false)
    const getUsername = localStorage.getItem("username");

    const handleLogin = () => {
        window.location.assign("/login");
    }
    const handleLogout = () => {
        axios
      .delete(
        `${process.env.REACT_APP_BASEURL}authentication/session?api_key=${process.env.REACT_APP_APIKEY}`,
        {
          data: {
            session_id: localStorage.getItem("session"),
          },
        }
      )
      .then((res) => {
        localStorage.removeItem("session");
        localStorage.removeItem("username")
        window.location.reload();
      });
    }
    return (
        <Navbar sticky='top' bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/" className='cssTitle'>Layar Tancap DB</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {isLogIn ? (<Navbar.Text>
                        Signed in as: <a href="/login">{getUsername}</a>
                        <Button variant="secondary" className='mt-0' onClick={handleLogout}>Logout</Button>
                    </Navbar.Text>) : <Navbar.Text>
                        <Button variant="secondary" className='mt-0' onClick={handleLogin}>Login</Button>
                    </Navbar.Text>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default NavbarTop;