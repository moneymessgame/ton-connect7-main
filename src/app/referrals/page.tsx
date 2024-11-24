'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';
import { useReferralsStore, Referral } from '@/stores/referrals';
import ReferralsList from '@/components/shared/Referrals/ReferralsList';
import { CardSpecial } from '@/components/shared/InviteAFriend/CardSpecial';
import { Content } from '@/components/shared/Kit';
import { Heading } from '@/components/shared/Heading';
import { Button, ButtonGroup } from '@/components/shared/Button';
import Loader from '@/components/shared/common/Loader';
import styles from './referrals.module.scss';

interface ReferralsProps {
  initialReferrals: Referral[] | null;
}

const Referrals: React.FC<ReferralsProps> = ({ initialReferrals }) => {
  const t = useTranslations();
  const { user, loading } = useUser();
  const [copied, setCopied] = useState(false);
  const inviteLink = `${process.env.NEXT_PUBLIC_TWA_URL}?startApp=${user?.telegramId}`;

  // Zustand store
  const { setReferrals, fetchReferrals } = useReferralsStore();

  // Установка предзагруженных данных
  useEffect(() => {
    if (initialReferrals) {
      setReferrals(initialReferrals);
    }
  }, [initialReferrals, setReferrals]);

  // Функция для копирования ссылки
  const copy = () => {
    if (copied) return;
    navigator.clipboard.writeText(inviteLink);
    toast.success(t('friends.copied'));
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  // Рефреш данных
  const handleRefresh = async () => {
    if (!user?.id) return;
    await fetchReferrals(user.id);
  };

  // Показываем загрузку, если пользователь еще не загрузился
	if (loading) {
		return <Loader />;
	}
	
  return (
    <Content>
      <Heading
        title={t('friends.title')}
        txt={t('friends.txt')}
        top={
          <img
            src="/gift.png"
            width={732}
            height={796}
            alt="Gift"
            className={styles.headingGift}
          />
        }
      />
      <ButtonGroup>
        <Button
          className={cn('container-style', styles.invite)}
          href={`https://t.me/share/url?url=${inviteLink}`}
        >
          {t('friends.list.invite_card')}
        </Button>
        <Button
          className={cn('container-style', styles.copy)}
          icon={copied ? 'ph:check' : 'ph:copy-simple'}
          type="secondary"
          onClick={copy}
        />
      </ButtonGroup>
      <div>
        <CardSpecial
          title={t('friends.title')}
          description={t('friends.description')}
        />
        {/* Передаем кнопку для обновления */}
        <ReferralsList onRefresh={handleRefresh} />
      </div>
    </Content>
  );
};

export default Referrals;
