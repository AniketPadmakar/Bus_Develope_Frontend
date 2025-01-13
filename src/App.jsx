import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AdminSignin from './pages/admin/SigninSignup/Signin';
import AdminSignup from './pages/admin/SigninSignup/Signup';
import AdminDashboard from './pages/admin/Dashboard';
import AddBus from './pages/admin/AddBus';
import AdminViewBuses from './pages/admin/ViewBuses';
import UserSignin from './pages/user/SigninSignup/Signin';
import UserSignup from './pages/user/SigninSignup/Signup';
// import About from "./routes/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-signin" element={<AdminSignin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/admin-dash" element={<AdminDashboard />} />
        <Route path="/add-bus" element={<AddBus />} />
        <Route path="/admin-view-buses" element={<AdminViewBuses />} />
        <Route path="/user-signin" element={<UserSignin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
