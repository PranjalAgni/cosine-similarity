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
  const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: text
  });

  return response;
};

module.exports = {
  getEmbeddings
};
