import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/signup";
import Home from "./components/Home/home";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
