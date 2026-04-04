import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import PublicNavbar from "./PublicNavbar";
import Security from "./Security";

// Assemble high-level sections for the marketing landing page
export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans selection:bg-brand-100 selection:text-brand-900">
      <PublicNavbar />
      <main className="flex-1 pt-16">
        <Hero />
        <Features />
        <Security />
      </main>
      <Footer />
    </div>
  );
}