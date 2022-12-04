import './App.css';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Axios from 'axios';

function App() {

  //const bUrl = `${process.env.REACT_APP_BASEURL}`;
  //const bAPIKEY = `${process.env.REACT_APP_APIKEY}`;
  const urlImage = `${process.env.REACT_APP_BASEIMGURL}`;

  const [filem, setFilem] = useState([]);

  useEffect(() => {
    const getData = () => {
      Axios({
        method: 'get',
        url: `${process.env.REACT_APP_BASEURL}movie/popular?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=1`,
      })
        .then(function (response) {
          setFilem(response.data.results);
        });
    }
    getData();
  }, []);

  return (
    <>
      <div className='container mt-5'>
        <div>
          <h1>Popular</h1>
        </div>
        <div className='c1'>
          {filem.map((item, index) => {
            return (
              <Card key={index}>
                <Card.Img variant='top' src={`${urlImage}${item.poster_path}`} />
                <Card.Body>
                  <Card.Title>{item.title} | {item.vote_average}/10</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Movie ID: {item.id}</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">Popularity: {item.popularity}</Card.Subtitle>
                  <Card.Text>
                    {item.overview}
                  </Card.Text>
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
