import React from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      searchQuery:'',
      location: {}
    }
  }

  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${this.state.searchQuery}&format=json`;
    const res = await axios.get(API);
    console.log(res.data[0])
    this.setState({ location:res.data[0] });
  }

  render() {
    return(
      <>
        <input onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="search for a city"></input>
        <button onClick={this.getLocation}>Explore!</button>
        {this.state.location.place_id &&
          <h2>The city is: {this.state.location.display_name}</h2>
        }
      </>
    )
  }
}

export default App;
