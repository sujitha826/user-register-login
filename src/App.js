import { Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from './pages/Error';
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";
import RegisterUser from "./pages/RegisterUser";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import { ToastContainer } from "react-bootstrap";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        <Route path="/hoc" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;