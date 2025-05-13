const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

let votes = {
  'Candidate 1': 0,
  'Candidate 2': 0,
  'Candidate 3': 0,
};

// File to store voter records
const voterFile = path.join(__dirname, 'voters.json');

// Ensure voter file exists
if (!fs.existsSync(voterFile)) {
  fs.writeFileSync(voterFile, JSON.stringify([]));
}

// Check if voter exists
app.post('/check-voter', (req, res) => {
  const { name, email, voterId } = req.body;
  const voters = JSON.parse(fs.readFileSync(voterFile));
  const exists = voters.some(v => v.name === name && v.email === email && v.voterId === voterId);
  res.json({ exists });
});

// Cast vote
app.post('/vote', (req, res) => {
  const { candidate, name, email, voterId } = req.body;

  if (!candidate || !name || !email || !voterId) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const voters = JSON.parse(fs.readFileSync(voterFile));
  const exists = voters.some(v => v.name === name && v.email === email && v.voterId === voterId);

  if (exists) {
    return res.status(400).json({ message: 'You have already voted!' });
  }

  // Record the vote
  if (votes[candidate] !== undefined) {
    votes[candidate] += 1;
    voters.push({ name, email, voterId });
    fs.writeFileSync(voterFile, JSON.stringify(voters, null, 2));
    console.log(`[${new Date().toLocaleTimeString()}] Vote casted by ${name} for ${candidate}`);
    res.json({ message: `Vote casted for ${candidate}` });
  } else {
    res.status(400).json({ message: 'Invalid candidate' });
  }
});

// Get vote results
app.get('/votes', (req, res) => {
  res.json(votes);
});

// Admin reset route
app.post('/reset', (req, res) => {
  for (let c in votes) {
    votes[c] = 0;
  }
  fs.writeFileSync(voterFile, JSON.stringify([]));
  res.json({ message: 'Votes reset' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
