"use client"

import { useInitData } from '@telegram-apps/sdk-react';
import Settings from '@/components/blocks/Settings';

export default function Menu() {

    const initData = useInitData();

    return (
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300pb-2 pt-2 dark:border-red-800 dark:bg-[#ff0f0f] text-white font-bold dark:from-inherit">
            {initData?.startParam || 'No start param'}
            <Settings/>
        </p>
    )
}