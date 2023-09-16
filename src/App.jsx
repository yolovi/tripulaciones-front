import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Register from "./components/User/Register/Register";
import Login from "./components/User/Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
