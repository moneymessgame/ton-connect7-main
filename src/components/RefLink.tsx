'use client';

import React from 'react';
import { useUser } from '@/contexts/UserContext';

const RefLink: React.FC = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (!user) {
    return <p>Пользователь не найден</p>;
  }

  const referralLink = `https://t.me/mysuperpupermegabot/view/start?startapp=userId${user.telegramId}`;

  return (
    <a href={referralLink} target="_blank" rel="noopener noreferrer">
      Ваша реферальная ссылка: {referralLink}
    </a>
  );
};

export default RefLink;
