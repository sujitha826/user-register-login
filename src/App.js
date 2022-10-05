import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-bootstrap";

import Error from './pages/Error';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Registration from "./components/Registration";
import Dnd from "./components/Dnd";

function isLoggedIn() {
  let user = localStorage.getItem("login_user");
  console.log("is logged in -" + user);
  return user ? true : false;
}

const ProtectedRoute = ({ redirectPath, children }) => {
  let user = isLoggedIn();
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register-user" element={<Registration />} />

        <Route path="/dnd" element={
          <ProtectedRoute redirectPath="/">
            <Dnd />
          </ProtectedRoute>} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;