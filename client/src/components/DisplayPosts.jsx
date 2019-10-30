import React, { Component } from 'react';
// import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';
import { Table, Button, Row, Col } from 'antd';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

import styles from './DisplayPosts.module.css';

const { isEmpty } = require('lodash');

class DisplayPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }
    
    componentDidMount = () => {
        this.fetchPosts();
    };

    fetchPosts = () => {
        axios.get('/posts')
          .then((response) => {
            const { posts } = response.data;
            console.log('posts', posts)
            this.setState({ posts: [...this.state.posts, ...posts] })
          })
          .catch(() => alert('Error fetching new posts'));
      };

    render() {
        console.log('display posts render');
        const allPosts = this.state.posts;
        const posts = !isEmpty(allPosts) ? allPosts : [];

        const columns = [
            {
                title: 'Issue Type',
                dataIndex: 'issue_type',
                key: 'issue_type'
            },
            {
                title: 'Summary',
                dataIndex: 'summary',
                key: 'summary'
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description'
            },
            {
                title: 'Priority',
                dataIndex: 'priority',
                key: 'priority'
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>{record._id}</span>
                )
            }
        ]

        return (
            <div className="users">
                <Row>
                    <Col span={3}>
                        <h1>Issues</h1>
                    </Col>
                    <Col span={3} offset={18} style={{marginTop: 10}}>
                        <Link to="/create"><Button>Create</Button></Link>
                    </Col>
                </Row>
                <div className={styles.tableWrapper}>
                    <Table dataSource={posts} columns={columns}/>
                </div>
            </div>
        );
    }
}

export default DisplayPosts;
