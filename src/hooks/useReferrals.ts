// src/hooks/useReferrals.tsx
import { useState, useEffect } from 'react';

interface Invitee {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
}

interface Referral {
  id: string;
  inviterId: string;
  inviteeId: string;
  createdAt: string;
  updatedAt: string;
  inviter: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
  invitee: Invitee;
}

const useReferrals = (telegramId: string) => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferrals = async () => {
      console.log('10 ЗДЕСЬ:', telegramId);

      try {
        const response = await fetch(`/api/referrals?telegramId=${telegramId}`);
        console.log('20 ЗДЕСЬ:', response);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: Referral[] = await response.json();
        console.log('30 ЗДЕСЬ:', data);

        setReferrals(data);
      } catch (error: unknown) {
        console.error('Ошибка при запросе данных:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    if (telegramId) {
      fetchReferrals();
    }
  }, [telegramId]);

  return { referrals, loading, error };
};

export default useReferrals;
