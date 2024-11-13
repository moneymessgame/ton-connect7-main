import {Container, Wrapper} from '@/components/global';
import { CardSectionProps } from '@/types/card-section';
import GameCardFront from '@/components/shared/Card/GameCardFront';

const CardSection: React.FC<CardSectionProps> = ({
	title,
	description,
	cards,
	columns = 4,
}) => (
	<section>
		<Wrapper className="flex flex-col items-center justify-center relative">
			<Container>
				<div className="flex flex-col items-center justify-center h-full">
					<div className="flex flex-col items-center mt-8 max-w-3xl w-11/12 md:w-full">
						<div className="flex items-center justify-center">
							<h2 className="text-4xl md:text-5xl lg:text-xl md:!leading-snug font-black uppercase text-center bg-clip-text bg-gradient-to-b from-gray-50 to-gray-50 text-transparent">
								{title}
							</h2>
						</div>
						<p className="text-base md:text-lg text-foreground/80 mt-6 text-center">
							{description}
						</p>
					</div>
					<div className="relative flex items-center">
						<div className="absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 h-3/4 -translate-y-1/2 inset-0 blur-[10rem]" />
						<div
							className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-${columns} gap-5  
				md:gap-8 py-10 md:py-20 max-w-6xl`}
						>
							{cards.map((card, index) => (
								<div className="m-4 w-[285px] h-[390px] rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
									<div className="w-[100%] h-[100%] overflow-hidden relative rounded-md lg:rounded-xl bg-foreground/10 shadow-2xl ring-1">
										<GameCardFront
											srcFront={card.srcFront}
											srcFrontBg={card.srcFrontBg}
											srcBack={card.srcBack}
											colorTo={card.colorTo}
											colorFrom={card.colorFrom}
											name={card.name}
											firstname={card.firstname}
											lastname={card.lastname}
											number={card.number}
											characteristic={card.characteristic}
											altFront={card.altFront}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</Container>
		</Wrapper>
	</section>
);

export default CardSection;
