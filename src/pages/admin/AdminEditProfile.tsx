import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export function AdminEditProfile() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api.getDashboardStats()
      .then(data => {
        if (data) {
          setSummary(data.summary || "");
          setYearsOfExperience(data.years_of_experience || 0);
        }
      })
      .catch(err => console.error("Failed to fetch profile stats", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = { summary, years_of_experience: yearsOfExperience };

    try {
      try {
        await api.updateProfile(payload);
      } catch (err: any) {
        // If profile doesn't exist yet, the API might return a 404 error
        if (err.message.includes("404")) {
          await api.createProfile(payload);
        } else {
          throw err;
        }
      }
      navigate("/admin");
    } catch (err) {
      console.error("Failed to save profile", err);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-secondary">Loading profile data...</div>;
  }

  return (
    <div className="flex-1 p-8 max-w-3xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin" className="text-secondary hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h2 className="font-headline-md text-headline-md text-primary">
            Edit Profile
          </h2>
          <p className="text-secondary mt-1">
            Update your professional summary and experience.
          </p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <div className="flex justify-between items-end mb-2">
              <div>
                <label className="block font-label-code text-label-code text-secondary mb-1" htmlFor="summary">
                  Professional Summary
                </label>
                <p className="text-sm text-secondary">A short bio that appears on the hero section of your portfolio.</p>
              </div>
              <span className={`text-sm ${summary.length >= 200 ? 'text-error' : 'text-secondary'}`}>
                {summary.length}/200
              </span>
            </div>
            <textarea
              id="summary"
              rows={4}
              maxLength={200}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-primary focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all resize-y"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="e.g. I am a Full-Stack Developer specializing in..."
            />
          </div>

          <div>
            <label className="block font-label-code text-label-code text-secondary mb-2" htmlFor="yoe">
              Years of Experience
            </label>
            <input
              id="yoe"
              type="number"
              min="0"
              className="w-full md:w-1/3 bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-primary focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="pt-6 border-t border-outline-variant flex justify-end gap-4">
            <Link
              to="/admin"
              className="px-6 py-2.5 rounded-lg font-label-code text-secondary hover:bg-surface-container transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-brand-navy text-white px-6 py-2.5 rounded-lg font-label-code flex items-center gap-2 transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
