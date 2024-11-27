// App.tsx
import React from 'react';
import Dashboard from './Dashboard.tsx';
import Loginpage from "./app_login.tsx";
import SignUp from "./app_signup.tsx"
import Realname from "./real_name.tsx"
import DashboardD from "./DashboardD.tsx"
import LandingPage from "@/LandingPage.tsx";
import OrderDetails from "@/customer_confirm.tsx";
import FoodOrders from "@/food_order.tsx";
import DeliveryDetails from "@/delivery_confirm.tsx";
import RatingPage from "@/rating.tsx";
import Blockchain from "./src_App.tsx";
import RankingPage from "./RankingPage.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App : React.FC = () => {
  return(
  <Router>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Loginpage />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/realname" element={<Realname />} />
    <Route path="/home" element={<Dashboard />} />
    <Route path="/Dhome" element={<DashboardD />} />
    <Route path="/order" element={<OrderDetails/>} />
    <Route path="/delivery" element={<DeliveryDetails/>} />
    <Route path="/myorders" element={<FoodOrders/>} />
    <Route path="/rating" element={<RatingPage/>} />
    <Route path="/blockchain" element={<Blockchain />} />
    <Route path="/ranking" element={<RankingPage />} />
  </Routes>
</Router>
  );

};

export default App;
