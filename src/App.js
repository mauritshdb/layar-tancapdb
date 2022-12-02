import './App.css';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Axios from 'axios';

function App() {

  const getData = () => {
    Axios({
      method: 'get',
      url: `${process.env.REACT_APP_BASEURL}movie/popular?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=1`,
    })
      .then(function (response) {
        setFilem(response.data.results);
      });
  }
  const urlImage = `${process.env.REACT_APP_BASEIMGURL}`
  const [filem, setFilem] = useState([]);

  useEffect(() => {
    getData()
  }, []);

  return (
    <>
      <Navbar className='sticky-top' bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home" className='cssTitle'>Layar Tancap DB</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">User</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className='container mt-5'>
        <div className='c1'>
          {filem?.map((item, index) => {
            return (
              <Card style={{ width: '18rem' }} key={index}>
                <Card.Img variant='top' src='https://image.tmdb.org/t/p/w500/{item.backdrop_path}' />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Movie ID: {item.id}</Card.Subtitle>
                  <Card.Text>
                    {item.overview}
                  </Card.Text>

                  <Card.Link href="#">Popularity: {item.popularity}</Card.Link>
                  <Card.Link href="#">{item.vote_average}</Card.Link>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>


    </>
  );
}

export default App;
