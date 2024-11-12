// src/components/ReferralsList.tsx
import React, { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';

import styles from './referrals.module.scss';
import { useTranslations } from 'next-intl';
import { Title } from '../Kit';
import { Icon } from '@/components/shared/Icon';
import { constructName } from '@/utils/utils';

interface Invitee {
	username: string | null;
}

interface Referral {
	invitee: Invitee | null;
	firstName: string | null;
	lastName: string | null;
	username: string | null;
}

const CardFriend = ({ title }: { title: string }) => {
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

const ReferralsList: React.FC = () => {
	const { user } = useUser();
	const [referrals, setReferrals] = useState<Referral[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const t = useTranslations();
	const [pending, setPending] = useState(false);

	const handleRefresh = async () => {
		if (pending) return;
		setPending(true);
		await fetch('/api/refresh');
		setPending(false);
	};

	useEffect(() => {
		const fetchReferrals = async () => {
			if (!user?.id) {
				console.error('No userId found in context.');
				setLoading(false);
				return;
			}

			try {
				// console.log('Fetching referrals for userId:', user.id);
				const response = await fetch(`/api/invitation?userId=${user.id}`);
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
	}, [user]);

	// if (loading) return <div>Loading...</div>;

	return (
		// Старый вариант:
		// <div>
		// 	<h1>Referrals</h1>
		// 	{referrals.length === 0 ? (
		// 		<div>No referrals found.</div>
		// 	) : (
		// 		<ul>
		// 			{referrals.map((referral, index) => (
		// 				<li key={index}>{referral.invitee?.username || 'Unknown user'}</li>
		// 			))}
		// 		</ul>
		// 	)}
		// </div>
		<div className={styles.list}>
			<div className={styles.listTop}>
				<Title className={styles.listTitle}>
					{t('friends.list.title')} <small>({referrals.length})</small>
				</Title>
				<Icon
					icon="ph:arrows-clockwise"
					className={pending ? styles.rotating : ''}
					onClick={handleRefresh}
				/>
			</div>
			{referrals.map((i, index) => (
				<CardFriend
					key={index}
					title={constructName(i.firstName, i.lastName, i.username)}
				/>
			))}
			{referrals.length === 0 && (
				<div className={styles.listNo}>{t('list.no')}</div>
			)}
		</div>
	);
};

export default ReferralsList;
