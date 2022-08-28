import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/signup";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
