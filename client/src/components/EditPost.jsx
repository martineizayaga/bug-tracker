import React, { Component, useState, setState, useEffect } from 'react';
import { TextField, InputLabel, MenuItem, FormControl, FormHelperText, Select, Button, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

    function submit(e) {
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

      </form>
    )
}

// class EditPost extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       issue_type: '',
//       summary: '',
//       description: '',
//       priority: '',
//       done: false
//     };
//   }

//   componentDidMount() {
//       axios.get('/post/' + this.props.match.params.postId)
//         .then(response => {
//             this.setState({
//                 issue_type: response.data.issue_type,
//                 summary: response.data.summary,
//                 description: response.data.description,
//                 priority: response.data.priority,
//                 done: response.data.done
//             })
//         }).catch(function(error) {
//             console.error(error);
//         });
//   }

//   handleChange = e => {
//     const name = e.target.name;
//     const value = e.target.value;
//     console.log(name, value);
//     this.setState({ [name]: value });
//   };

//   submit = e => {
//     e.preventDefault();
//     const { 
//       issue_type: issue_type,
//       summary: summary,
//       description: description,
//       priority: priority,
//       done: done
//     } = this.state;
//     axios({
//       url: '/post/'+this.props.match.params.postId,
//       method: 'PUT',
//       data: {
//         issue_type: issue_type,
//         summary: summary,
//         description: description,
//         priority: priority,
//         done: done
//       }
//     })
//       .then((response) => {
//         this.setState({
//           issue_type: '',
//           summary: '',
//           description: '',
//           priority: '',
//           done: false
//         });
//       })
//       .catch(() => alert('Failed uploading data'))
//       this.props.history.push('/');
//   };
//   render() {
//     return (
//       <form className="form noValidate" autoComplete="off" onSubmit={this.submit}>
//         <h2>Create issue</h2>
//         <FormControl>
//           <InputLabel>Issue Type</InputLabel>
//           <Select
//             value={this.state.issue_type}
//             onChange={(e) =>  this.setState({'issue_type': e.target.value})}
//             displayEmpty
//           >
//             <MenuItem value={'Improvement'}>Improvement</MenuItem>
//             <MenuItem value={'Task'}>Task</MenuItem>
//             <MenuItem value={'New Feature'}>New Feature</MenuItem>
//           </Select>
//         </FormControl>

//         <TextField
//           name="description"
//           value={this.state.description}
//           id="standard-dense"
//           onChange={this.handleChange}
//           label="Description"
//         />

//         <TextField
//           name="summary"
//           value={this.state.summary}
//           id="standard-dense"
//           onChange={this.handleChange}
//           label="Summary"
//         />

//         <FormControl>
//           <InputLabel>Priority</InputLabel>
//           <Select
//             value={this.state.priority}
//             onChange={(e) =>  this.setState({'priority': e.target.value})}
//             displayEmpty
//           >
//             <MenuItem value={'Highest'}>Highest</MenuItem>
//             <MenuItem value={'High'}>High</MenuItem>
//             <MenuItem value={'Low'}>Low</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl>
//             <InputLabel>Done?</InputLabel>
//             <Checkbox
//                 checked={this.state.done}
//                 value="done"
//                 onClick={() => this.setState({'done': !this.state.done})}
//             />
//         </FormControl>

//         <Button variant="contained" color="primary" onClick={this.submit}>Edit</Button>

//       </form>
//     );
//   }
// }

export default EditPost;
