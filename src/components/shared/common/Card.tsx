import Image from 'next/image';

import { BorderBeam } from '@/components/ui';
import { DockDemo } from './DockDemo';
import { HyperTextDemo } from './HyperTextDemo';
import { TextGenerateEffectDemo } from './TextGenerateEffectDemo';
import { CardProps } from '@/types/card';

const Card: React.FC<CardProps> = ({
	src,
	alt,
	colorTo,
	colorFrom,
	email,
	linkedIn,
	gitHub,
	hyperText,
	subtitle,
}) => (
	<div className="m-4">
		<div className="flex w-full max-w-xs flex-col items-center justify-center rounded-lg border md:shadow-xl mt-10">
			<div className=" -m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-0 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
				<Image
					src={src}
					alt={alt}
					width={300}
					height={417}
					quality={100}
					className="w-full rounded-md lg:rounded-xl bg-foreground/10 shadow-2xl ring-1 ring-border"
				/>
				<BorderBeam
					size={250}
					duration={12}
					delay={9}
					colorTo={colorTo}
					colorFrom={colorFrom}
				/>
			</div>

			<HyperTextDemo title={hyperText} />
			<DockDemo email={email} linkedIn={linkedIn} gitHub={gitHub} />
			<TextGenerateEffectDemo subtitle={subtitle} />
		</div>
	</div>
);

export default Card;
