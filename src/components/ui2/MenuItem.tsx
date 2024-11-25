import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Coin from '@/components/ui2/Coin';

interface MenuItemProps {
	image: string;
	title: string;
	reward: string;
	onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
	image,
	title,
	reward,
	onClick,
}) => {

	return (
		<div
			className="flex w-full cursor-pointer items-center gap-4 rounded-2xl p-4 transition duration-300 ease-in-out container-style"
			onClick={onClick}
		>
			<Image
				src={image}
				alt="Avatar"
				width={48}
				height={48} 
				className="shrink-0 rounded-full md:w-12 md:h-12"
			/>

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
					<div className="flex items-center"></div>
				</div>
				<Button>
					{reward}
					<Coin className="size-3 md:size-6 ml-0.5" type="white" />
				</Button>
			</div>
		</div>
	);
};

export default MenuItem;
