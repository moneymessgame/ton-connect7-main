import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  photoUrl?: string | null;
  isBot?: boolean;
  isPremium?: boolean;
  languageCode?: string | null;
  allowsWriteToPm?: boolean;
  addedToAttachmentMenu?: boolean;
  walletAddress?: string | null;
  telegramHandle?: string | null;
  telegramId: number;
  birthdate?: Date | null;
  tokenBalance: number;
};

type UserStore = {
  user: User | null;
  loading: boolean;
  fetchUser: (telegramId: string) => Promise<void>;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null, // По умолчанию данные о пользователе отсутствуют
      loading: false,

      fetchUser: async (telegramId: string) => {
        const { user } = get();
        if (user) return;

        set({ loading: true });
        try {
          const response = await fetch(`/api/userByTg?telegramId=${telegramId}`);
          if (response.ok) {
            const userData = await response.json();
            set({ user: userData, loading: false });
          } else {
            console.error('Failed to fetch user');
            set({ user: null, loading: false });
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          set({ user: null, loading: false });
        }
      },
			// Функция для ручной установки данных о пользователе. Если данные уже есть, их можно записать без запроса:
      setUser: (user) => set({ user }),

      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user }), // Указывает, что из всего состояния (state) в localStorage нужно сохранять только user
    }
  )
);
