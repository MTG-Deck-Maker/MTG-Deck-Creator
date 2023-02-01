import React from 'react';
import { Button, Card } from 'react-bootstrap';
import SearchModal from './components/SearchModal'
import axios from 'axios';


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedCard: '',
      tempCards: [],
      isOpenSearchModal: false,
      selectedCard: {},
    }
  }

  handleInput = (event) => {
    event.preventDefault();
    this.getCard(event.target.value)
    this.setState({
      searchedCard: event.target.value
    })
  }

  getCard = async (name) => {
    console.log('big', name);
    try {
      let url = `${process.env.REACT_APP_SERVER}/card/${name}`;
      console.log(url)
      let cardData = await axios.get(url);

      console.log(cardData.data)
      this.setState({
        tempCards: cardData.data
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

  openSearchModal = (cardObj) => this.setState({ isOpenSearchModal: true, selectedCard: cardObj });

  closeSearchModal = () => this.setState({ isOpenSearchModal: false });
  
  render() {
    return (
      <>
        <form onSubmit={() => this.handleInput()}>
          <label htmlFor="">Search A Card By Name:
            <input type="text" onInput={this.handleInput} />
          </label>
          {/* <button type='submit'>Search</button> */}
        </form>

        <SearchModal
          openSearchModal={this.openSearchModal}
          onHide={this.closeSearchModal}
          isOpenSearchModal={this.state.isOpenSearchModal}
          card={this.state.selectedCard}
          postCard={this.postCard}
        />

        {
          this.state.tempCards.length > 0 ?
            this.state.tempCards.map((cardElem, idx) => {
              return (
                <Card key={idx} >
                  <Card.Img
                    onClick={() => { this.openSearchModal(cardElem) }}
                    variant="top"
                    src={cardElem.imageUrl}
                    style={{ width: '200px' }}
                  />
                  <Card.Body>
                    {/* <Button variant="primary" onClick={ () =>{this.postCard(cardElem)}}>Add Card</Button> */}
                  </Card.Body>
                </Card>
              )
            },
            ) : (
              <h2>NO CARDS FOUND</h2>
            )
        }
      </>
    );
  }


}

export default SearchForm;