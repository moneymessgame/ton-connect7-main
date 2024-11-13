'use client';

import Image from 'next/image';
import { ThumbsUp, Crown, Heart, Banknote } from 'lucide-react';
import { GameCardFrontProps } from '@/types/game-card-front';

const GameCardFront: React.FC<GameCardFrontProps> = ({
	srcFront,
	srcFrontBg,
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
		<div
			style={{
				background: `linear-gradient(to top, #080808, #0B0B0B, #131313, #080808)`,
			}}
			className="w-[100%] h-[100%] absolute -z-50"
		/>

		<Image
			src={srcFrontBg}
			alt="Library"
			width={390}
			height={390}
			quality={80}
			className="absolute z-20 object-cover w-[390px] h-[390px] bottom-0 object-center blur-[1px]"
		/>

		<div
			className={`absolute  w-[100%] h-[100%] z-30 bg-gradient-to-b to-4% top-0 ${
				characteristic === 'dominion'
					? 'from-[#4d4d06]'
					: characteristic === 'popularity'
					? 'from-[#032f30]'
					: characteristic === 'richness'
					? 'from-[#034403]'
					: characteristic === 'attractiveness'
					? 'from-[#440505]'
					: 'from-[#080936]'
			}`}
		/>

		<Image
			src={srcFront}
			alt={altFront}
			width={329}
			height={390}
			quality={80}
			className="absolute z-40 object-cover w-[329px] h-[390px] bottom-0 object-center overflow-hidden"
		/>

		<div
			className={`absolute  w-[100%] h-[100%] z-40 bg-gradient-to-t to-25% bottom-0 ${
				characteristic === 'dominion'
					? 'from-[#4d4d06]'
					: characteristic === 'popularity'
					? 'from-[#032f30]'
					: characteristic === 'richness'
					? 'from-[#034403]'
					: characteristic === 'attractiveness'
					? 'from-[#440505]'
					: 'from-[#080936]'
			}`}
		/>

		<div className="absolute z-50 top-2 right-2 text-right">
			{characteristic === 'dominion' ? (
				<Crown className="text-[#ffff0f]" strokeWidth={1} size={40} />
			) : characteristic === 'popularity' ? (
				<ThumbsUp className="text-[#0ffcff]" strokeWidth={1} size={40} />
			) : characteristic === 'richness' ? (
				<Banknote className="text-[#0fff0f]" strokeWidth={1} size={40} />
			) : characteristic === 'attractiveness' ? (
				<Heart className="text-[#ff0f0f]" strokeWidth={1} size={40} />
			) : null}
		</div>

		<div className="absolute z-50 top-2 left-2 text-left">
			<div className="text-foreground text-4xl font-light text-left">
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
			<h3 className="text-foreground text-md font-light text-left">
				{altFront}
			</h3>
		</div>
	</>
);

export default GameCardFront;
