import React from 'react';
import { cn } from '@/lib/utils';
import { WrapperProps } from '@/types/wrapper';

export default function Wrapper({ children, className }: WrapperProps) {
	return (
		<div
		className={cn(
			'container mx-auto text-white',
			className
		)}
		>
			{children}
		</div>
	);
}
