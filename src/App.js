import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Homepage";
import AuthProvider from "./login/AuthProvider";
import Login from "./login/Login";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
