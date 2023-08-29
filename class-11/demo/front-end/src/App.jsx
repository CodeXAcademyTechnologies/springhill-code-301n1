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

  // CREATE dog needs the dogObj (name, breed, age, ...)
  // It does not need an ID.
  createDog = async (dogObj) => {
    // POST http://localhost:3001/dogs
    let apiUrl = `${SERVER}/dogs`;
    // create on server
    // apiUrl is where the POST is sent.
    // dogObj is the BODY of the POST
    let result = await axios.post(apiUrl, dogObj);
    let newDog = result.data;
    // We could just re-download all dogs after creating a new dog.
    // This is OK, but makes an extra trip to the server.
    // this.fetchDogs();

    // We could also just put the new dog in manually, as below.
    // We want to do this...
    // this.state.dogs.push(newDog);
    // put we can't because react needs us to use
    // this.setState({dogs: })
    // The reason for this is that React discourages us from
    // mutating state. We can only replace an array with new 
    // array.

    // copy the list, add newDog to the end. (...es6 spread operator)
    const oldDogList = this.state.dogs;
    const updatedDogList = [...oldDogList, newDog];
    this.setState({
      dogs: updatedDogList
    });
  }

  // DELETE dog needs the dog_id
  deleteDog = async (dog_id) => {
    let apiUrl = `${SERVER}/dogs/${dog_id}`;
    await axios.delete(apiUrl);

    // TODO: add to local state
    this.fetchDogs();
  }

  // UPDATE dog needs the id
  // and dogObj (age, name, breed,...)
  updateDog = async (dog_id, dogObj) => {
    let apiUrl = `${SERVER}/dogs/${dog_id}`;
    let updatedDog = await axios.put(apiUrl, dogObj);

    this.fetchDogs();
  }

  async fetchDogs() {
    // set the url for our server
    // http://localhost:3001/dogs
    let apiUrl = `${SERVER}/dogs`;
    let dogs;
    let result = await axios.get(apiUrl);
    dogs = result.data;
    this.setState({ dogs: dogs });
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
            <Link to="/">Cats</Link>
            <Link to="/dogs">Dogs</Link>
            <Link to="/about">About</Link>
            <Link to="/README">README</Link>

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
            } />
            <Route path="/dogs" element={
              <Dogs
                dogs={this.state.dogs}
                deleteDog={this.deleteDog}
                createDog={this.createDog}
                updateDog={this.updateDog}
              />
            } />
            <Route path="/about" element={
              <h1>A page about dogs and cats</h1>
            } />
            <Route path="/README" element={
              <h1>README Goes here.</h1>
            } />
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
