import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface Referral {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
}

const RefLink: React.FC = () => {
  const { user, loading } = useUser();
  const inputRef = useRef<HTMLInputElement>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referralsLoading, setReferralsLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      if (user) {
        try {
          const response = await axios.get(`/api/referrals/${user.telegramId}`);
          setReferrals(response.data);
        } catch (error) {
          console.error('Failed to fetch referrals:', error);
        } finally {
          setReferralsLoading(false);
        }
      }
    };

    fetchReferrals();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user was found</p>;
  }

  const referralLink = `https://t.me/mysuperpupermegabot/view/start?start=${user.telegramId}`;

  const copyToClipboard = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy');
    }
  };

  return (
    <div>
      <p className="mb-3 mt-3">My referral link</p>
      <div className="flex gap-3">
        <Input ref={inputRef} type="text" value={referralLink} readOnly />
        <Button onClick={copyToClipboard}>
          <img
            src="/copy-icon.png"
            alt="Copy Icon"
            style={{ width: '37px', height: '30px' }}
          />
        </Button>
      </div>
      <h2 className="mt-4">Referral List:</h2>
      {referralsLoading ? (
        <p>Loading referrals...</p>
      ) : (
        <ul>
          {referrals.length === 0 ? (
            <p>No referrals found.</p>
          ) : (
            referrals.map((referral) => (
              <li key={referral.id}>
                {referral.firstName} {referral.lastName} (@{referral.username})
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default RefLink;
