"use client"

import { useInitData } from '@telegram-apps/sdk-react';
import Settings from '@/components/blocks/Settings';
import { Header } from '../Header';

export default function Menu() {

    const initData = useInitData();

    return (
			<>
			<Header />
				{/* <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300pb-2 pt-2 dark:border-red-800 border-dashed text-white font-bold dark:from-inherit">
            {initData?.startParam || 'No start param'}
            <Settings/>
        </p> */}
			</>
    )
}