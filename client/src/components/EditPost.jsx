import React, { useState, useEffect } from 'react';
import { TextField, InputLabel, MenuItem, FormControl, Select, Button, Checkbox } from '@material-ui/core';
import axios from 'axios';

function EditPost(props) {
    const [issue_type, setIssueType] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        axios.get('/post/' + props.match.params.postId)
        .then(response => {
            setIssueType(response.data.issue_type);
            setSummary(response.data.summary);
            setDescription(response.data.description);
            setPriority(response.data.priority);
            setDone(response.data.done);
        }).catch(function(error) {
            console.error(error);
        });
    }, []);

    function delete_post(e) {
      axios.delete('/post/' + props.match.params.postId)
      .then((res) => {
        console.log(res)
      })
      .catch(function (err) {
        console.error(err);
      });
      props.history.push('/');
    }

    function submit(e) {
      console.log({
        'issue_type': issue_type,
        'summary': summary,
        'description': description,
        'priority': priority,
        'done': done
      });
        axios({
            url: '/post/' + props.match.params.postId,
            method: 'PUT',
            data : {
                issue_type: issue_type,
                summary: summary,
                description: description,
                priority: priority,
                done: done
            }
        })
        .then((response) => {
            setIssueType('');
            setSummary('');
            setDescription('');
            setPriority('');
            setDone(false);
        })
        .catch(() => alert('Failed uploading data'))
        props.history.push('/');
    };

    return (
        <form className="form noValidate" autoComplete="off" onSubmit={submit}>
        <h2>Create issue</h2>
        <FormControl>
          <InputLabel>Issue Type</InputLabel>
          <Select
            value={issue_type}
            onChange={(e) => setIssueType(e.target.value)}
            displayEmpty
          >
            <MenuItem value={'Improvement'}>Improvement</MenuItem>
            <MenuItem value={'Task'}>Task</MenuItem>
            <MenuItem value={'New Feature'}>New Feature</MenuItem>
          </Select>
        </FormControl>

        <TextField
          name="description"
          value={description}
          id="standard-dense"
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
        />

        <TextField
          name="summary"
          value={summary}
          id="standard-dense"
          onChange={(e) => setSummary(e.target.value)}
          label="Summary"
        />

        <FormControl>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            name="priority"
            onChange={(e) =>  setPriority(e.target.value)}
            displayEmpty
          >
            <MenuItem value={'Highest'}>Highest</MenuItem>
            <MenuItem value={'High'}>High</MenuItem>
            <MenuItem value={'Low'}>Low</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
            <InputLabel>Done?</InputLabel>
            <Checkbox
                checked={done}
                value="done"
                onClick={() => setDone(!done)}
            />
        </FormControl>

        <Button variant="contained" color="primary" onClick={submit}>Edit</Button>
        <Button variant="contained" color="secondary" onClick={delete_post}>Delete</Button>

      </form>
    )
}

export default EditPost;
