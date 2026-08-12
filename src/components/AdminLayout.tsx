import { NavLink, Outlet } from "react-router-dom";
import { buttonVariants, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
              cn(
                "flex w-full items-center justify-start gap-3 rounded-lg px-4 py-6 text-base font-medium transition-colors",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-on-surface hover:bg-surface-container-highest"
              )
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
              cn(
                "flex w-full items-center justify-start gap-3 rounded-lg px-4 py-6 text-base font-medium transition-colors",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-on-surface hover:bg-surface-container-highest"
              )
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
              cn(
                "flex w-full items-center justify-start gap-3 rounded-lg px-4 py-6 text-base font-medium transition-colors",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-on-surface hover:bg-surface-container-highest"
              )
            }
          >
            {({ isActive }) => (
              <>
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>history_edu</span>
                Professional Journey
              </>
            )}
          </NavLink>
          
          <NavLink
            to="/admin/skills"
            className={({ isActive }) =>
              cn(
                "flex w-full items-center justify-start gap-3 rounded-lg px-4 py-6 text-base font-medium transition-colors",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-on-surface hover:bg-surface-container-highest"
              )
            }
          >
            {({ isActive }) => (
              <>
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>handyman</span>
                Manage Skills
              </>
            )}
          </NavLink>
          
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              cn(
                "flex w-full items-center justify-start gap-3 rounded-lg px-4 py-6 text-base font-medium transition-colors",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-on-surface hover:bg-surface-container-highest"
              )
            }
          >
            {({ isActive }) => (
              <>
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>settings</span>
                Settings
              </>
            )}
          </NavLink>
          
          <NavLink
            to="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start gap-3 px-4 py-6 text-base mt-auto text-secondary"
            )}
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
            <Button variant="ghost" size="icon" className="text-primary rounded-full">
              <span className="material-symbols-outlined">menu</span>
            </Button>
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
