import React from 'react';
import { Button, Card } from 'react-bootstrap';


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedCard: ''
    }
  }
  handleInput = (event) => {
    event.preventDefault();
    this.setState({
      searchedCard: event.target.value
    })
  }


  render() {
    return (
      <>
        <form onSubmit={() => { this.props.getCard(this.state.SearchedCard) }}>
          <label htmlFor="">Search A Card By Name:
            <input type="text" onInput={this.handleInput} />
          </label>
          <button type='submit'>Search</button>
        </form>

        {
          this.props.searchResults.length > 0 ?
            this.props.searchResults.map((cardElem, idx) => {
              return (
                <Card key={cardElem._id} >
                  <Card.Img
                    onClick= { this.props.openSearchModal }
                    variant="top"
                    src={cardElem.imageUrl}
                    style={{ width: '200px' }}
                  />
                  <Card.Body>
                    <Button variant="primary" onClick={ () =>{this.props.postCard(cardElem)}}>Add Card</Button>
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