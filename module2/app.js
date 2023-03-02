const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

let users = [
  { id: '1', login: 'user1', password: '1234aB', age: 20, isDeleted: false },
  { id: '2', login: 'user2', password: '5678cD', age: 25, isDeleted: false },
  { id: '3', login: 'user3', password: '9012eF', age: 30, isDeleted: false }
];

// Validation schemas
const userSchema = Joi.object({
  id: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.boolean().required()
});

const loginSchema = Joi.object({
  loginSubstring: Joi.string().required(),
  limit: Joi.number().integer().positive().required()
});

// CRUD operations for User entity
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id && !u.isDeleted);
  
  if (!user) return res.status(404).send('User not found');

  res.send(user);
});

app.post('/users', (req, res) => {
  const { error } = userSchema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  const user = { ...req.body, isDeleted: false };

  users.push(user);
  res.send(user);
});

app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id && !u.isDeleted);

  if (!user) return res.status(404).send('User not found');
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Object.assign(user, req.body);
  res.send(user);
});

app.delete('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id && !u.isDeleted);
  if (!user) return res.status(404).send('User not found');

  user.isDeleted = true;

  res.send('User deleted successfully');
});

app.get('/users', (req, res) => {
  const { error } = loginSchema.validate(req.query);
  if (error) return res.status(400).send(error.details[0].message);

  const { loginSubstring, limit } = req.query;
  const filteredUsers = users.filter(u => u.login.includes(loginSubstring) && !u.isDeleted);
  const sortedUsers = filteredUsers.sort((a, b) => a.login.localeCompare(b.login));
  const result = sortedUsers.slice(0, limit);

  res.send(result);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));