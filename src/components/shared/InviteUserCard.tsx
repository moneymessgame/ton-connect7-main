import React from 'react';

import RewardText from '@/components/ui2/RewardText';

import Button from '../ui2/Button';
import Card from '../ui2/Card';
import Coin from '../ui2/Coin';

const InviteFriends: React.FC = () => {
	return (
		<Card gradient="orange">
			<div className="flex w-full flex-col items-center gap-2 p-2 text-white">
				<div className="relative flex w-full items-center gap-2">
					<span className="shrink-0 text-4xl font-bold">1</span>
					<span className="grow text-lg">Отправить ссылку</span>
				</div>
				<RewardText value="+ 300" label="F" type="white" gradient="orange" />
				<div className="my-2 w-full border-t border-white opacity-20" />
				<div className="relative flex w-full items-center gap-2">
					<span className="shrink-0 text-4xl font-bold">2</span>
					<span className="grow text-lg">Подруга присоединилась</span>
				</div>
				<RewardText value="+ 300" label="F" type="white" gradient="orange" />
				<Button type="orange" subtype="white" className="w-full">
					ПРИГЛАСИТЬ ПОЛЬЗОВАТЕЛЯ
				</Button>
				<Button type="orange" subtype="light" className="w-full">
					СКОПИРОВАТЬ ССЫЛКУ
				</Button>
			</div>
		</Card>
	);
};

export default InviteFriends;
