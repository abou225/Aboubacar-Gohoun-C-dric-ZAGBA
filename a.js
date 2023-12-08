const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/votes', { useNewUrlParser: true, useUnifiedTopology: true });

const voteSchema = new mongoose.Schema({
  option: String,
  name: String,
  email: String
});

const Vote = mongoose.model('Vote', voteSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/submit-vote', async (req, res) => {
  try {
    const { option, name, email } = req.body;

    // À ce stade, vous devriez vérifier l'authenticité de l'utilisateur, gérer le vote unique, etc.

    const newVote = new Vote({
      option,
      name,
      email
    });

    await newVote.save();

    res.status(200).json({ message: 'Vote soumis avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la soumission du vote' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
