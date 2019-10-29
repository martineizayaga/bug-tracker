import React, { Component } from 'react';
import Form from './components/Form';
import DisplayPosts from './components/DisplayPosts';
import axios from 'axios';
import './App.css';
class App extends Component {
  state = {
    posts: []
  }

  componentDidMount = () => {
    this.fetchPosts();
  };

  fetchPosts = () => {
    axios.get('/posts')
      .then((response) => {
        const { posts } = response.data;
        this.setState({ posts: [...this.state.posts, ...posts] })
      })
      .catch(() => alert('Error fetching new posts'));
  };


  addPost = ({ issue_type, summary, description, priority }) => {
    this.setState({
      posts: [...this.state.posts, { issue_type, summary, description, priority }]
    });
  };

  render() {
    return (
      <div className="App">
        <Form addPost={this.addPost}/>
        < DisplayPosts posts={this.state.posts} />

      </div>
    );
  }
}

export default App;
