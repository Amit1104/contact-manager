import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginOnly from "./LoginOnly";
import AdminOnly from "./pages/admin/AdminOnly";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import Account from "./pages/user/Account";
import Contact from "./pages/user/Contact";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />

        <Route path="/user/contact" element={<LoginOnly element={<Contact />} />} />
        <Route path="/user/account" element={<LoginOnly element={<Account />} />} />

        <Route path="/admin/dashboard" element={<AdminOnly element={<Dashboard />} />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
