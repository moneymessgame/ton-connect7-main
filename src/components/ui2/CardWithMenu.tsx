import React, { ReactNode } from 'react';

import Card from '@/components/ui2/Card';
import MenuItem from '@/components/ui2/MenuItem';

type MenuItemProps = {
  image: string;
  title: string;
  reward: string;
  onClick?: () => void;
};

type CardWithMenuProps = {
  gradient: 'blue' | 'pink' | 'purple' | 'orange' | 'green';
  renderContent: () => ReactNode;
  menuItems: MenuItemProps[];
};

const CardWithMenu: React.FC<CardWithMenuProps> = ({ gradient, renderContent, menuItems }) => {
  return (
    <Card gradient={gradient} className="w-full">
      <div className="rounded-2xl text-white">
        {renderContent()} 
        <div className="w-full space-y-2">
          {menuItems.map((item, index) => (
            <div key={index} className="w-full">
              <MenuItem
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

export default CardWithMenu;
