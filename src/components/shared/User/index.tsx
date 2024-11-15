'use client';

import { useUserStore } from '@/stores/user';
import { Avatar } from '../Avatar';
import styles from './User.module.scss';
import { useEffect } from 'react';
import { useInitData } from '@telegram-apps/sdk-react';
import { constructName } from '@/utils/utils';

export const User = () => {
  const { user, fetchUser } = useUserStore();
  const initData = useInitData();

  useEffect(() => {
    if (!user && initData?.user?.id) {
      fetchUser(initData.user.id.toString());
    }
  }, [fetchUser, initData, user]);

  if (!user) return <div>No user data available</div>;

  const { username, firstName, lastName, photoUrl } = user;
  const name = constructName(firstName, lastName, username);

  return (
    <div className={styles.left}>
      <Avatar src={photoUrl} name={name} />
      <div>
        {name} <small>(Tracker)</small>
      </div>
    </div>
  );
};
