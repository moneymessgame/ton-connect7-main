'use client';

import type { PropsWithChildren } from 'react';
import React, { useRef } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import { ny } from '@/lib/util';
import { IconProps } from '../DockDemo';

export interface DockProps extends VariantProps<typeof dockVariants> {
	className?: string;
	magnification?: number;
	distance?: number;
	direction?: 'top' | 'middle' | 'bottom';
	children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
	"supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto flex h-[58px] w-max gap-2 rounded-2xl border border-neutral-200 p-2 backdrop-blur-md' dark:border-neutral-800"
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
	(
		{
			className,
			children,
			magnification = DEFAULT_MAGNIFICATION,
			distance = DEFAULT_DISTANCE,
			direction = 'bottom',
			...props
		},
		ref
	) => {
		const mouseX = useMotionValue(Infinity);

		const renderChildren = () => {
			return React.Children.map(children, (child) => {
				if (React.isValidElement(child) && child.type === DockIcon) {
					return React.cloneElement(child, {
						...child.props,
						mouseX,
						magnification,
						distance,
					});
				}
				return child;
			});
		};

		return (
			<motion.div
				ref={ref}
				onMouseMove={(e) => mouseX.set(e.pageX)}
				onMouseLeave={() => mouseX.set(Infinity)}
				{...props}
				className={ny(dockVariants({ className }), {
					'items-start': direction === 'top',
					'items-center': direction === 'middle',
					'items-end': direction === 'bottom',
				})}
			>
				{renderChildren()}
			</motion.div>
		);
	}
);

Dock.displayName = 'Dock';

export interface DockIconProps {
	size?: number;
	magnification?: number;
	distance?: number;
	mouseX?: any;
	className?: string;
	children?: React.ReactNode;
	props?: PropsWithChildren;
	icon: (props: IconProps) => JSX.Element; 
}

function DockIcon({
	size,
	magnification = DEFAULT_MAGNIFICATION,
	distance = DEFAULT_DISTANCE,
	mouseX,
	className,
	children,
	...props
}: DockIconProps) {
	const ref = useRef<HTMLDivElement>(null);

	const distanceCalc = useTransform(mouseX, (val: number) => {
		const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

		return val - bounds.x - bounds.width / 2;
	});

	const widthSync = useTransform(
		distanceCalc,
		[-distance, 0, distance],
		[40, magnification, 40]
	);

	const width = useSpring(widthSync, {
		mass: 0.1,
		stiffness: 150,
		damping: 12,
	});

	return (
		<motion.div
			ref={ref}
			style={{ width }}
			className={ny(
				'flex aspect-square cursor-pointer items-center justify-center rounded-full',
				className
			)}
			{...props}
		>
			{children}
		</motion.div>
	);
}

DockIcon.displayName = 'DockIcon';

export { Dock, DockIcon, dockVariants };