'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BorderBeam } from '@/components/ui';
import GameCardFront from '@/components/shared/Card/GameCardFront';
import GameCardBack from '@/components/shared/Card/GameCardBack';
import { CardFlipProps } from '@/types/card-flip';
import styles from './CardFlip.module.scss';

const CardFlip: React.FC<CardFlipProps> = ({
	srcFront,
	srcFrontBg,
	srcBack,
	altFront,
	altBack,
	colorTo,
	colorFrom,
	name,
	characteristic,
	firstname,
	lastname,
	number,
}) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [isAnimated, setIsAnimated] = useState(false);

	function handleFlip() {
		if (!isAnimated) {
			setIsFlipped(!isFlipped);
			setIsAnimated(true);
		}
	}

	return (
		<div className="m-4" onClick={handleFlip}>
			<div
				className={`w-[285px] h-[390px] rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl backdrop-blur-3xl cursor-pointer ${styles['flip-card']}`}
			>
				<BorderBeam
					size={250}
					duration={12}
					delay={9}
					colorTo={colorTo}
					colorFrom={colorFrom}
				/>
				<motion.div
					className={styles['flip-card-inner']}
					initial={false}
					animate={{ rotateY: isFlipped ? 180 : 0 }}
					transition={{ duration: 0.1, animationDirection: 'normal' }}
					onAnimationComplete={() => setIsAnimated(false)}
				>
					<div className={`${styles['flip-card-front']} shadow-2xl`}>
						<GameCardFront
							srcFront={srcFront}
							srcFrontBg={srcFrontBg}
							srcBack={srcBack}
							colorTo={colorTo}
							colorFrom={colorFrom}
							name={name}
							firstname={firstname}
							lastname={lastname}
							number={number}
							characteristic={characteristic}
							altFront={altFront}
						/>
					</div>
					<div className={`${styles['flip-card-back']} z-50`}>
						<GameCardBack
							srcFront={srcFront}
							srcFrontBg={srcFrontBg}
							srcBack={srcBack}
							colorTo={colorTo}
							colorFrom={colorFrom}
							name={name}
							firstname={firstname}
							lastname={lastname}
							number={number}
							characteristic={characteristic}
							altFront={altFront}
						/>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default CardFlip;
