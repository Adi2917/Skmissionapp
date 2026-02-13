import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import StudentChoice from "./Pages/StudentChoice";
import StudentRegister from "./Pages/StudentRegister";
import StudentLogin from "./Pages/StudentLogin";
import StudentDashboard from "./Pages/StudentDashboard";
import StudentProfile from "./Pages/StudentProfile";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminStudentDashboard from "./Pages/AdminStudentDashboard";
import AdminStudentClass from "./Pages/AdminStudentClass";
import StudentFees from "./Pages/StudentFees";
import AdminStudentFees from "./Pages/AdminStudentFees";
import StudentNotification from "./Pages/StudentNotification";
import AdminStudentNotification from "./Pages/AdminStudentNotification";

import MainLayout from "./Layout/MainLayout";

function App() {
  return (
    <Routes>
      {/* Home page – NO header */}
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />

      {/* App pages – WITH header */}
      {/*<Route element={<MainLayout />}> */}

        <Route path="/StudentChoice" element={<StudentChoice />} />
        <Route path="/StudentRegister" element={<StudentRegister />} />
        <Route path="/StudentLogin" element={<StudentLogin />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />

        <Route path="/StudentProfile/:id" element={<StudentProfile />} />

        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        <Route path="/AdminStudentClass/:className" element={<AdminStudentClass />} />
        <Route path="/AdminStudentDashboard/:id" element={<AdminStudentDashboard />} />
        <Route path="/AdminStudentFees/:id" element={<AdminStudentFees />} />
        <Route path="/StudentFees/:id" element={<StudentFees />} />

        {/* 🔥 FIXED NOTIFICATION ROUTES */}
        <Route 
          path="/StudentNotification/:id" 
          element={<StudentNotification />} 
        />

        <Route 
          path="/AdminStudentNotification" 
          element={<AdminStudentNotification />} 
        />

      {/*</Route> */}
    </Routes>
  );
}

export default App;
