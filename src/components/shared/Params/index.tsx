'use client';

import { useSettingsStore } from '@/stores/settings';
import { useState } from 'react';
import { Heading } from '../Heading';
import { Icon } from '../Icon';
import { Modal } from '../Modals';
import { Switch } from '../Switch';
import { useTranslations } from 'next-intl';

import styles from './Params.module.scss';

interface SwitcherProps {
	icon: string;
	title: string;
	desc?: string;
	checked: boolean;
	onChange: () => void;
}

const Switcher = ({ icon, title, desc, checked, onChange }: SwitcherProps) => {
	return (
		<li className={styles.item}>
			<div className={styles.illu}>
				<Icon icon={icon} />
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
		numberAnimaton,
		toggleVibration,
		toggleTapAnimation,
		toggleNumberAnimation,
	} = useSettingsStore();

	const settings: SwitcherProps[] = [
		{
			icon: 'material-symbols-light:vibration-outline-rounded',
			title: t('settings.desc1'),
			desc: t('settings.description1'),
			checked: vibration,
			onChange: toggleVibration,
		},
		{
			icon: 'ph:hand-tap-light',
			title: t('settings.desc2'),
			desc: t('settings.description2'),
			checked: tapAnimation,
			onChange: toggleTapAnimation,
		},
		{
			icon: 'tabler:numbers',
			title: t('settings.desc3'),
			desc: t('settings.description3'),
			checked: numberAnimaton,
			onChange: toggleNumberAnimation,
		},
	];

	return (
		<>
			<button className={styles.button} onClick={() => setIsOpen(true)}>
				<Icon icon="material-symbols:settings" />
			</button>
			{isOpen && (
				<Modal onClose={() => setIsOpen(false)} className={styles.modal}>
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
