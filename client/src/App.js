import React, { Component } from 'react';
import Form from './components/Form';
import DisplayPosts from './components/DisplayPosts';
import EditPost from './components/EditPost';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  state = {
    posts: []
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={DisplayPosts}/>
          <Route path="/create" component={Form} />
          <Route path="/edit/:postId" component={EditPost}/>
        </div>
      </Router>
    );
  }
}

export default App;
