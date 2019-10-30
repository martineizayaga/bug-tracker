import React, { Component, useEffect, useState } from 'react';
// import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';
import { Table, Button, Row, Col } from 'antd';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

import styles from './DisplayPosts.module.css';

const { isEmpty } = require('lodash');

function DisplayPosts() {
    const [posts, setPosts] = useState([]);

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
            title: 'Done',
            key: 'done',
            render: (text, record) => {
                if (record.done) {
                    return '✅'
                } else {
                    return '🚫'
                }
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Link to={"/edit/"+record._id}>Edit</Link>
            )
        }
    ]

    useEffect(() => {
        axios.get('/posts')
        .then((res) => {
            setPosts(res.data.posts)
            console.log('posts', res.data.posts)
        })
        .catch(() => alert('Error fetching new posts'));
    }, [])

    return (
        <div className="users">
            <h1 style={{marginTop: 30}}>Bug Tracker</h1>
            <hr></hr>
            <Row>
                <Col span={5}>
                    <h2>All Issues</h2>
                </Col>
                <Col span={3} offset={16}>
                    <Link to="/create"><Button type="primary">Create</Button></Link>
                </Col>
            </Row>
            <div className={styles.tableWrapper}>
                <Table dataSource={posts} columns={columns}/>
            </div>
        </div>
    )
}

export default DisplayPosts;
