// src/components/ReferralsList.tsx
// import React from 'react';
// import useReferrals from '@/hooks/useReferrals';

// interface ReferralsListProps {
// 	telegramId: string;
// }

// const ReferralsList: React.FC<ReferralsListProps> = ({ telegramId }) => {
// 	const { referrals, loading, error } = useReferrals(telegramId);

// 	console.log('ReferralsList rendered');
// 	console.log('100 ЗДЕСЬ:', referrals);
// 	console.log('Telegram ID:', telegramId);

// 	if (error) {
// 		return <p>Error: {error}</p>;
// 	}

// 	if (referrals.length === 0) {
// 		return <p>No referrals found.</p>;
// 	}

// 	return (
// 		<div>
// 			{referrals.length > 0 ? (
// 				<ul>
// 					{referrals.map((referral) => (
// 						<li key={referral.id}>
// 							Invitee Username: {referral.invitee.username}
// 						</li>
// 					))}
// 				</ul>
// 			) : (
// 				<p>No referrals found.</p>
// 			)}
// 		</div>
// 	);
// };

// export default ReferralsList;


import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Invitee {
  username: string | null;
}

interface Referral {
  invitee: Invitee | null;
}

const ReferralsList: React.FC = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const telegramId = searchParams.get('telegramId');
        console.log('1000000 ЗДЕСЬ:', telegramId); // Для отладки

        if (!telegramId) {
          console.error('No telegramId provided in URL parameters.');
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/referrals?telegramId=${telegramId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data: Referral[] = await response.json();
        setReferrals(data);
      } catch (error) {
        console.error('Error fetching referrals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, [searchParams]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Referrals</h1>
      {referrals.length === 0 ? (
        <div>No referrals found.</div>
      ) : (
        <ul>
          {referrals.map((referral, index) => (
            <li key={index}>{referral.invitee?.username || 'Unknown user'}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReferralsList;
