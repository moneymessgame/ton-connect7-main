import React from 'react';
import classNames from 'classnames';
import { Squircle } from 'react-ios-corners';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  radius?: number;
}

const Card: React.FC<CardProps> = ({ children, className = '', radius = 40 }) => {

  return (
    <Squircle
      className={classNames(
        'flex w-full flex-col items-stretch justify-start gap-4',
        className
      )}
      radius={radius}>
      {children}
    </Squircle>
  );
};

export default Card;
