import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import styles from './Heading.module.scss';

interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
	txt?: string;
	top?: React.ReactNode;
	bottom?: React.ReactNode;
}

export const Heading = ({
	title,
	txt,
	top,
	bottom,
	...props
}: HeadingProps) => {
	const t = useTranslations();

	return (
		<div {...props} className={clsx(styles.heading, props.className)}>
			{top && top}
			{title && <div className={styles.title}> {title}</div>}
			{txt && <p className={styles.txt}>{txt}</p>}
			{bottom && bottom}
		</div>
	);
};
