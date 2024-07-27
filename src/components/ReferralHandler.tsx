'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import RefLink from '@/components/RefLink';
import { useUser } from '@/contexts/UserContext';

const ReferralHandler: React.FC = () => {
  const searchParams = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    const registerReferral = async () => {
      const inviterId = searchParams.get('start');
      if (inviterId && user) {
        try {
          const response = await axios.post('/api/invitation', {
            inviterId,
            inviteeId: user.telegramId.toString(),
          });

          console.log('Invitation created:', response.data);
        } catch (error) {
          console.error('Failed to create invitation:', error);
        }
      }
    };

    if (searchParams.has('start')) {
      registerReferral();
    }
  }, [searchParams, user]);

  return <div>Handling referral...</div>;
};

const Referrals: React.FC = () => {
  return (
    <div>
      <RefLink />
      <ReferralHandler />
    </div>
  );
};

export default Referrals;
