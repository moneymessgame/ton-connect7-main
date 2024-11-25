import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import Loader from '@/components/shared/common/Loader';
import { useUser } from '@/contexts/UserContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const RefLink: React.FC = () => {
	const { user, loading } = useUser();
	const inputRef = useRef<HTMLInputElement>(null);

	const { toast } = useToast();

	if (loading) {
		return <Loader />;
	}

	if (!user) {
		return <p>No user was found</p>;
	}

	const referralLink = `https://t.me/mysuperpupermegabot/view?startApp=${user?.telegramId}`;
	// const referralLink = `https://t.me/mysuperpupermegabot/view?startApp=clzfi1xra0000iteva28kghds`;

	const copyToClipboard = () => {
		if (inputRef.current) {
			inputRef.current.select();
			document.execCommand('copy');
		}

		toast({
			description: 'Refferal link copied to clipboard',
			duration: 500,
		});
	};

	return (
		<div>
			<p className="mb-3 mt-3">My referral link</p>
			<div className="flex gap-3">
				<Input ref={inputRef} type="text" value={referralLink} readOnly />
				<Button onClick={copyToClipboard}>
					<Image
						src="/copy-icon.png"
						alt="Copy Icon"
						width={37}
						height={30}
					/>
				</Button>
			</div>
		</div>
	);
};

export default RefLink;
