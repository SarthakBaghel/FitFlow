import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WorkoutGenerator from "./pages/WorkoutGenerator";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MyPlans from "./pages/MyPlans";
import PlanDetail from "./pages/PlanDetail";
import WorkoutSession from "./pages/WorkoutSession";

function App() {
  const location = useLocation();

  // Hide navbar/footer on home page
const hideLayout = ["/", "/login", "/signup"].includes(location.pathname);


  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/workouts" element={<WorkoutGenerator />} />
          <Route path="/about" element={<About />} />
          <Route path="/myplans" element={<MyPlans />} />
          <Route path="/plans/:id" element={<PlanDetail />} />
          <Route path="/workout-session" element={<WorkoutSession />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
