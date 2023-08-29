import React from "react";
import { ListGroup, Form, Button } from "react-bootstrap";


class Dogs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dogIdToUpdate: null,
      isUpdatingDog: false
    }
  }

  handleDelete = (id) => {
    this.props.deleteDog(id);
  }

  // for create dog
  handleSubmit = async (event) => {
    event.preventDefault();
    let dogObj = {
      name: event.target.name.value,
      breed: event.target.breed.value,
      age: event.target.age.value

    }
    console.log(dogObj);
    const newDog = await this.props.createDog(dogObj);
    console.log(newDog);
  }

  openUpdate = (dog_id) => {
    this.setState({
      dogIdToUpdate: dog_id,
      isUpdatingDog: true
    })
  }

  render() {
    console.log(this.props.dogs);
    const dogsComponents = this.props.dogs.map(dog => (
      <ListGroup.Item key={dog._id}>
        {dog.name} | {dog.breed} | Age: ( {dog.age} )
        <span onClick={() => this.openUpdate(dog._id)}>
          &nbsp; [ Update ]
        </span>
        <span onClick={() => this.handleDelete(dog._id)}>
          &nbsp; [ X ]
        </span>
      </ListGroup.Item>
    ))
    return (
      <>
        <h3>Dogs</h3>
        <ListGroup>
          {this.props.dogs.length > 0 && dogsComponents}
        </ListGroup>
        {
          this.state.isUpdatingDog &&
          (<UpdateDogForm 
             updateDog={this.props.updateDog} 
             dogIdToUpdate={this.state.dogIdToUpdate}
           />)
        }
        {/* Create Form here... */}
        <Form onSubmit={this.handleSubmit} style={{ padding: "10%" }}>
          <h2>Create Dog</h2>
          <Form.Control type="text" name="name" placeholder="Name" />
          <Form.Control type="text" name="breed" placeholder="Breed" />
          <Form.Control type="text" name="age" placeholder="Age" />
          <Button type="submit"> Submit </Button>
        </Form>
      </>
    );
  }
}

// Review:
// 1. What Props do we need to pass to Dogs to get Create and Delete to work?
// 2. What info does the Delete function need? Ans: dog_id
// 3. What info does the Create function need? Ans: dogObj

// TODO: UpdateDogForm Goes here
// 1. What are the props we should pass to Update?
//    a) updateDogs function
//    b) dogIdToUpdate
// 2. What info about a dog do we need to Update it?
//    dogId and dogObj
// 3. Where does that info come from?
//    props and the form

class UpdateDogForm extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault();
    alert(event.target.age.value);
    let dogObj = {
      age: event.target.age.value
    };
    this.props.updateDog(this.props.dogIdToUpdate, dogObj);
  }

  render() {
    return (
      <Form style={{ padding: "10%" }} onSubmit={this.handleSubmit}>
        <h2>Update Dog {this.props.dogIdToUpdate}</h2>
        <Form.Control type="text" placeholder="Age" name="age" />
        <Button type="submit">Update this dog</Button>
      </Form>
    );
  }
}


export default Dogs;