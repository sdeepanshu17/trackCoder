import { createProxyMiddleware } from 'http-proxy-middleware';

export const codechefProxy = createProxyMiddleware('/codechef', {
    target: 'https://www.codechef.com',
    changeOrigin: true,
    pathRewrite: {
        '^/codechef': ''
    },
    onProxyRes: (proxyRes, req, res) => {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
    onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.status(500).send('Error occurred while fetching data.');
    }
});

export const atcoderProxy = createProxyMiddleware('/atcoder', {
    target: 'https://atcoder.jp',
    changeOrigin: true,
    pathRewrite: {
        '^/atcoder': ''
    },
    onProxyRes: (proxyRes, req, res) => {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
    onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.status(500).send('Error occurred while fetching data.');
    }
});

export const atcoderKKProxy = createProxyMiddleware('/atcoderkk', {
    target: 'https://kenkoooo.com/atcoder/atcoder-api/v3/',
    changeOrigin: true,
    pathRewrite: {
        '^/atcoderkk': ''
    },
    onProxyRes: (proxyRes, req, res) => {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
    onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.status(500).send('Error occurred while fetching data.');
    }
});