import { useState, useEffect } from "react";
import { api } from "../../services/api";

export function AdminSettings() {
  const [showExperience, setShowExperience] = useState(true);
  const [language, setLanguage] = useState("id");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await api.getSettings();
        if (settings) {
          setShowExperience(settings.show_experience);
          setLanguage(settings.language);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateSettings({
        show_experience: showExperience,
        language: language,
      });
      alert("Settings saved successfully!");
    } catch (err) {
      console.error("Failed to save settings:", err);
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-grid-margin bg-surface dark:bg-surface-container-highest flex items-center justify-center">
        <p className="text-secondary">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-grid-margin bg-surface dark:bg-surface-container-highest">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-display-sm font-display-sm font-bold text-primary mb-2">
            Settings
          </h2>
          <p className="text-secondary">
            Manage your portfolio preferences and configurations.
          </p>
        </div>

        <div className="bg-surface-container-low dark:bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant dark:border-outline space-y-8">
          
          {/* Display Settings */}
          <section>
            <h3 className="text-title-lg font-title-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">visibility</span>
              Display Settings
            </h3>
            
            <div className="flex items-center justify-between p-4 bg-surface dark:bg-surface-container-highest rounded-xl border border-outline-variant dark:border-outline">
              <div>
                <h4 className="text-title-md font-title-md font-bold text-primary">Show Experience Section</h4>
                <p className="text-body-md text-secondary mt-1">
                  Toggle the visibility of your professional journey on the public portfolio.
                </p>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={showExperience}
                  onChange={(e) => setShowExperience(e.target.checked)}
                />
                <div className="w-14 h-7 bg-surface-container-highest dark:bg-surface-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-outline dark:after:bg-outline-variant peer-checked:after:bg-on-primary after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </section>

          <hr className="border-outline-variant dark:border-outline" />

          {/* Language Settings */}
          <section>
            <h3 className="text-title-lg font-title-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">language</span>
              Language Settings
            </h3>
            
            <div className="p-4 bg-surface dark:bg-surface-container-highest rounded-xl border border-outline-variant dark:border-outline">
              <p className="text-body-md text-secondary mb-4">
                Select the primary language for your portfolio.
              </p>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="language" 
                    value="id" 
                    checked={language === "id"}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-5 h-5 text-primary border-outline-variant focus:ring-primary dark:border-outline dark:bg-surface-container focus:ring-2"
                  />
                  <span className="text-body-lg text-primary group-hover:text-primary-fixed">Indonesian (ID)</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="language" 
                    value="en" 
                    checked={language === "en"}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-5 h-5 text-primary border-outline-variant focus:ring-primary dark:border-outline dark:bg-surface-container focus:ring-2"
                  />
                  <span className="text-body-lg text-primary group-hover:text-primary-fixed">English (EN)</span>
                </label>
              </div>
            </div>
          </section>

        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button className="px-6 py-2.5 rounded-full border border-outline text-primary hover:bg-surface-container-high font-medium transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-full bg-primary text-on-primary hover:bg-primary/90 font-medium transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
