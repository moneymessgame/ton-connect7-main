import React from 'react';

import Referrals from '@/app/referrals/page';
import { fetchReferralsData } from './referrals-data';

export default async function ReferralsServer() {
  const initialReferrals = await fetchReferralsData();

  return <Referrals initialReferrals={initialReferrals} />;
}
