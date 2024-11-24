import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { RotateCw } from 'lucide-react';

import { useUser } from '@/contexts/UserContext';
import { useReferralsStore } from '@/stores/referrals'; 
import { cn } from '@/lib/utils';
import { constructName } from '@/utils/utils';
import { Title } from '../Kit';
import styles from './referrals.module.scss';

interface ReferralsListProps {
	onRefresh?: () => Promise<void>;
}

const CardFriend = ({ title, photoUrl }: { title: string; photoUrl?: string | null }) => {
	return (
		<div className={cn('container-style', styles.special)}>
			<img src={photoUrl || '/images/avatar.png'} width={73} height={79} alt={title} />
			<div>
				<h3>{title}</h3>
				<span>
					<strong>+10000</strong>
				</span>
			</div>
		</div>
	);
};

const ReferralsList: React.FC<ReferralsListProps> = ({ onRefresh }) => {
	const { user } = useUser();
	const t = useTranslations();
	const [pending, setPending] = useState(false);

	// Zustand store
	const referrals = useReferralsStore((state) => state.referrals);
	const loading = useReferralsStore((state) => state.loading);
	const fetchReferrals = useReferralsStore((state) => state.fetchReferrals);

	// Загрузка данных при первом рендере, только если их нет
	useEffect(() => {
		if (user?.id && referrals?.length === 0) {
			fetchReferrals(user.id);
		}
	}, [user, referrals, fetchReferrals]);

	// Обновление данных вручную через пропс onRefresh
	const handleRefresh = async () => {
		if (pending || !onRefresh) return;
		setPending(true);
		try {
			await onRefresh();
		} finally {
			setPending(false);
		}
	};

	if (loading && referrals?.length === 0) {
		return <div className={styles.loading}>{t('friends.list.loading')}</div>;
	}

	if (!referrals || referrals.length === 0) {
		return (
			<div className={cn('container-style', styles.listNo)}>
				{t('friends.list.no')}
			</div>
		);
	}

	return (
		<div className={styles.list}>
			<div className={styles.listTop}>
				<Title className={styles.listTitle}>
					{t('friends.list.title')} <small>({referrals.length}):</small>
				</Title>
				<RotateCw
					className={pending ? styles.rotating : ''}
					onClick={handleRefresh}
				/>
			</div>
			{referrals.map((referral, index) => (
				<CardFriend
					key={index}
					title={constructName(
						referral.firstName,
						referral.lastName,
						referral.username
					)}
					photoUrl={referral.photoUrl}
				/>
			))}
		</div>
	);
};

export default ReferralsList;
