import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';

const { isEmpty } = require('lodash');



class DisplayPosts extends Component {
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

    render() {
        console.log('display posts render');
        const allPosts = this.state.posts;
        const posts = !isEmpty(allPosts) ? allPosts : [];

        return (
            <div className="users">
                {!isEmpty(posts) ? <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Issue Type</TableCell>
                            <TableCell align="right">Summary</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Priority</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map(({ issue_type, description, summary, priority }, key) => (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row"> {issue_type ? issue_type : 'No Issue Type Found'} </TableCell>
                                <TableCell align="right">{summary ? summary : 'No Summary Found'}</TableCell>
                                <TableCell align="right">{description ? description : 'No Description Found'}</TableCell>
                                <TableCell align="right">{priority ? priority : "No Priority Found"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> : null}
            </div>
        );
    }
}

export default DisplayPosts;
