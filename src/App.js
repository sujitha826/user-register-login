import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-bootstrap";

import Error from './pages/Error';
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import RegisterWithLogo from "./components/Register";
// import withLogoAndImage from "./components/HocLogo";

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
        <Route path="/register-user" element={<RegisterUser />} />

        <Route path="/dashboard" element={
          <ProtectedRoute redirectPath="/">
            <Dashboard />
          </ProtectedRoute>} />

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/products" element={<Product />} />
        <Route path="/hoc" element={<RegisterWithLogo />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;