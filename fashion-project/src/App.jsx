import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './Home'
import Men from './Men'
import Women from './Women'
import Acc from './Acc'
import Navbar from './Navbar'
import Login from './Login'
import Signup from './Signup'
import AdminLogin from './adminlogin'
import AdminPage from './adminpage'
import Detailed from './Detailed'
import Payment from './Payment'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/detailed/:id" element={<Detailed />} />
        <Route path="/payment" element={<Payment />} />
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="men" element={<Men />} />
          <Route path="women" element={<Women />} />
          <Route path="accessories" element={<Acc />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

