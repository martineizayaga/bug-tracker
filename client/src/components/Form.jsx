import React, { Component } from 'react';
import { TextField, InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core';
import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issue_type: '',
      summary: '',
      description: '',
      priority: '',
    };
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    this.setState({ [name]: value });
  };

  submit = e => {
    e.preventDefault();
    const { 
      issue_type: issue_type,
      summary: summary,
      description: description,
      priority: priority,
    } = this.state;
    console.log(this.state);
    axios({
      url: '/add',
      method: 'POST',
      data: {
        issue_type: issue_type,
        summary: summary,
        description: description,
        priority: priority,
        done: false
      }
    })
      .then((response) => {
        this.setState({
          issue_type: '',
          summary: '',
          description: '',
          priority: '',
        });
      })
      .catch(() => alert('Failed uploading data'))
      this.props.history.push('/');
  };
  render() {
    return (
      <form className="form noValidate" autoComplete="off" onSubmit={this.submit}>
        <h2>Create issue</h2>
        <FormControl>
          <InputLabel>Issue Type</InputLabel>
          <Select
            value={this.state.issue_type}
            onChange={(e) =>  this.setState({'issue_type': e.target.value})}
            displayEmpty
          >
            <MenuItem value={'Improvement'}>Improvement</MenuItem>
            <MenuItem value={'Task'}>Task</MenuItem>
            <MenuItem value={'New Feature'}>New Feature</MenuItem>
          </Select>
        </FormControl>

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

        <FormControl>
          <InputLabel>Priority</InputLabel>
          <Select
            value={this.state.priority}
            onChange={(e) =>  this.setState({'priority': e.target.value})}
            displayEmpty
          >
            <MenuItem value={'Highest'}>Highest</MenuItem>
            <MenuItem value={'High'}>High</MenuItem>
            <MenuItem value={'Low'}>Low</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={this.submit}> Submit </Button>

      </form>
    );
  }
}

export default Form;
