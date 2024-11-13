import characters from '@/constants/characters';
import { CharacterType } from '@/types/characters';

export const getRandomCharacters = (count: number): CharacterType[] => {
	const uniqueCharacters = new Map<string, CharacterType>();
	const shuffled = [...characters].sort(() => 0.5 - Math.random());

	for (const character of shuffled) {
		if (!uniqueCharacters.has(character.characteristic)) {
			const newCharacter: CharacterType = {
				srcFront: character.srcFront || '',
				srcFrontBg: character.srcFrontBg || '',
				srcBack: '',
				altFront: character.altFront || '',
				altBack: character.altBack || '',
				colorTo: character.colorTo || '',
				colorFrom: character.colorFrom || '',
				name: character.name || '',
				firstname: character.firstname || '',
				lastname: character.lastname || '',
				number: character.number || '',
				characteristic: character.characteristic || '',
			};
			uniqueCharacters.set(character.characteristic, newCharacter);
		}
		if (uniqueCharacters.size >= count) break;
	}

	return Array.from(uniqueCharacters.values()).slice(0, count);
};
