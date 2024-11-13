'use client';

import React, { useEffect, useState } from 'react';
import { getRandomCharacters } from '@/lib/characterUtils';
import CardSection from './CardSection';
import { CharacterType } from '@/types/characters';
import { CardSectionGenerateProps } from '@/types/card-section-generate';

export default function CardSectionGenerate({
	title = '',
	description = '',
	numberOfCharacters = 1,
}: CardSectionGenerateProps) {
	const [randomCharacters, setRandomCharacters] = useState<CharacterType[]>([]);

	useEffect(() => {
		const characters = getRandomCharacters(numberOfCharacters);
		setRandomCharacters(characters);
	}, [numberOfCharacters]);

	return (
		<CardSection
			title={title}
			description={description}
			cards={randomCharacters.map((character) => ({
				srcFront: character.srcFront,
				srcBack: character.srcBack,
				altFront: character.altFront,
				altBack: character.altBack,
				colorTo: character.colorTo,
				colorFrom: character.colorFrom,
				name: character.name,
				characteristic: character.characteristic,
				number: character.number,
			}))}
			colorTo={''}
			colorFrom={''}
		/>
	);
}
