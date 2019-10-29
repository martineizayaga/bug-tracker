import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const { isEmpty } = require('lodash');



class DisplayPosts extends Component {
    render() {
        const allPosts = this.props.posts;
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
