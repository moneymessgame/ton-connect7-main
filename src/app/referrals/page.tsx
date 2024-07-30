// src/app/referrals/page.tsx
'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import RefLink from '@/components/RefLink';
import ReferralsList from '@/components/ReferralsList';

const Referrals: React.FC = () => {
  const searchParams = useSearchParams();
  const telegramId = searchParams.get('telegramId') || ''; // Получаем telegramId из URL параметров

  return (
    <div>
      <RefLink />
      <ReferralsList telegramId={telegramId} /> {/* Передаем telegramId */}
    </div>
  );
};

export default Referrals;
