import Express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const App = Express();
dotenv.config();

App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));
App.use(cors());

const PORT = process.env.PORT || 5432;
// {mongoose options if unique check will not work
//     useCreateIndex: true,
//     autoIndex: true,
//   }
mongoose.connect(process.env.CONNECTION_URL).then(() => {
  App.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
