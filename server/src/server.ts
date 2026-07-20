import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB, disconnectDB } from "./config/db";


const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



process.on(
  "SIGINT",
  async () => {

    console.log(
      "Shutting down server..."
    );

    await disconnectDB();

    process.exit(0);

  }
);