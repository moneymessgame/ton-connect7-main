'use client';

import { AppRoot, SegmentedControl } from '@telegram-apps/telegram-ui';
import { TonConnectButton } from '@tonconnect/ui-react';
import {
	Check,
	ChevronRight,
	Server as ServerIcon,
	Star,
	Wallet,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

import {
	initBlockchainLogic,
	isContractDeployed,
} from '@/lib/contract/blockchain';
import { derivePublicKey, generatePrivateKey } from '@/lib/encryption';
import {
	getFromTelegramStorage,
	saveToTelegramStorage,
} from '@/hooks/useTelegramStorage';

import { useUser } from '@/contexts/UserContext';
import { useTonConnect } from '@/hooks/useTonConnect';

export default function Ton() {
	const { network, wallet, address } = useTonConnect();
	const { user } = useUser();
	const [isBlockchainInited, setIsBlockchainInited] = useState(false);
	const [loading, setLoading] = useState(false);
	const [tokenBalance, setTokenBalance] = useState(0);
	const [selected, setSelected] = useState<number | null>(null);
	const [copySuccess, setCopySuccess] = useState<string>('');
	const selectedLoadingStarted = useRef(false);
	const privateLoadingStarted = useRef(false);
	const privateKey = useRef<string | null>(null);
	const t = useTranslations('earn');

	useEffect(() => {
		const checkBlockchainInited = async () => {
			if (address) {
				const inited = await isContractDeployed(address);
				setIsBlockchainInited(inited);
				if (!inited) {
					const isContractDeployedRes = await isContractDeployed(address);
					if (isContractDeployedRes) {
						await handleInitBlockchain();
					}
				}
			}
		};

		if (privateKey.current == null && privateLoadingStarted.current === false) {
			privateLoadingStarted.current = true;
			getInitPrivateKey().then((key) => (privateKey.current = key));
		}
		if (selected == null && selectedLoadingStarted.current === false) {
			selectedLoadingStarted.current = true;
			getSaveStorageType().then((type) => setSelected(type));
		}

		checkBlockchainInited();
	}, [address]);

	const updateTokenBalance = async (amount: number, reason: string) => {
		if (user && user.id) {
			try {
				const response = await fetch(`/api/balance/${user.id}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ amount, reason }),
				});
				console.log('БАЛАНС:', response);

				if (response.ok) {
					const data = await response.json();
					setTokenBalance(data.tokenBalance);
				} else {
					console.error('Failed to update token balance:', response.statusText);
				}
			} catch (error) {
				console.error('Error updating token balance:', error);
			}
		}
	};

	const handleInitBlockchain = async () => {
		setLoading(true);
		try {
			if (privateKey == null) {
				await generateAndSaveNewPrivateKey();
			}
			const publicKey = derivePublicKey(privateKey.current!);
			await initBlockchainLogic(address!, publicKey);
			setIsBlockchainInited(true);
			await updateTokenBalance(1000, 'TON Connect'); // Award 1000 tokens
		} catch (error) {
			console.error('Failed to initialize blockchain logic:', error);
		} finally {
			setLoading(false);
		}
	};

	async function getSaveStorageType(): Promise<number> {
		const type = await getFromTelegramStorage(window, 'dataStorageType');
		switch (type) {
			case 'backend+ton':
				return 1;
			case 'ton':
				return 2;
			default:
				return 0;
		}
	}

	async function getInitPrivateKey(): Promise<string | null> {
		const privateKey = await getFromTelegramStorage(window, 'privateKey');
		if (privateKey == null) {
			await generateAndSaveNewPrivateKey();
			return await getFromTelegramStorage(window, 'privateKey');
		}
		return privateKey;
	}

	async function generateAndSaveNewPrivateKey() {
		const key = (privateKey.current = generatePrivateKey());
		await saveToTelegramStorage(window, 'privateKey', key);
	}

	const copyToPrivateKey = () => {
		if (privateKey.current != null) {
			navigator.clipboard.writeText(privateKey.current!).then(
				() => {
					setCopySuccess(t('copy_success'));
					setTimeout(() => {
						setCopySuccess(t('copy'));
					}, 2000);
				},
				() => {
					setCopySuccess(t('copy_failed'));
				}
			);
		}
	};

	const handleSelect = (index: number) => {
		setSelected(index);
		let selectedValue = 'backend';
		switch (index) {
			case 1:
				selectedValue = 'backend+ton';
				break;
			case 2:
				selectedValue = 'ton';
				break;
		}
		saveToTelegramStorage(window, 'dataStorageType', selectedValue);
	};

  return (
    <div className="flex flex-col">

      <main className="flex w-full flex-1 flex-col items-center justify-center space-y-4 text-center">
        <div className="flex w-full max-w-lg items-center justify-between container-style p-4">
					<Wallet className="text-white" size={25} strokeWidth={1.5} />
          <p className="mx-4 flex-1 text-white">{t('connect_wallet')}</p>
          <TonConnectButton />
        </div>

				{isBlockchainInited ? (
					<div className="flex w-full max-w-lg flex-col items-center justify-center bg-green-900 rounded-xl p-4 text-green-100">
						<div className="flex w-full items-center justify-between">
							<Check size={25} strokeWidth={1.5} />
							<p className="text-lg font-semibold">
								{t('account_blockchain')}
							</p>
							<p className="text-xl font-semibold">
								{t('token_balance')}
							</p>
						</div>
					</div>
				) : (
					<div
						className="mb-4 flex w-full max-w-lg flex-col items-center justify-between container-style p-4"
						onClick={handleInitBlockchain}
					>
						<div className="flex w-full items-center justify-between">
							{loading ? (
								<div className="size-8 animate-spin rounded-full border-y-2 border-blue-500" />
							) : (
								<Star className="text-white" size={25} strokeWidth={1.5} />
							)}
							<p className="mx-4 flex-1 text-white">{t('init_blockchain')}</p>
							<ChevronRight className="text-white" size={25} strokeWidth={1.5} />
						</div>
						<p className="mt-2 text-xl font-semibold text-white">
							{t('token_balance')}
						</p>
					</div>
				)}
				{!isBlockchainInited ? (
					<div />
				) : (
					<div className="flex w-full max-w-lg flex-col items-center justify-center">
						<div className="mb-4 flex w-full max-w-lg items-center justify-between container-style p-4">
							<ServerIcon className="text-white" size={25} strokeWidth={1.5} />
							<p className="mx-4 flex-1 text-header2 text-deep-dark">
								{t('data_storage')}
							</p>
							<AppRoot>
								<SegmentedControl className="relative mx-auto flex max-w-lg justify-between overflow-hidden rounded-lg bg-black p-3 shadow-md">
									<SegmentedControl.Item
										className={`relative z-10 text-center ${
											selected === 0 ? 'bg-[#0098e9] text-white font-light rounded-3xl px-2' : ''
										}`}
										selected={selected === 0}
										onClick={() => handleSelect(0)}
										style={{ borderRadius: '100px' }}
									>
										<label
											className={`block cursor-pointer p-2 font-semibold transition-colors duration-200 ${
												selected === 0 ? 'text-white' : ''
											}`}
										>
											{t('server')}
										</label>
										<input
											className="absolute inset-0 size-full cursor-pointer opacity-0"
											type="radio"
										/>
									</SegmentedControl.Item>

									<SegmentedControl.Item
										className={`relative z-10 text-center ${
											selected === 2 ? 'bg-[#0098e9] text-white font-light rounded-3xl  px-2' : ''
										}`}
										selected={selected === 2}
										onClick={() => handleSelect(2)}
										style={{ borderRadius: '100px' }}
									>
										<label
											className={`block cursor-pointer p-2 font-semibold transition-colors duration-200 ${
												selected === 2 ? 'text-white' : ''
											}`}
										>
											{t('ton')}
										</label>
										<input
											className="absolute inset-0 size-full cursor-pointer opacity-0"
											type="radio"
										/>
									</SegmentedControl.Item>
								</SegmentedControl>
							</AppRoot>
						</div>
						<div>
							<div>{t('copy_key')}</div>
							<button onClick={copyToPrivateKey} className="my-2 bg-[#0098e9] rounded-3xl px-5 py-2 text-white">
								{copySuccess || t('copy')}
							</button>
						</div>
						<span className="text-xs text-gray-500">
							{t('private_key_info')}
						</span>
					</div>
				)}
			</main>
		</div>
	);
}
