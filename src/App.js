import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatRoom from "./chatApp";
import Homepage from "./Homepage";
import AuthProvider from "./login/AuthProvider";
import Login from "./login/Login";
import TodoPage from "./todolist/Index";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route path="/" element={<ChatRoom />} />
          <Route path="/todo" element={<TodoPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
