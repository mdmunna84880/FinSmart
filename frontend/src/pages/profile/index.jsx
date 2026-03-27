import { authenticatedUserProfile } from '@/data/mockData';
import ProfileHeader from './ProfileHeader';
import FinancialInfo from './FinancialInfo';
import Security from './Security';

export default function Profile() {
  return (
    <div className="mx-auto max-w-4xl pb-12 font-sans">
      {/* Page Heading*/}
      <div className="mb-8 px-4 sm:px-0">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Profile Settings
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          View your personal details, financial KYC, and security settings.
        </p>
      </div>
      <div className="flex flex-col gap-6 px-4 sm:px-0">
        <ProfileHeader user={authenticatedUserProfile} />
        <FinancialInfo user={authenticatedUserProfile} />
        <Security />
      </div>

    </div>
  );
}