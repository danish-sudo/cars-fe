import { Routes, Route } from "react-router-dom";
import { RoleGuard } from "../guards/RoleGuard";
import Dashboard from "../layouts/dashboard/Dashboard";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import CarsList from "../pages/cars/CarsList";
import CarsConfig from "../pages/cars/CarsConfig";
import Home from "../pages/home/Home";
import CatsList from "../pages/categories/CatsList";
import CatsConfig from "../pages/categories/CatsConfig";

export default function Router() {
  return (
    <Routes>
      <Route>
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />
      </Route>
      <Route element={<RoleGuard />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="cars">
            <Route path="list" element={<CarsList />} />
            <Route path="add" element={<CarsConfig />} />
          </Route>
          <Route path="categories">
            <Route path="list" element={<CatsList />} />
            <Route path="add" element={<CatsConfig />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
