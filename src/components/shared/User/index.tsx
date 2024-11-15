'use client';

import { useUser } from '@/contexts/UserContext';
import { Avatar } from '../Avatar';
import styles from './User.module.scss';
import { constructName } from '@/utils/utils';

export const User = () => {
	const { user, loading } = useUser();

	if (loading) return <div>Loading...</div>;

	if (!user) return <div>No user data available</div>;

	const { username, firstName, lastName, photoUrl } = user;
	const name = constructName(firstName, lastName, username);

	return (
		<div className={styles.left}>
			<Avatar src={photoUrl} name={name} />
			<div>
				{name} <small>(Tracker)</small> {/* TODO: add level */}
			</div>
		</div>
	);
};
