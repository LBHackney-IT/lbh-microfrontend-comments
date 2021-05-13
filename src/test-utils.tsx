import { Router, Route } from 'react-router-dom';
import React from 'react';
import fetch from 'node-fetch';
import { createMemoryHistory, MemoryHistory } from 'history';
import { render, RenderResult } from '@testing-library/react';
import { server } from './mocks';

Object.defineProperty(global, 'fetch', {
    value: fetch,
    writable: true,
});

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});

interface CustomRenderResult extends RenderResult {
    history: MemoryHistory;
}

export const customRender = (
    component: JSX.Element,
    id = 'be8c805c-b1de-11eb-8529-0242ac130003'
): CustomRenderResult => {
    const history = createMemoryHistory();
    history.push(`/comment/person/${id}`);
    const utils = render(
        <Router history={history}>
            <Route path="/comment/:type/:id">{component}</Route>
        </Router>
    );
    return {
        ...utils,
        history,
    };
};
