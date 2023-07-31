import React from 'react';
import Jobs from './Jobs';
import Header from './Header';

class App extends React.Component {
  render() {
    return(
      <>
        <Header />
        <Jobs />
      </>
    )
  }
}

export default App;
