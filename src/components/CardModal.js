import React from 'react';
import { Button, Form, Container, Modal } from 'react-bootstrap';

class CardModal extends React.Component {
  
  handleCardUpdate = (event) => {
    event.preventDefault();
    this.props.onHide();

    let cardToUpdate = {
      // information for the card we want to update
      _id: this.props.card._id,
      name: this.props.card.name,
      rarity: this.props.card.rarity,
      imageUrl: this.props.card.imageUrl,
      owned: event.target.owned.checked,
      email: this.props.card.email,
      __v: this.props.card.__v
    }
    this.props.updateCard(cardToUpdate)
  }
  render() {
    return (
      <Modal
        show={this.props.isOpen}
        onHide={this.props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.card.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <img className='cardImg'  alt='a card' src={this.props.card.imageUrl}></img>
            <Form onSubmit={this.handleCardUpdate}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control defaultValue={this.props.card.name} type='text' />
              </Form.Group>
              <Form.Group controlId='owned'>
                <Form.Check defaultChecked={this.props.card.owned} type='checkbox' label='owned' />
              </Form.Group>
              <Button variant='secondary' type='submit'>Update Card</Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={() => {this.props.deleteCard(this.props.card._id)}}>Delete</Button>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default CardModal;