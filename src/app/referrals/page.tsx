'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import RefLink from '@/components/RefLink';
import ReferralsList from '@/components/ReferralsList';
import { useUser } from '@/contexts/UserContext';
import { CardSpecial } from '@/components/InviteAFriend/CardSpecial';
import { Content } from '@/components/Kit';
import { Heading } from '@/components/Heading';

import styles from './referrals.module.scss';

const Referrals: React.FC = () => {
	const t = useTranslations();
	const { user, loading } = useUser();

	if (loading) return <div>Loading...</div>;

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
			<div>
				<RefLink />
				<ReferralsList />
				<CardSpecial
					title={t('friends.title')}
					description={t('friends.description')}
				/>
			</div>
		</Content>
	);
};

export default Referrals;
