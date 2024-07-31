// src/app/referrals/page.tsx
'use client';

import React from 'react';
import RefLink from '@/components/RefLink';
import ReferralsList from '@/components/ReferralsList';
import { useUser } from '@/contexts/UserContext';

const Referrals: React.FC = () => {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <RefLink />
      <ReferralsList />
    </div>
  );
};

export default Referrals;
