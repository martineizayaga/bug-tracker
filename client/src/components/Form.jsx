import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

class Form extends Component {
  state = {
    issue_type: '',
    summary: '',
    description: '',
    priority: ''
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  submit = e => {
    e.preventDefault();
    const { 
      issue_type: issue_type,
      summary: summary,
      description: description,
      priority: priority
    } = this.state;
    axios({
      url: '/add',
      method: 'POST',
      data: {
        issue_type: issue_type,
        summary: summary,
        description: description,
        priority: priority
      }
    })
      .then((response) => {
        this.props.addPost(response.data);
        this.setState({
          issue_type: '',
          summary: '',
          description: '',
          priority: ''
        });
      })
      .catch(() => alert('Failed uploading data'))
  };
  render() {
    return (
      <form className="form noValidate" autoComplete="off" onSubmit={this.submit}>
        <h2>Please, Tell us about you</h2>
        <TextField
          id="standard-dense"
          value={this.state.issue_type}
          label="Issue Type"
          name="issue_type"
          onChange={this.handleChange}
        />

        <TextField
          name="description"
          value={this.state.description}
          id="standard-dense"
          onChange={this.handleChange}
          label="Description"
        />

        <TextField
          name="summary"
          value={this.state.summary}
          id="standard-dense"
          onChange={this.handleChange}
          label="Summary"
        />

        <TextField
          name="priority"
          value={this.state.priority}
          id="standard-dense"
          onChange={this.handleChange}
          label="Priority"
        />

        <Button variant="contained" color="primary" onClick={this.submit}> Submit </Button>

      </form>
    );
  }
}

export default Form;
