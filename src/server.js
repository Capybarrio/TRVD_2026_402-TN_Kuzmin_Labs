const dns = require("dns");
const env = require("./config/env");
const { connectDatabase } = require("./config/database");
const { createApp } = require("./app");

async function startServer() {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);

    await connectDatabase({
      mongoUri: env.mongoUri,
      mongoUriDirect: env.mongoUriDirect,
    });
    const app = createApp();

    app.listen(env.port, (error) => {
      if (error) {
        console.log(`Error : ${error}`);
        return;
      }

      console.log(`Server is running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
