import React from "react";
import { ListGroup } from "react-bootstrap";


class Dogs extends React.Component {

  render () {
    console.log(this.props.dogs);
    const dogsComponents = this.props.dogs.map(dog => (
      <ListGroup.Item key={dog._id}>
        {dog.name} | {dog.breed}
      </ListGroup.Item>
    ))
    return (
      <>
        <h3>Dogs</h3>
        <ListGroup>
          { this.props.dogs.length > 0 && dogsComponents }
        </ListGroup>
      </>
    );
  }
}

export default Dogs;