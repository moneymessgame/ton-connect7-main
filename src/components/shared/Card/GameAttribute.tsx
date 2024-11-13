'use client';

import { ThumbsUp } from 'lucide-react';

import { GameCardFrontProps } from '@/types/game-card-front';
import { Card, CardContent, CardDescription,	CardFooter,	CardHeader,	CardTitle} from '@/components/ui';
import { cn } from '@/lib/utils';

const GameAttribute: React.FC<GameCardFrontProps> = ({
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
		<Card
			className={cn(
				'flex flex-col  w-[285px] h-[390px] border-neutral-700 border-2 border-primary'
			)}
		>
			<CardHeader className="border-b border-border">
				<p className="text-[#ff0f0f]">
					<ThumbsUp className="inline " strokeWidth={0.5} size={32} />
					<span className=" inline text-3xl font-thin">Dominion</span>
				</p>

				<CardTitle className="text-xl font-bold">Title game card</CardTitle>
				<CardDescription>22222</CardDescription>
			</CardHeader>
		</Card>
	</>
);

export default GameAttribute;
