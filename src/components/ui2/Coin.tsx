import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

type CoinProps = {
	label?: string;
	className?: string;
	type?: 'default' | 'white';
};

const Coin: React.FC<CoinProps> = ({
	label = 'MMes',
	className,
	type = 'default',
}) => {
	const baseClass = 'relative rounded-full flex justify-center items-center';

	const typeClasses = {
		default:
			'w-10 h-10 border-4 border-[var(--font-purple-secondary)] bg-gradient-purple text-white',
		white: ``,
		// white: `border-4 border-[var(--font-${gradient}-secondary)] border-opacity-60 bg-white text-transparent`
	};

	return (
		<div className={classNames(baseClass, typeClasses[type], className)}>
			{type === 'white' ? (
				<Image
					src="/images/coin.png"
					alt="coin"
					className={classNames('rounded-full', className)}
					width={50}
					height={50}
				/>
			) : (
				<>
					<div className="absolute rounded-full" />
					<span
						className={classNames(
							'absolute left-[44%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 italic font-bold text-xl'
						)}
					>
						{label}
					</span>
				</>
			)}
		</div>
	);
};

export default Coin;
