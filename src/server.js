const express = require('express');
const { cosineSimilarity } = require('./lib');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log('Query string ', req.query);
  const textA = req.query.a;
  const textB = req.query.b;

  if (textA && textB) {
    const similarityScore = cosineSimilarity(textA, textB);

    return res.json({
      texts: [textA, textB],
      message: `Similarity value between both is ${similarityScore}`,
    });
  }
  res.json({
    message: 'Hello word',
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
