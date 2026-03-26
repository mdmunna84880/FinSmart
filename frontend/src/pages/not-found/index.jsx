import { Link } from 'react-router';
import { FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      
      {/* Warning sign */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-brand-100">
        <FiAlertCircle className="text-5xl text-brand-600" />
      </div>
      
      {/* Message */}
      <h1 className="mb-2 text-6xl font-extrabold text-slate-900 tracking-tight">404</h1>
      <h2 className="mb-4 text-2xl font-bold text-slate-800">Page Not Found</h2>
      <p className="mb-8 max-w-md text-slate-600">
        We can't seem to find the page you're looking for. It might have been removed, renamed, or didn't exist in the first place.
      </p>
      
      {/* Important Buttons  for moving back or going to home page*/}
      <div className="flex gap-4">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          <FiArrowLeft className="text-lg" />
          Go Back
        </button>
        <Link 
          to="/"
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 font-medium text-white transition-colors hover:bg-brand-600 shadow-sm"
        >
          Return Home
        </Link>
      </div>
      
    </div>
  );
}