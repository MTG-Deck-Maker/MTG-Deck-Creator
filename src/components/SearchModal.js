import React from 'react';
import { Button, Form, Container, Modal } from 'react-bootstrap';

class SearchModal extends React.Component {
  
  handleCardAdd = (event) => {
    event.preventDefault();
    this.props.onHide();

    let cardToAdd = {
      // information for the card we want to update
      _id: this.props.card._id,
      name: this.props.card.name,
      rarity: this.props.card.rarity,
      imageUrl: this.props.card.imageUrl,
      owned: event.target.owned.checked,
      __v: this.props.card.__v
    }
    this.props.postCard(cardToAdd)
  }
  render() {
    return (
      <Modal
        show={this.props.isOpenSearchModal}
        onHide={this.props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <img alt='a card' src={this.props.card.imageUrl}></img>
            <Form onSubmit={this.handleCardAdd}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control defaultValue={this.props.card.name} type='text' />
              </Form.Group>
              <Form.Group controlId='owned'>
                <Form.Check defaultChecked={this.props.card.owned} type='checkbox' label='owned' />
              </Form.Group>
              <Button variant='info' type='submit'>Add Card</Button>
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

export default SearchModal;