import { isExternalLink } from '@/lib/url';
import { Types } from '@/types/types';
import clsx from 'clsx';
import Link from 'next/link';
import {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	HTMLAttributes,
	ReactNode,
} from 'react';
import { Icon } from '../Icon';
import styles from './Button.module.scss';

export interface ButtonProps {
	children?: ReactNode;
	href?: string;
	icon?: string;
	className?: string;
	type?: Types;
	onClick?: () => void;
	disabled?: boolean;
}

export const Button = ({
	children,
	href,
	icon,
	className,
	onClick,
	type = 'primary',
	disabled,
	...props
}: ButtonProps) => {
	const Content = (
		<>
			{children && <span>{children}</span>}
			{icon && <Icon icon={icon} />}
		</>
	);

	const classNames = clsx(styles.btn, className);

	const attrs = {
		'data-type': type,
		className: classNames,
		onClick,
	};

	if (href) {
		if (isExternalLink(href)) {
			return (
				<a
					{...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
					{...attrs}
					href={href}
					target="_blank"
					rel="noopener noreferrer"
				>
					{Content}
				</a>
			);
		} else {
			return (
				<Link
					{...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
					{...attrs}
					href={href}
				>
					{Content}
				</Link>
			);
		}
	} else {
		return (
			<button
				disabled={disabled}
				{...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
				{...attrs}
			>
				{Content}
			</button>
		);
	}
};

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export const ButtonGroup = ({ children, ...props }: ButtonGroupProps) => (
	<div {...props} className={clsx(styles.group, props.className)}>
		{children}
	</div>
);
