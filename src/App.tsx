import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import { Toaster } from "@/components/ui/toast";
import { SecretAdminGateway } from "./components/SecretAdminGateway";
import { CustomCursor } from "./components/CustomCursor";
import { AuroraBackground } from "./components/AuroraBackground";
import { ScrollProgress } from "./components/ScrollProgress";

function PublicShell() {
  const location = useLocation();
  return (
    <div className="public-app antialiased min-h-screen flex flex-col w-full">
      <AuroraBackground />
      <div className="aurora-noise" aria-hidden="true" />
      <ScrollProgress />
      <CustomCursor />
      <TopNavBar />
      <div key={location.pathname} className="page-enter relative z-10 flex flex-col grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="*"
          element={
            <PublicShell />
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
      <Toaster />
      <SecretAdminGateway />
    </Router>
  );
}

export default App;
