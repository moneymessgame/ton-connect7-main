'use client';

import { useEffect } from 'react';
import { useInitData } from '@telegram-apps/sdk-react';

import { useUserStore } from '@/stores/user';
import { constructName } from '@/utils/utils';
import { cn } from '@/lib/utils';
import Dropdown from '@/components/ui2/Dropdown';
import { Avatar } from '../Avatar';
import styles from './User.module.scss';

export const User = () => {
  const { user, fetchUser } = useUserStore();
  const initData = useInitData();

  useEffect(() => {
    if (!user && initData?.user?.id) {
      fetchUser(initData.user.id.toString());
    }
  }, [fetchUser, initData, user]);

  if (!user) return <div>Loading</div>;

  const { username, firstName, lastName, photoUrl } = user;
  const name = constructName(firstName, lastName, username);

  return (
    <div className="flex gap-3">
      <div className={cn('flex flex-col items-end justify-center', styles.txt)}>
        <strong>{name}</strong>
        <small>Tracker</small>
      </div>
      <Dropdown>
        <Avatar src={photoUrl} name={name} />
      </Dropdown>
    </div>
  );
};
