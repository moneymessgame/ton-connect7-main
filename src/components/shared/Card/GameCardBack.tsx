'use client';

import Image from 'next/image';

import { GameCardFrontProps } from '@/types/game-card-front';

const GameCardFront: React.FC<GameCardFrontProps> = ({
	srcFront,
	srcFrontBg,
	srcBack,
	altFront,
	colorTo,
	colorFrom,
	name,
	firstname,
	lastname,
	characteristic,
	number,
}) => (
	<>
		<div className="w-[100%] h-[100%] absolute -z-50 bg-[#080d15] overflow-hidden" />

		<div className="absolute z-50 top-2 left-2 text-left">
			<div className="text-foreground text-3xl font-light text-left">
				# {number}
			</div>
		</div>

		<div className="absolute z-50 bottom-2 left-2 text-left">
			<div className="text-foreground text-2xl font-black text-left">
				{firstname}
			</div>
			<h2 className="text-foreground text-2xl font-black text-left">
				{lastname}
			</h2>
			<h3 className="text-foreground text-md font-light text-left max-w-[200px] pb-4">
				{altFront}
			</h3>
			<Image
				src="/game/qr-moneymess.jpg"
				alt="QR code"
				width={150}
				height={150}
				className="rounded-md"
			/>
		</div>
	</>
);

export default GameCardFront;
