import React, { Component } from 'react';
import Form from './components/Form';
import DisplayPosts from './components/DisplayPosts';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    posts: []
  }

  addPost = ({ issue_type, summary, description, priority }) => {
    this.setState({
      posts: [...this.state.posts, { issue_type, summary, description, priority }]
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Form addPost={this.addPost}/>
          <Route path="/" exact component={DisplayPosts}/>
        </div>
      </Router>
    );
  }
}

export default App;
