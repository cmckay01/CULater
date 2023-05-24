const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./culater-admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = admin.firestore();

app.get('/', (req, res) => {
  res.send('Welcome to CUlater API!');
});

app.get('/users', async (req, res) => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
});

/* app.post('/users', async (req, res) => {
  const newUser = req.body;

  // You can add validation for the newUser object here

  try {
    const userRef = await db.collection('users').add(newUser);
    res.status(201).json({ message: 'User created', id: userRef.id, ...newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
}); */


app.post('/users', async (req, res) => {
  const newUser = req.body;

  // You can add validation for the newUser object here

  try {
    const userRef = await db.collection('users').add(newUser);
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.data();

    res.status(201).json({ message: 'User created', id: userRef.id, ...userData });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
