import React from 'react';
import axios from 'axios';
import CardModal from './components/CardModal';
import { Card } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

class DeckCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      isOpen: false,
      selectedCard: {},
    }
  }
  // ********** THIS GETS CARDS FROM DB ************
  getCardsDb = async () => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims()
      const jwt = res.__raw
      // console.log(jwt);
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/card',
      }

      try {
        let cardData = await axios(config);
        this.setState({
          cards: cardData.data
        });


      } catch (error) {
        console.log(error.message);
      }
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
      this.closeModal();
    }
    catch (error) {
      console.log(error.message);
    }
  };
  // **********THIS OPENS/CLOSE THE  MODALS ************
  openModal = (cardObj) => this.setState({ isOpen: true, selectedCard: cardObj });

  closeModal = () => this.setState({ isOpen: false });



  componentDidMount() {
    this.getCardsDb();
  }



  render() {
    //** refills cards[] after logging in
    this.props.auth0.isAuthenticated && this.getCardsDb()

    return (
      <>
        <h1>MTG Deck Builder</h1>

        <CardModal
          openModal={this.openModal}
          onHide={this.closeModal}
          isOpen={this.state.isOpen}
          card={this.state.selectedCard}
          updateCard={this.updateCard}
          deleteCard={this.deleteCard}
        />

        {/* renders only when logged in */}
        {this.props.auth0.isAuthenticated ?
          (this.state.cards.length > 0 ?
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
                  </Card.Body>
                </Card>
              )
            }) :
            <h2>NO DECK FOUND</h2>
          ) :
          <div>
            <h2>PLEASE LOGIN</h2>
            <iframe src="https://giphy.com/embed/t0virGpgSlp4mkfiXq" width="480" height="270" frameBorder="0" className="giphy-embed" allowFullScreen title="login"></iframe>
            <p><a href="https://giphy.com/gifs/adultswim-adult-swim-birdgirl-access-denied-t0virGpgSlp4mkfiXq">via GIPHY</a></p>
          </div>
        }
      </>
    )
  }
}



export default withAuth0(DeckCreate);