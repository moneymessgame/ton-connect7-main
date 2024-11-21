import { cn } from '@/lib/utils';
import React from 'react';
import styles from './cards.module.scss';

interface CardSpecialProps {
	title: string;
	description: string;
}

export const CardSpecial = ({ title, description }: CardSpecialProps) => {
	return (
		<div className={ cn('container-style' , styles.special)}>
			<img src="/gift.png" width={732} height={796} alt={title} />
			<div>
				<h3>{title}</h3>
				<span>
					<strong>+10000</strong> {description}
				</span>
			</div>
		</div>
	);
};
