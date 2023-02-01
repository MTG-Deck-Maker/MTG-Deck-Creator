import React from 'react';
import Header from './Header';
import Footer from './Footer';
import DeckCreator from './DeckCreator';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SearchForm from './SearchForm';


class App extends React.Component {


  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route
              exact path="/"
              element={<DeckCreator />}
            >
            </Route>
            <Route
              exact path="/SearchForm"
              element={<SearchForm />}
            >
            </Route>
            <Route
              exact path="/about"
              element={<About />}
            >
            </Route>

          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
