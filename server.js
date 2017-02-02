import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import clientApp from './client-compiled';
import { runJobs } from 'react-jobs/ssr';

// client part
const context = createServerRenderContext()

// server part
const app = express();

app.get('/', function (req, res) {
    runJobs(
        <ServerRouter
            location={req.url}
            context={context}
        >
            {clientApp}
        </ServerRouter>
    )
        .then((runResult) => {
            const { appWithJobs } = runResult;
            const appString = renderToString(appWithJobs);

            res.send(appString);
        });
});

app.get('/api/user', function (req, res) {
    res.json({
        name: 'Bob',
        age: 32
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
