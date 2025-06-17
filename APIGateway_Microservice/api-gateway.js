const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || "347186591486#^%%ABCF*##GHE";

function authToken(req, res, next) {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];
  if (!token) return res.status(401).json("Missing token");

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Invalid token");
    req.user = user;
    next();
  });
}

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json("Unauthorized");
    }
    next();
  };
}

// Registration/Login Microservice
app.use('/auth', (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:5001' });
});

// Club Microservice
app.use('/club', authToken, authRole('club_leader'), (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:5002' });
});

// Event Microservice
app.use('/event', authToken, authRole('club_leader'), (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:5003' });
});

// Budget Microservice
app.use('/budget', authToken, authRole('club_leader'), (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:5004' });
});

// Inventory Microservice
app.use('/inventory', authToken, authRole('club_leader'), (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:5005' });
});

app.listen(4000, () => {
  console.log("API Gateway is running on PORT 4000");
});
