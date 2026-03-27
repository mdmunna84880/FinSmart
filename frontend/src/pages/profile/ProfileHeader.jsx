/** @format */

import { cn } from "@/utils/cn";
import { FiMapPin, FiCheckCircle } from "react-icons/fi";

export default function ProfileHeader({ user }) {
  if (!user) return null;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        {/* User Profile*/}
        <div className="h-24 w-24 shrink-0 mx-auto sm:mx-0 overflow-hidden rounded-full ring-4 ring-slate-50">
          <img
            src={user.userAvatar}
            alt={`${user.userFullName}'s avatar`}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Identity & Address Details */}
        <div className="flex-1 space-y-6 text-center sm:text-left">
          <div>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
              <h2 className="text-2xl font-bold text-slate-900">
                {user.userFullName}
              </h2>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5",
                  "py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
                )}
              >
                <FiCheckCircle size={14} /> KYC Verified
              </span>
            </div>
            <p className="mt-1 text-slate-500">
              {user.userEmailAddress} <span className="inline-block h-1 w-1 mx-1 bg-slate-500 rounded-full mb-0.5"></span> {user.userPhone}
            </p>
          </div>

          <div
            className={cn(
              "inline-flex flex-col items-center gap-2 rounded-xl bg-slate-50 p-4 text-sm",
              "text-slate-600 ring-1 ring-inset ring-slate-200 sm:items-start text-left",
            )}
          >
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <FiMapPin className="text-slate-400" />
              Registered Address
            </div>
            <p className="text-center sm:text-left">
              {user.address?.street}, {user.address?.city}
              <br />
              {user.address?.state} - {user.address?.zipCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
