'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

import RefLink from '@/components/shared/Referrals/RefLink';
import ReferralsList from '@/components/shared/Referrals/ReferralsList';
import { useUser } from '@/contexts/UserContext';
import { CardSpecial } from '@/components/shared/InviteAFriend/CardSpecial';
import { Content, Title } from '@/components/shared/Kit';
import { Heading } from '@/components/shared/Heading';

import styles from './referrals.module.scss';
import { Button, ButtonGroup } from '@/components/shared/Button';
import { toast } from 'sonner';
import { Icon } from '@/components/shared/Icon';

const CardFriend = ({
	title,
	isPremium,
}: {
	title: string;
	isPremium: boolean;
}) => {
	return (
		<div className={styles.special}>
			<img src="/images/avatar.png" width={73} height={79} alt={title} />
			<div>
				<h3>{title}</h3>
				<span>
					<strong>+10000</strong>
				</span>
			</div>
		</div>
	);
};

const Referrals: React.FC = () => {
	const t = useTranslations();
	const { user, loading } = useUser();
	const [copied, setCopied] = useState(false);

	const inviteLink = `${process.env.NEXT_PUBLIC_TWA_URL}?startApp=${user?.telegramId}`;

	if (loading) return <div>Loading...</div>;

	const copy = () => {
		if (copied) return;
		navigator.clipboard.writeText(inviteLink);
		toast.success(t('friends.copied'));
		setCopied(true);
		setTimeout(() => setCopied(false), 4000);
	};

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
					className={styles.invite}
					href={`https://t.me/share/url?url=${inviteLink}`}
				>
					{t('friends.list.invite')}
				</Button>
				<Button
					className={styles.copy}
					icon={copied ? 'ph:check' : 'ph:copy-simple'}
					type="secondary"
					onClick={copy}
				/>
			</ButtonGroup>
			<div>
				{/* <RefLink /> */}
				<CardSpecial
					title={t('friends.title')}
					description={t('friends.description')}
				/>
				<ReferralsList />
			</div>
			{/* <div className={styles.list}>
        <div className={styles.listTop}>
          <Title className={styles.listTitle}>
            {t("list.title")} <small>({invited.length})</small>
          </Title>
          <Icon icon="ph:arrows-clockwise" className={pending ? styles.rotating : ''} onClick={handleRefresh} />
        </div>
        {invited.map((i, index) => (
          <CardFriend key={index} title={constructName(i.firstName, i.lastName, i.username)} isPremium={i.isPremium} />
        ))}
        {invited.length === 0 && <div className={styles.listNo}>{t("list.no")}</div>}
      </div> */}
		</Content>
	);
};

export default Referrals;
