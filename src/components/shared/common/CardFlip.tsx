'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BorderBeam } from '@/components/ui';
import GameCardFront from '@/components/shared/Card/GameCardFront';
import GameCardBack from '@/components/shared/Card/GameCardBack';
import { CardFlipProps } from '@/types/card-flip';

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
			<div className="flip-card w-[285px] h-[390px] rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl backdrop-blur-3xl cursor-pointer">
				<BorderBeam
					size={250}
					duration={12}
					delay={9}
					colorTo={colorTo}
					colorFrom={colorFrom}
				/>
				<motion.div
					className="flip-card-inner w-[100%] h-[100%]"
					initial={false}
					animate={{ rotateY: isFlipped ? 180 : 0 }}
					transition={{ duration: 0.1, animationDirection: 'normal' }}
					onAnimationComplete={() => setIsAnimated(false)}
				>
					<div className="flip-card-front w-[100%] h-[100%] overflow-hidden relative rounded-md lg:rounded-xl shadow-2xl">
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
					<div className="flip-card-back w-[100%] h-[100%] z-50 absolute top-0 left-0 rounded-md lg:rounded-xl  backface-hidden overflow-hidden">
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
