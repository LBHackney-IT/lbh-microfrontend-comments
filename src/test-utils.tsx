import { SWRConfig } from 'swr';
import { Router, Route } from 'react-router-dom';
import React from 'react';
import fetch from 'node-fetch';
import { rest } from 'msw';
import { createMemoryHistory, MemoryHistory } from 'history';
import { render, RenderResult } from '@testing-library/react';
import { queries } from '@mtfh/common';

import {
    generateMockReferenceDataV1,
    getReferenceDataV1,
    getTenureV1,
    server,
    generateMockCommentV1,
} from '@hackney/mtfh-test-utils';

export const mockCommentsV2 = Array.from({ length: 20 }).map(() =>
    generateMockCommentV1()
);

export const postCommentV2 = (data: any = mockCommentsV2, code = 200) =>
    rest.get('/api/v2/notes', (req, res, ctx) => {
        return res(ctx.status(code), ctx.json(data));
    });

const commentsRefData = Array.from({ length: 3 }).map((_, index) =>
    generateMockReferenceDataV1({
        category: 'comments',
        subCategory: 'category',
        code: `categoryCode${index + 1}`,
        value: `Category value ${index + 1}`,
    })
);

Object.defineProperty(global, 'fetch', {
    value: fetch,
    writable: true,
});

beforeAll(() => {
    server.listen();
});

beforeEach(() => {
    server.use(getTenureV1());
    server.use(getReferenceDataV1(commentsRefData), postCommentV2());
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

interface RouteRenderConfig {
    url: string;
    path: string;
    query: keyof typeof queries;
}

export const routeRender = (
    component: JSX.Element,
    options?: Partial<RouteRenderConfig>
): [RenderResult, MemoryHistory] => {
    const config: RouteRenderConfig = {
        url: `/comment/person/123`,
        path: '/comment/:targetType/:entityId',
        query: 'lg',
        ...options,
    };
    const history = createMemoryHistory();
    history.push(config.url);
    return [
        render(
            <SWRConfig
                value={{
                    provider: () => new Map(),
                    dedupingInterval: 0,
                    errorRetryInterval: 0,
                }}
            >
                <Router history={history}>
                    <Route path={config.path}>{component}</Route>
                </Router>
            </SWRConfig>
        ),
        history,
    ];
};

export const get = (path: string, data: unknown, code = 200): void => {
    server.use(
        rest.get(path, (request, response, context) => {
            return response(context.status(code), context.json(data));
        })
    );
};

export const post = (path: string, data: unknown, code = 200): void => {
    server.use(
        rest.post(path, (request, response, context) => {
            return response(context.status(code), context.json(data));
        })
    );
};

window.HTMLElement.prototype.scrollIntoView = jest.fn();
