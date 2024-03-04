const jsonServer = require('json-server');
const express = require('express');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Tạo một ứng dụng Express mới
const app = express();

// Sử dụng các middleware mặc định của JSON Server
app.use(middlewares);

// Serve static files từ thư mục 'uploads'
app.use('../uploads', express.static(path.join(__dirname, 'uploads')));

// Rewrite rules
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

// Sử dụng router
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});

module.exports = server;
