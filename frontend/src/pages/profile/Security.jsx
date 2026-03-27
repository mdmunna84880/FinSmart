/** @format */

import { cn } from "@/utils/cn";
import { useState } from "react";
import { FiShield } from "react-icons/fi";
import { toast } from "react-toastify";

export default function Security() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Hold up! Your new passwords do not match.");
      return;
    }
    console.log("Password Update Payload:", passwords);
    toast.success("Success! Your password has been securely updated.");
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const inputStyles = cn(
    "mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm",
    "text-slate-900 transition-all duration-200 placeholder:text-slate-400",
    "focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10",
  );

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
      <div className="mb-8 flex items-center gap-4 border-b border-slate-100 pb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-600 ring-1 ring-slate-200">
          <FiShield size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Security</h2>
          <p className="text-sm text-slate-500">
            Update your account password.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-md space-y-5">
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-semibold text-slate-700"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
            required
            className={inputStyles}
          />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-semibold text-slate-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            required
            className={inputStyles}
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-semibold text-slate-700"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            required
            className={inputStyles}
          />
        </div>

        {/* Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-900/20 sm:w-auto"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
