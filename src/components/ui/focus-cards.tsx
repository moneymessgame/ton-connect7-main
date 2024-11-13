'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export const Card = React.memo(
	({
		card,
		index,
		hovered,
		setHovered,
		className,
	}: {
		card: any;
		index: number;
		hovered: number | null;
		setHovered: React.Dispatch<React.SetStateAction<number | null>>;
		className?: string;
	}) => (
		<div
			onMouseEnter={() => setHovered(index)}
			onMouseLeave={() => setHovered(null)}
			className={cn(
				'rounded-xl relative bg-gray-100 dark:bg-neutral-900 overflow-hidden w-[285px] h-[390px] transition-all duration-300 ease-out',
				hovered !== null && hovered !== index && 'blur-sm scale-[0.98]',
				className
			)}
		>
			<Image
				src={card.src}
				alt={card.title}
				width={285}
				height={390}
				className="object-cover absolute inset-0"
			/>
			<div
				className={cn(
					'absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300',
					hovered === index ? 'opacity-100' : 'opacity-0'
				)}
			>
				<div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
					{card.title}
				</div>
			</div>
		</div>
	)
);

Card.displayName = 'Card';

type Card = {
	title: string;
	src: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
	const [hovered, setHovered] = useState<number | null>(null);

	const displayedCards = cards.slice(0, 4);

	return (
		<div className="relative flex items-center justify-center">
			<div
				className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8  
			md:gap-8 py-10 md:py-20 max-w-6xl`}
			>
				{displayedCards.map((card, index) => (
					<Card
						key={card.title}
						card={card}
						index={index}
						hovered={hovered}
						setHovered={setHovered}
						className="relative object-cover w-[285px] h-[390px] overflow-hidden"
					/>
				))}
			</div>
		</div>
	);
}
