require("dotenv").config();
const server = require("./server");

const main = () => {
  const app = server.initServer();

  app.listen(process.env.PORT, () => {
    console.log(`Server running 🚀 on http://localhost:${process.env.PORT}`);
  });
};

main();
