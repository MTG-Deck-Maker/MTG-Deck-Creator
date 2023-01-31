import React from 'react';
import axios from 'axios';
import CardModal from './components/CardModal';
import { Button, Card } from 'react-bootstrap';
import Search from './components/SearchForm';
import SearchModal from './components/SearchModal';

class DeckCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      tempCards: [],
      isOpen: false,
      selectedCard: {},
      isOpenSearchModal: false,
    }
  }
  // ********** THIS GETS CARDS FROM DB ************
  getCardsDb = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/card`;
      let cardData = await axios.get(url);
      this.setState({
        cards: cardData.data
      });


    } catch (error) {
      console.log(error.message);
    }
  }
  // ********** THIS GET A CARD FROM API ************
  getCard = async (name) => {
    console.log(name);
    try {
      let url = `${process.env.REACT_APP_SERVER}/card/${name}`;
      let cardData = await axios.get(url);

      this.setState({
        tempCard: cardData.data
      });


    } catch (error) {
      console.log(error.message);
    }
  }

  // ********** THIS POSTS A CARD ************
  postCard = async (cardObj) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/card`;
      let createdCard = await axios.post(url, cardObj);

      this.setState({
        cards: [...this.state.cards, createdCard.data]
      });
    }
    catch (error) {
      console.log(error.message);
    }
  }

  // ********** THIS UPDATES A CARD ************
  updateCard = async (cardToUpdate) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/card/${cardToUpdate._id}`;
      let updatedCard = await axios.put(url, cardToUpdate);
      let updatedCardArr = this.state.cards.map(existingCard => {
        return (existingCard._id === cardToUpdate._id ? updatedCard.data : existingCard);
      });

      this.setState({
        cards: updatedCardArr
      });
    }
    catch (error) {
      console.log(error.message);
    }
  }


  // ********** THIS DELETES A CARD ************

  deleteCard = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/card/${id}`;
      await axios.delete(url);
      let updatedCards = this.state.cards.filter(card => card._id !== id);

      this.setState({
        cards: updatedCards
      });
    }
    catch (error) {
      console.log(error.message);
    }
  };
  // **********THIS OPENS/CLOSE THE  MODALS ************
  openModal = (cardObj) => this.setState({ isOpen: true, selectedCard: cardObj });

  closeModal = () => this.setState({ isOpen: false, isOpenSearchModal: false });

  openSearchModal = () => this.setState({ isOpenSearchModal: true });


  componentDidMount() {
    this.getCardsDb();
  }



  render() {
    return (
      <>
        <h1>MTG Deck Builder</h1>
        < Search
          getCard={this.getCard}
          searchResults={this.state.tempCards}
          openSearchModal={this.openSearchModal}


        />
        <SearchModal
          openSearchModal={this.openSearchModal}
          onHide={this.closeModal}
          isOpenSearchModal={this.state.isOpenSearchModal}
          card={this.state.selectedCard}
          postCard={this.postCard}
        />
        <CardModal
          openModal={this.openModal}
          onHide={this.closeModal}
          isOpen={this.state.isOpen}
          card={this.state.selectedCard}
          updateCard={this.updateCard}
        />
        {this.state.cards.length > 0 ?
          this.state.cards.map((cardElem, idx) => {
            return (
              <Card key={cardElem._id} >
                <Card.Img
                  onClick={() => { this.openModal(cardElem) }}
                  variant="top"
                  src={cardElem.imageUrl}
                  style={{ width: '200px' }}
                />
                <Card.Body>
                  <Button variant="primary">Get Card</Button>
                </Card.Body>
              </Card>
            )
          },
          ) : (
            <h2>NO DECK FOUND</h2>
          )}
      </>
    )
  }
}



export default DeckCreate;