import React from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import SearchModal from './components/SearchModal'
import axios from 'axios';
import './SearchForm.css'
import { withAuth0 } from '@auth0/auth0-react';
import PlaceholderImg from './assets/NoImage.jpg'

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedCard: '',
      tempCards: [],
      isOpenSearchModal: false,
      selectedCard: {},
      loading: false
    }
  }

  handleInput = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    this.getCard(event.target.value);
    this.setState({
      searchedCard: event.target.value,
    });
  }

  getCard = async (name) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/card/${name}`;
      console.log(url)
      let cardData = await axios.get(url);

      console.log(cardData.data)
      this.setState({
        tempCards: cardData.data,
        loading: false
      });

    } catch (error) {
      console.log(error.message);
    }
  }

  // ********** THIS POSTS A CARD ************

  postCard = async (cardObj) => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims()
      const jwt = res.__raw
      // console.log(jwt);
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/card',
        data: cardObj
      }
      try {

        let createdCard = await axios(config);

        this.setState({
          cards: [...this.state.cards, createdCard.data]
        });
      }
      catch (error) {
        console.log(error.message);
      }
    }
  }

  openSearchModal = (cardObj) => this.setState({ isOpenSearchModal: true, selectedCard: cardObj });

  closeSearchModal = () => this.setState({ isOpenSearchModal: false });

  render() {

    return (
      <>

        <label className='search' htmlFor="">Search A Card By Name:
          <input className='search' type="text" onInput={this.handleInput} />
        </label>

        <SearchModal
          openSearchModal={this.openSearchModal}
          onHide={this.closeSearchModal}
          isOpenSearchModal={this.state.isOpenSearchModal}
          card={this.state.selectedCard}
          postCard={this.postCard}
        />

        {this.state.loading ?
          <Spinner animation="border" variant="danger" role="status" className='visually'>
            <span className="visually-hidden">Loading...</span>
          </Spinner> :
          <Spinner animation="border" variant="danger" role="status" className='visually-hidden'>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        }
        <Row xs={1} md={2} lg={3} xl={5} className="g-4">
          {
            this.state.tempCards.length > 0 ?
              this.state.tempCards.map((cardElem, idx) => {
                return (
                  <Col>
                    <Card key={idx} >
                      <Card.Img
                        onClick={() => { this.openSearchModal(cardElem) }}
                        variant="top"
                        src={cardElem.imageUrl ? cardElem.imageUrl : PlaceholderImg}
                      />
                    </Card>
                  </Col>
                )
              },
              ) : (
                <h1 className='noCards'>NO CARDS FOUND</h1>
              )
          }

        </Row>
      </>
    );
  }


}

export default withAuth0(SearchForm);