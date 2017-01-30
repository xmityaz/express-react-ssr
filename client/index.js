import React, { Component } from 'react';
import { Match } from 'react-router';
import fetchNode from 'node-fetch-polyfill';

const fetch = fetch || fetchNode;

class Home extends Component {
    constructor(props) {
        super(props);

        this.user = { name: 'did not', age: 'loaded' };
    }

    componentWillMount() {
        fetch('http://localhost:3000/api/user')
            .then(res => res.json())
            .then(user => {
                console.log('BLABLABLA', user, Date.now());
                this.user = user;
            });
    }

    render() {
        const user = this.user;
        return (
            <div>
                <div>This is app Home</div>
                <div>For more info get in touch with {user.name}</div>
                <div>He is {user.age}</div>
            </div>
        );
    }
}

// class Story extends Component {
//     render() {
//         return (
//             <div>This is Story view</div>
//         );
//     }
// }

export default (
    <div>
        <Match pattern="/" component={Home} />
    </div>
);
