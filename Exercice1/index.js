const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/posts', async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


app.post('/posts', async (req, res) => {
  try {
    const newPost = req.body;
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erreur lors de la création d\'un article:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


app.put('/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPost = req.body;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erreur lors de la modification d\'un article:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


app.delete('/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      res.json({ message: 'Article supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Article non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression d\'un article:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});