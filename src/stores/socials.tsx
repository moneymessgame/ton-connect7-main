import create from 'zustand';
import { persist } from 'zustand/middleware';

// Типы данных
export interface SocialChallenge {
  id: string;
  name: string;
  description: string;
  image: string;
  reward: number;
  refLink: string;
	chatId: string;
  isCompleted: boolean;
}

interface SocialsStore {
  challenges: SocialChallenge[] | null;
  loading: boolean;
  error: string | null;

  fetchChallenges: (userId: string) => Promise<void>;
  updateChallengeStatus: (challengeId: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useSocialsStore = create<SocialsStore>()(
  persist(
    (set, get) => ({
      challenges: null,
      loading: false,
      error: null,

      // Функция для загрузки вызовов
      fetchChallenges: async (userId: string) => {
        set({ loading: true, error: null });

				const cachedChallenges = get().challenges;
				if (cachedChallenges && cachedChallenges.length > 0) {
					// Данные уже есть, пропускаем запрос
					set({ loading: false });
					return;
				}
        try {
          const response = await fetch(`/api/challenges/${userId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch challenges: ${response.statusText}`);
          }

          const data = await response.json();
          set({ challenges: data.challenges, loading: false });
        } catch (error: any) {
          set({ challenges: null, loading: false, error: error.message });
        }
      },

      // Обновление статуса задачи
      updateChallengeStatus: (challengeId: string) => {
        set((state) => ({
          challenges: state.challenges?.map((challenge) =>
            challenge.id === challengeId
              ? { ...challenge, isCompleted: true }
              : challenge
          ),
        }));
      },

      // Изменение состояния загрузки
      setLoading: (loading: boolean) => set({ loading }),
    }),
    {
      name: 'socials-storage', // Локальное хранилище
      partialize: (state) => ({ challenges: state.challenges }), // Сохраняем только задачи
    }
  )
);
