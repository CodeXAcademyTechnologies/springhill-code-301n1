import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Cats extends React.Component {
  render() {
    return (
      <ListGroup>
        {this.props.cats.length && this.props.cats.map((cat, idx) => (
          <ListGroup.Item key={idx}>
            {cat.name} in {cat.location}
          </ListGroup.Item >
        ))}
      </ListGroup>
    )
  }
}

export default Cats;