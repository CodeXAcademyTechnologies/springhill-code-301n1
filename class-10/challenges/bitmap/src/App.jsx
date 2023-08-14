import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

let zero = {width: 50, height: 50, backgroundColor: "black"};
let one = {width: 50, height: 50, backgroundColor: "white"};

let bitmap0 = 
[
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
];

class Box extends React.Component {
  render(){
    return (
      <Col>
      {
        this.props.bit === 0 ?
        <div style={zero}></div>
        :
        <div style={one}></div>
      }
      </Col>
    );
  }
}


class App extends React.Component {

  render() {
    let bitmap = bitmap0;
    let components2D = [];
    for(let row of bitmap) {
      let componentRow = [];
      for(let pixel of row) {
        componentRow.push(
            <Col className="gx-0">
              <Box bit={pixel} />
            </Col>
        );
      }
      components2D.push(<Row> {componentRow} </Row>);
    }
    return (
      <main className='main'>
        <Container>
          { components2D }
        </Container>
      </main>
    )}
}

export default App
