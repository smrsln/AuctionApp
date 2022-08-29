import Express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./Routes/auth.js";

const App = Express();
dotenv.config();

App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));
App.use(cors());

App.use("/", userRoutes);
const PORT = process.env.PORT || 5432;
// {mongoose options if unique check will not work
//     useCreateIndex: true,
//     autoIndex: true,
//   }
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    App.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
