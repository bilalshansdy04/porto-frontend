export function AdminManageProjects() {
  return (
    <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Projects Table Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary">
              Current Projects
            </h2>
            <p className="text-secondary mt-1">
              Manage and update your portfolio items.
            </p>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden interactive-hover">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase">
                  Project Name
                </th>
                <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase">
                  Status
                </th>
                <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase">
                  Date Modified
                </th>
                <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              <tr className="hover:bg-surface transition-colors">
                <td className="px-6 py-4 font-body-md text-primary">
                  Quantum Computing Interface
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-code text-label-code text-xs">
                    Live
                  </span>
                </td>
                <td className="px-6 py-4 font-label-code text-label-code text-secondary">
                  2024-10-15
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-secondary hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      edit
                    </span>
                  </button>
                  <button className="text-error hover:text-on-error-container transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      delete
                    </span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-surface transition-colors">
                <td className="px-6 py-4 font-body-md text-primary">
                  Neural Network Visualizer
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-code text-label-code text-xs">
                    Draft
                  </span>
                </td>
                <td className="px-6 py-4 font-label-code text-label-code text-secondary">
                  2024-10-10
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-secondary hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      edit
                    </span>
                  </button>
                  <button className="text-error hover:text-on-error-container transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      delete
                    </span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-surface transition-colors">
                <td className="px-6 py-4 font-body-md text-primary">
                  Legacy System Refactor
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-code text-label-code text-xs">
                    Live
                  </span>
                </td>
                <td className="px-6 py-4 font-label-code text-label-code text-secondary">
                  2024-09-28
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-secondary hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      edit
                    </span>
                  </button>
                  <button className="text-error hover:text-on-error-container transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      delete
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Add/Edit Form Section */}
      <div className="lg:col-span-1">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 sticky top-24 interactive-hover">
          <h3 className="font-headline-md text-headline-md text-primary mb-6">
            Add New Project
          </h3>
          <form className="space-y-5">
            <div>
              <label
                className="block font-label-code text-label-code text-secondary mb-2"
                htmlFor="projectName"
              >
                Project Name
              </label>
              <input
                className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md text-primary focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"
                id="projectName"
                placeholder="e.g. Distributed Database"
                type="text"
              />
            </div>
            <div>
              <label
                className="block font-label-code text-label-code text-secondary mb-2"
                htmlFor="projectDesc"
              >
                Description
              </label>
              <textarea
                className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md text-primary focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all resize-none"
                id="projectDesc"
                placeholder="Technical details..."
                rows={4}
              ></textarea>
            </div>
            <div>
              <label className="block font-label-code text-label-code text-secondary mb-2">
                Upload Image
              </label>
              <div className="border-2 border-dashed border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center bg-surface hover:bg-surface-container-low transition-colors cursor-pointer">
                <span
                  className="material-symbols-outlined text-secondary mb-2"
                  style={{ fontSize: "32px" }}
                >
                  cloud_upload
                </span>
                <span className="font-body-md text-sm text-secondary">
                  Click to upload or drag and drop
                </span>
                <span className="font-label-caps text-xs text-outline mt-1">
                  SVG, PNG, JPG (MAX. 2MB)
                </span>
              </div>
            </div>
            <div className="pt-4">
              <button
                className="w-full bg-[#1e293b] text-white font-body-md font-semibold py-3 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                type="button"
              >
                <span className="material-symbols-outlined">add</span>
                Add Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
