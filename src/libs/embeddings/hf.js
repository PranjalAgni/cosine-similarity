const { HfInference } = require("@huggingface/inference");

const hf = new HfInference(process.env.HF_API_KEY);

/**
 *
 * @param {string} text
 */
const fetchEmbeddings = async (text) => {
  try {
    const output = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text
    });
    return output;
  } catch (ex) {
    console.error("Error fetching embeddings huggingface", ex);
  }
};

module.exports = {
  fetchEmbeddings
};
