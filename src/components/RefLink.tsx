'use client';

import React, { useRef } from 'react';

import { useUser } from '@/contexts/UserContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const RefLink: React.FC = () => {
	const { user, loading } = useUser();
	const inputRef = useRef<HTMLInputElement>(null);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (!user) {
		return <p>No user was found</p>;
	}

	const referralLink = `https://t.me/mysuperpupermegabot/view/start?startapp=userId${user.telegramId}`;

	const copyToClipboard = () => {
		if (inputRef.current) {
			inputRef.current.select();
			document.execCommand('copy');
		}
	};
	// const { toast } = useToast();

	return (
		<div>
			<p className="mb-3 mt-3">My referral link</p>
			<div className="flex gap-3">
				<Input ref={inputRef} type="text" value={referralLink} readOnly />
				<Button
					onClick={() => {
						copyToClipboard();
						// toast({
						// 	title: 'Done!',
						// });
					}}
				>
					<img
						src="/copy-icon.png"
						alt="Copy Icon"
						style={{ width: '37px', height: '30px' }}
					/>
				</Button>
			</div>
		</div>
	);
};

export default RefLink;