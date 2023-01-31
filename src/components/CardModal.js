import React from 'react';
import { Button, Form, Container, Modal } from 'react-bootstrap';

class CardModal extends React.Component {
  
  handleCardUpdate = (event) => {
    event.preventDefault();
    this.props.onHide();

    let cardToUpdate = {
      // information for the card we want to update
      name: event.target.name.value,
      owned: event.target.status.owned,
      _id: this.props.card._id,
      __v: this.props.card.__v
    }
    this.props.updateCard(cardToUpdate)
  }
  render() {
    return (
      <Modal
        show={this.props.isUpdateOpen}
        onHide={this.props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <img alt='a card' src={this.props.card.imageUrl}></img>
            <Form onSubmit={this.handleCardUpdate}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control defaultValue={this.props.card.name} type='text' />
              </Form.Group>
              <Form.Group controlId='owned'>
                <Form.Check defaultChecked={this.props.card.owned} type='checkbox' label='owned' />
              </Form.Group>
              <Button variant='info' type='submit'>Update This card</Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default CardModal;