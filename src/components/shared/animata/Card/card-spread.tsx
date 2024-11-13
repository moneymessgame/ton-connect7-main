'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import CardSectionGenerate from '@/components/shared/common/CardSectionGenerate';

function CardSectionFunction() {
	return <CardSectionGenerate />;
}

const cards = [
	{
		component: CardSectionFunction,
		rotationClass: '',
		revealClass: '-rotate-[2deg]',
	},
	{
		component: CardSectionFunction,
		rotationClass: 'group-hover:rotate-[15deg]',
		revealClass: 'rotate-[3deg] translate-y-2',
	},

	{
		component: CardSectionFunction,
		rotationClass: 'group-hover:rotate-[30deg]',
		revealClass: '-rotate-[2deg] translate-x-1',
	},

	{
		component: CardSectionFunction,
		rotationClass: 'group-hover:rotate-[45deg]',
		revealClass: 'rotate-[2deg]',
	},
];

export default function CardSpread() {
	const [isExpanded, setExpanded] = useState(false);

	return (
		<div
			className={cn(
				'group relative flex min-h-80 min-w-52 items-center transition-all duration-500 ease-in-out cursor-pointer',
				{
					'origin-bottom transition-all duration-500 ease-in-out hover:-rotate-[15deg]':
						!isExpanded,
					'gap-3': isExpanded,
				}
			)}
		>
			{cards.map((item, index) => {
				return (
					<div
						key={index}
						onClick={(e) => {
							setExpanded(!isExpanded);
							e.preventDefault();
						}}
						className={cn(
							'transition-all duration-500 ease-in-out',
							{
								absolute: !isExpanded,
								'origin-bottom': !isExpanded,
							},
							!isExpanded && item.rotationClass,
							isExpanded && item.revealClass
						)}
						style={{ zIndex: index }}
					>
						<item.component />
					</div>
				);
			})}
		</div>
	);
}
