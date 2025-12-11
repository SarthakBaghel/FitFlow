import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WorkoutGenerator from "./pages/WorkoutGenerator";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
    <>
      <Navbar />

        <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/workouts" element={<WorkoutGenerator />} />
          <Route path="/about" element={<About />} />
        </Route>


        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
        </Routes>

      <Footer />
    </>
  );
}

export default App;
