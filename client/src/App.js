import React, { Component } from 'react';
import Form from './components/Form';
import DisplayPosts from './components/DisplayPosts';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    posts: []
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Form/>
          <Route path="/" exact component={DisplayPosts}/>
          {/* <Route path="create" component={Form} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
