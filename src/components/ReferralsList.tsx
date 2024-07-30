// src/components/ReferralsList.tsx
import React from 'react';
import useReferrals from '@/hooks/useReferrals';

interface ReferralsListProps {
  telegramId: string;
}

const ReferralsList: React.FC<ReferralsListProps> = ({ telegramId }) => {
  const { referrals, loading, error } = useReferrals(telegramId);

  console.log('ReferralsList rendered');
  console.log('100 ЗДЕСЬ:', referrals);
  console.log('101 ЗДЕСЬ:', telegramId);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (referrals.length === 0) {
    return <p>No referrals found.</p>;
  }

  return (
    <div>
      <h2>Referrals List</h2>
      <ul>
        {referrals.map((referral) => (
          <li key={referral.id}>
            Invitee Username: {referral.invitee.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReferralsList;
