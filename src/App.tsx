import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TopNavBar } from "./components/TopNavBar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { ProjectDetail } from "./pages/ProjectDetail";
import { AdminLayout } from "./components/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminManageProjects } from "./pages/admin/AdminManageProjects";
import { AdminProfessionalJourney } from "./pages/admin/AdminProfessionalJourney";

import { AdminEditProject } from "./pages/admin/AdminEditProject";
import { AdminManageSkills } from "./pages/admin/AdminManageSkills";
import { AdminEditProfile } from "./pages/admin/AdminEditProfile";
import { AdminSettings } from "./pages/admin/AdminSettings";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="*"
          element={
            <div className="antialiased min-h-screen flex flex-col w-full">
              <TopNavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
              </Routes>
              <Footer />
            </div>
          }
        />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="profile/edit" element={<AdminEditProfile />} />
          <Route path="projects" element={<AdminManageProjects />} />
          <Route path="projects/:id/edit" element={<AdminEditProject />} />
          <Route path="skills" element={<AdminManageSkills />} />
          <Route path="journey" element={<AdminProfessionalJourney />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
