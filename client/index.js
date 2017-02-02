import React, { Component } from 'react';
import { Match } from 'react-router';
import fetchNode from 'node-fetch-polyfill';
import { withJob } from 'react-jobs/ssr';

const fetch = fetch || fetchNode;

class Home extends Component {
    constructor(props) {
        super(props);

        this.user = { name: 'did not', age: 'loaded' };
    }

    render() {
        const { job } = this.props;
        const user = job.completed ? job.result : this.user;
        return (
            <div>
                <div>This is app Home</div>
                <div>For more info get in touch with {user.name}</div>
                <div>He is {user.age}</div>
            </div>
        );
    }
}

const HomeAsync = withJob(
    () => fetch('http://localhost:3000/api/user')
        .then(res => res.json())
)(Home);

export default (
    <div>
        <Match pattern="/" component={HomeAsync} />
    </div>
);
