import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { buttonVariants, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AdminLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <div className="bg-background text-on-background font-body-md text-body-md flex min-h-screen w-full relative">
      {/* Mobile Backdrop Overlay */}
      {mobileNavOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
          onClick={closeMobileNav}
          aria-hidden="true"
        />
      )}

      {/* SideNavBar (Responsive Drawer) */}
      <nav
        className={cn(
          "bg-surface-container-low dark:bg-surface-container-lowest text-primary dark:text-primary-fixed-dim font-body-md text-body-md h-screen w-64 fixed left-0 top-0 border-r border-outline-variant dark:border-outline flex flex-col p-base gap-base z-50 transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none",
          mobileNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-headline-md font-headline-md font-bold text-primary">Admin Panel</h1>
            <p className="text-secondary text-sm mt-1">System Overview</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeMobileNav}
            className="lg:hidden text-primary rounded-full"
            aria-label="Close navigation"
          >
            <span className="material-symbols-outlined">close</span>
          </Button>
        </div>
        <div className="flex-1 space-y-2 mt-4 overflow-y-auto">
          <NavLink
            to="/admin"
            end
            onClick={closeMobileNav}
            className={({ isActive }) =>
              cn(
                "flex w-full items-center justify-start gap-3 rounded-lg px-4 py-3.5 text-base font-medium transition-colors",
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
            onClick={closeMobileNav}
            className={({ isActive }) =>
              cn(
                "flex w-full items-center justify-start gap-3 rounded-lg px-4 py-3.5 text-base font-medium transition-colors",
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
            to="/admin/categories"
            onClick={closeMobileNav}
            className={({ isActive }) =>
              cn(
                "flex w-full items-center justify-start gap-3 rounded-lg px-4 py-3.5 text-base font-medium transition-colors",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-on-surface hover:bg-surface-container-highest"
              )
            }
          >
            {({ isActive }) => (
              <>
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>category</span>
                Manage Categories
              </>
            )}
          </NavLink>
          
          <NavLink
            to="/admin/journey"
            onClick={closeMobileNav}
            className={({ isActive }) =>
              cn(
                "flex w-full items-center justify-start gap-3 rounded-lg px-4 py-3.5 text-base font-medium transition-colors",
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
            onClick={closeMobileNav}
            className={({ isActive }) =>
              cn(
                "flex w-full items-center justify-start gap-3 rounded-lg px-4 py-3.5 text-base font-medium transition-colors",
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
            onClick={closeMobileNav}
            className={({ isActive }) =>
              cn(
                "flex w-full items-center justify-start gap-3 rounded-lg px-4 py-3.5 text-base font-medium transition-colors",
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
            onClick={closeMobileNav}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start gap-3 px-4 py-3.5 text-base mt-auto text-secondary"
            )}
          >
            <span className="material-symbols-outlined">logout</span>
            Back to Site
          </NavLink>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 ml-0 lg:ml-64 flex flex-col min-w-0 overflow-x-hidden">
        {/* TopAppBar */}
        <header className="bg-surface dark:bg-surface-container-highest text-primary dark:text-primary-fixed-dim font-headline-md text-headline-md w-full sticky top-0 z-30 border-b border-outline-variant dark:border-outline px-4 sm:px-6 md:px-grid-margin py-base flex items-center justify-between h-16">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileNavOpen((v) => !v)}
              className="lg:hidden text-primary rounded-full"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </Button>
            <span className="text-lg sm:text-xl md:text-headline-md font-bold text-primary truncate">
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm font-medium hidden sm:inline-block">Admin User</span>
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs sm:text-sm">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Canvas */}
        <div className="w-full flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
