'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import * as lucideIcons from 'lucide-react';
import { Bolt } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useSettingsStore } from '@/stores/settings';
import { Heading } from '../../shared/Heading';
import { Icon } from '../../shared/Icon';
import { Modal } from '../Modals';
import { Switch } from '../../shared/Switch';

import styles from './Params.module.scss';

interface SwitcherProps {
	icon: string;
	title: string;
	desc?: string;
	checked: boolean;
	onChange: () => void;
}

const Switcher = ({ icon, title, desc, checked, onChange }: SwitcherProps) => {
	const LucideIcon = lucideIcons[icon as keyof typeof lucideIcons] as React.ComponentType<{
		size?: number;
		strokeWidth?: number;
	}> | null;

	return (
		<li className={styles.item}>
			<div className={styles.icon}>
				{LucideIcon ? (
					<LucideIcon size={20} strokeWidth={1.5} />
				) : (
					<Icon icon={icon} />
				)}
			</div>
			<div className={styles.txt}>
				<strong>{title}</strong>
				{desc && <small>{desc}</small>}
			</div>
			<Switch id={icon} checked={checked} onChange={onChange} />
		</li>
	);
};


export const Params = () => {
	const t = useTranslations();
	const [isOpen, setIsOpen] = useState(false);
	const {
		vibration,
		tapAnimation,
		numberAnimation,
		toggleVibration,
		toggleTapAnimation,
		toggleNumberAnimation,
	} = useSettingsStore();

	const settings: SwitcherProps[] = [
		{
			icon: 'Vibrate',
			title: t('settings.desc1'),
			desc: t('settings.description1'),
			checked: vibration,
			onChange: toggleVibration,
		},
		{
			icon: 'Fingerprint',
			title: t('settings.desc2'),
			desc: t('settings.description2'),
			checked: tapAnimation,
			onChange: toggleTapAnimation,
		},
		{
			icon: 'HandMetal',
			title: t('settings.desc3'),
			desc: t('settings.description3'),
			checked: numberAnimation,
			onChange: toggleNumberAnimation,
		},
	];

	return (
		<>
			<button className={styles.button} onClick={() => setIsOpen(true)}>
				<Bolt
					strokeWidth={1.5}
					size={25}
					className={`${isOpen ? 'text-active_color' : 'text-[#fff]'}`}
				/>
			</button>
			{isOpen && (
				<Modal
					onClose={() => setIsOpen(false)}
					className={cn(
						'rb-18 bg-background/40 backdrop-blur-[4px] shadow-2xl',
						styles.modal
					)}
				>
					<Heading title={t('settings.title')} txt={t('settings.txt')} />
					<ul className={styles.list}>
						{settings.map((setting) => (
							<Switcher key={setting.title} {...setting} />
						))}
					</ul>
				</Modal>
			)}
		</>
	);
};
