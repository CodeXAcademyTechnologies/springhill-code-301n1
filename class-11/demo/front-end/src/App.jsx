import React from 'react';
import axios from 'axios';
import Cats from './Cats';
import Dogs from './Dogs';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

const SERVER = import.meta.env.VITE_SERVER_URL;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      dogs: []
    }
  }

  componentDidMount() {
    this.fetchCats();
    this.fetchDogs();
  }

  async fetchDogs() {
    // set the url for our server
    // http://localhost:3001/dogs
    let apiUrl = `${SERVER}/dogs`;
    let dogs;
    let result = await axios.get(apiUrl);
    dogs = result.data;
    this.setState({dogs: dogs});
  }

  async fetchCats(location = null) {
    let apiUrl = `${SERVER}/cats`;

    // if (location) {
    //   apiUrl += `?location=${location}`;
    // }

    try {
      const response = await axios.get(apiUrl);
      this.setState({ cats: response.data });

    } catch (error) {
      console.log(error);
    }
  }

  handleLocationSubmit = (event) => {
    event.preventDefault();
    const location = event.target.location.value;
    console.log({ location });
    this.fetchCats(location);
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <nav>
            <h1>World of Cats</h1>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
          <Routes>
            <Route exact path="/" element={
              <div>
                <Cats cats={this.state.cats} />
                {/* <h2>Filter by location</h2>
                <form onSubmit={this.handleLocationSubmit}>
                  <input name="location" />
                  <button>ok</button>
                </form> */}
              </div>
            }/>
            <Route path="/dogs" element={
              <Dogs dogs={this.state.dogs} />
            }/>
            <Route path="/about" element={
              <h1>A page about dogs and cats</h1>
            }/>
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
