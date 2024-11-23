import create from 'zustand';
import { persist } from 'zustand/middleware';

interface Invitee {
	username: string | null;
}

type Referral = {
	invitee: Invitee | null;
	firstName: string | null;
	lastName: string | null;
	username: string | null;
	photoUrl: string | null; 
};

interface ReferralsStore {
	referrals: Referral[] | null;
	loading: boolean;
	fetchReferrals: (userId: string) => Promise<void>;
	setReferrals: (referrals: Referral[] | null) => void;
	setLoading: (loading: boolean) => void;
}

export const useReferralsStore = create<ReferralsStore>()(
	persist(
		(set, get) => ({
			referrals: [],
			loading: false,

			fetchReferrals: async (userId: string) => {
				set({ loading: true });

				try {
					const response = await fetch(`/api/invitation?userId=${userId}`);
					if (!response.ok) {
						throw new Error(`Failed to fetch: ${response.statusText}`);
					}

					const data = await response.json();

					// Обработка данных для извлечения photoUrl
					const referrals = data.map((item: any) => ({
						firstName: item.invitee?.firstName || null,
						lastName: item.invitee?.lastName || null,
						username: item.invitee?.username || null,
						photoUrl: item.invitee?.photoUrl || null,
						invitee: {
							username: item.invitee?.username || null,
						},
					}));

					set({ referrals, loading: false });
				} catch (error) {
					console.error('Error fetching referrals:', error);
					set({ referrals: null, loading: false });
				}
			},

			setReferrals: (referrals) => set({ referrals }),
			setLoading: (loading) => set({ loading }),
		}),
		{
			name: 'referrals-storage',
			partialize: (state) => ({ referrals: state.referrals }),
		}
	)
);
