import { Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Error from './pages/Error';
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";
import RegisterUser from "./pages/RegisterUser";
import { ToastContainer } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;