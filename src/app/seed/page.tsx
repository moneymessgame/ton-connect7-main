import PlayerSeeder from '@/components/mafstat/player-seeder'

export default function SeedPlayersPage() {
  return (
    <div className="container mx-auto py-10 text-white">
      <h1 className="text-2xl font-bold mb-6">Seed Players</h1>
      <PlayerSeeder />
    </div>
  )
}