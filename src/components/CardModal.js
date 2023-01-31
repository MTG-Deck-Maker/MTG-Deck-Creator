import React from 'react';
import { Button, Form, Container, Modal } from 'react-bootstrap';

class UpdateCardModal extends React.Component {
  
  handleCardUpdate = (event) => {
    event.preventDefault();
    this.props.onHide();

    let cardToUpdate = {
      // information for the card we want to update
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked,
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
            <Form onSubmit={this.handleCardUpdate}>
              <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control defaultValue={this.props.card.title} type='text' />
              </Form.Group>
              <Form.Group controlId='description'>
                <Form.Label>description</Form.Label>
                <Form.Control defaultValue={this.props.card.description} type='text' />
              </Form.Group>
              <Form.Group controlId='status'>
                <Form.Check defaultChecked={this.props.card.status} type='checkbox' label='status' />
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

export default UpdateCardModal;