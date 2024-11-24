'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';
import ReferralsList from '@/components/shared/Referrals/ReferralsList';
import { CardSpecial } from '@/components/shared/InviteAFriend/CardSpecial';
import { Content, Title } from '@/components/shared/Kit';
import { Heading } from '@/components/shared/Heading';
import { Button, ButtonGroup } from '@/components/shared/Button';
import styles from './referrals.module.scss';

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
					<Image
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
				{/* <RefLink /> */}
				<CardSpecial
					title={t('friends.title')}
					description={t('friends.description')}
				/>
				<ReferralsList />
			</div>
		</Content>
	);
};

export default Referrals;
