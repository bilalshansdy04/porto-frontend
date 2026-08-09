import { NavLink, Outlet } from "react-router-dom";

export function AdminLayout() {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md flex min-h-screen w-full">
      {/* SideNavBar */}
      <nav className="bg-surface-container-low dark:bg-surface-container-lowest text-primary dark:text-primary-fixed-dim font-body-md text-body-md h-screen w-64 fixed left-0 top-0 border-r border-outline-variant dark:border-outline flex flex-col p-base gap-base z-50">
        <div className="px-4 py-6">
          <h1 className="text-headline-md font-headline-md font-bold text-primary">Admin Panel</h1>
          <p className="text-secondary text-sm mt-1">System Overview</p>
        </div>
        <div className="flex-1 space-y-2 mt-4">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-primary dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed"
                  : "text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high dark:hover:bg-surface-container"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
                Dashboard
              </>
            )}
          </NavLink>
          
          <NavLink
            to="/admin/projects"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-primary dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed"
                  : "text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high dark:hover:bg-surface-container"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>work</span>
                Manage Projects
              </>
            )}
          </NavLink>
          
          <NavLink
            to="/admin/journey"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-primary dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed"
                  : "text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high dark:hover:bg-surface-container"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>history_edu</span>
                Professional Journey
              </>
            )}
          </NavLink>
          
          <a
            className="flex items-center gap-3 px-4 py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high dark:hover:bg-surface-container rounded-xl transition-all duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            Settings
          </a>
          
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high dark:hover:bg-surface-container rounded-xl transition-all duration-200 mt-auto"
          >
            <span className="material-symbols-outlined">logout</span>
            Back to Site
          </NavLink>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* TopAppBar */}
        <header className="bg-surface dark:bg-surface-container-highest text-primary dark:text-primary-fixed-dim font-headline-md text-headline-md w-full sticky top-0 z-40 border-b border-outline-variant dark:border-outline px-grid-margin py-base flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button className="p-2 text-primary hover:bg-surface-container-high rounded-full transition-colors duration-200">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <span className="text-headline-md font-headline-md font-bold text-primary">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Admin User</span>
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Canvas */}
        <Outlet />
      </div>
    </div>
  );
}
