import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SecretAdminGateway() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const SECRET_PASSWORD = import.meta.env.VITE_SECRET_PASSWORD;

  // Listen for custom event to open dialog from 5 clicks
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("openSecretAdminDialog", handleOpen);
    return () =>
      window.removeEventListener("openSecretAdminDialog", handleOpen);
  }, []);

  // Global keyboard listener
  useEffect(() => {
    let typed = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside an input/textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      // Ensure we only process single character keys (ignore Shift, Ctrl, etc.)
      if (e.key.length === 1) {
        typed += e.key.toLowerCase();
        // Keep only the last N characters
        if (typed.length > SECRET_PASSWORD.length) {
          typed = typed.slice(typed.length - SECRET_PASSWORD.length);
        }

        if (typed === SECRET_PASSWORD) {
          typed = ""; // reset
          setIsOpen(false);
          navigate("/admin");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, SECRET_PASSWORD]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      setIsOpen(false);
      setPassword("");
      setError(false);
      navigate("/admin");
    } else {
      setError(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-surface border-outline-variant">
        <DialogHeader>
          <DialogTitle className="text-brand-navy">Akses Terlarang</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Kata sandi..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            className={error ? "border-red-500" : ""}
            autoFocus
          />
          {error && <p className="text-sm text-red-500">Kata sandi salah.</p>}
          <Button
            type="submit"
            className="w-full bg-brand-blue hover:bg-brand-blue/90"
          >
            Masuk
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
