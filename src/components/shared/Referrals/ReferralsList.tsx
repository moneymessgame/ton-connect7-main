import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useUser } from '@/contexts/UserContext';

import { Title } from '../Kit';
import { Icon } from '@/components/shared/Icon';
import { constructName } from '@/utils/utils';
import { useReferralsStore } from '@/stores/referrals'; // Подключаем zustand store
import styles from './referrals.module.scss';
import { cn } from '@/lib/utils';

const CardFriend = ({ title }: { title: string }) => {
	return (
		<div className={cn('container-style', styles.special)}>
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

	// Обновление данных вручную
	const handleRefresh = async () => {
		if (pending || !user?.id) return;
		setPending(true);
		try {
			await fetchReferrals(user.id);
		} finally {
			setPending(false);
		}
	};

	// Проверка состояния
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
					{t('friends.list.title')} <small>({referrals.length})</small>
				</Title>
				<Icon
					icon="ph:arrows-clockwise"
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
				/>
			))}
		</div>
	);
};

export default ReferralsList;
