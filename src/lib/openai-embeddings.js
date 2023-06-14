const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

/**
 *
 * @param {string} text
 */
const getEmbeddings = async (text) => {
  const embeddings = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: text
  });

  console.log(
    `Open AI embeddings for ${text} \n`,
    JSON.stringify(embeddings, null, 2)
  );

  return embeddings;
};

module.exports = {
  getEmbeddings
};
