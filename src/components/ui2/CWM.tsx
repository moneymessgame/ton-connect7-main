import React, { ReactNode } from 'react';

import Card from '@/components/ui2/Card';
import MItem from '@/components/ui2/MItem';

interface MItemProps {
	image: string;
	reward: string;
	title: string;
	onClick?: () => void;
}

type CWMProps = {
	gradient: 'blue' | 'pink' | 'purple' | 'orange' | 'green';
	renderContent: () => ReactNode;
	menuItems: MItemProps[];
};

const CWM: React.FC<CWMProps> = ({ gradient, renderContent, menuItems }) => {
	return (
		<Card gradient={gradient} className="mx-auto w-full max-w-md">
			<div className="rounded-2xl p-2 text-white">
				{renderContent()}
				<div className="w-full space-y-2 pt-2">
					{menuItems.map((item, index) => (
						<div key={index} className="w-full">
							<MItem
								image={item.image}
								title={item.title}
								reward={item.reward}
								onClick={item.onClick}
							/>
						</div>
					))}
				</div>
			</div>
		</Card>
	);
};

export default CWM;

// CardWithMenu
