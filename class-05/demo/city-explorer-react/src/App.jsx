import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Explorer from './Explorer';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Header />
        <Explorer />
        <Footer />
      </div>
    );
  }
}

export default App;
