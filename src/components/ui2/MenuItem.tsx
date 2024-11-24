import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import Coin from '@/components/ui2/Coin';

interface MenuItemProps {
	image: string;
	title: string;
	reward: string;
	onClick?: () => void;
	color?: 'blue' | 'pink' | 'purple' | 'orange' | 'dark' | 'green';
}

const MenuItem: React.FC<MenuItemProps> = ({
	image,
	title,
	reward,
	onClick,
	color,
}) => {
	// TODO: this class is not adaptive for smaller screens, a fix is needed

	return (
		<div
			className="flex w-full cursor-pointer items-center gap-4 rounded-2xl p-4 transition duration-300 ease-in-out container-style"
			onClick={onClick}
		>
			<Image
				src={image}
				alt="Avatar"
				className="size-10 shrink-0 rounded-full md:size-12"
				fill
				sizes="(max-width: 768px) 40px, 50px"
				style={{ objectFit: 'cover' }}
			/>
			{/* <img
				src={image}
				alt="Avatar"
				className="size-10 shrink-0 rounded-full md:size-12"
			/> */}
			<div className="flex flex-1 items-center justify-between overflow-hidden">
				<div
					className="flex max-w-[200px] flex-1 flex-col gap-1 overflow-hidden"
					style={{
						maxWidth: window.innerWidth <= 375 ? '160px' : '200px',
					}}
				>
					<p className="truncate whitespace-nowrap text-left text-sm font-medium">
						{title}
					</p>
					<div className="flex items-center">
						{/* <span className="pr-1 text-lg font-bold md:text-xl">{reward}</span> */}
						{/* <Coin className="size-4 md:size-6" type="white" /> */}
					</div>
				</div>
				{/* <ChevronRightIcon className="size-5 shrink-0 text-white opacity-90 md:size-6 " /> */}
				<Button>
					{reward}
					<Coin className="size-3 md:size-6 ml-0.5" type="white" />
				</Button>
			</div>
		</div>
	);
};

export default MenuItem;
