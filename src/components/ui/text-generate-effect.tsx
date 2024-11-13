'use client';
import { useEffect } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';
import { cn } from '@/lib/utils';

export const TextGenerateEffect = ({
	subtitle,
	className,
	filter = true,
	duration = 0.5,
}: {
	subtitle: string;
	className?: string;
	filter?: boolean;
	duration?: number;
}) => {
	const [scope, animate] = useAnimate();
	let subtitleArray = subtitle.split(' ');
	useEffect(() => {
		animate(
			'span',
			{
				opacity: 1,
				filter: filter ? 'blur(0px)' : 'none',
			},
			{
				duration: duration ? duration : 1,
				delay: stagger(0.2),
			}
		);
	}, [scope.current]);

	const renderSubtitle = () => {
		return (
			<motion.div ref={scope}>
				{subtitleArray.map((item, idx) => {
					return (
						<motion.span
							key={item + idx}
							className="dark:text-white text-white opacity-0"
							style={{
								filter: filter ? 'blur(10px)' : 'none',
							}}
						>
							{item}{' '}
						</motion.span>
					);
				})}
			</motion.div>
		);
	};

	return (
		<div>
			<div className=" ">
				<div className=" dark:text-white text-black text-xxl leading-10 tracking-wide p-4">
					{renderSubtitle()}
				</div>
			</div>
		</div>
	);
};
