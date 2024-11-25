import PlayerSeeder from '@/components/mafstat/player-seeder';

export default function SeedPlayersPage() {
	return (
			<div>
				<h1 className="text-2xl font-bold mb-6">Seed Players</h1>
				<PlayerSeeder />
				<div className="w-full text-white container-style my-5 p-5 rounded-lg">
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore rem
						commodi eaque libero animi molestias velit officia maxime? Totam,
						minima.
					</p>
				</div>

				<div className="w-full text-white bg-[#4a4ad3] my-5 p-5 rounded-xl">
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore rem
						commodi eaque libero animi molestias velit officia maxime? Totam,
						minima.
					</p>
				</div>

				<div className="w-full text-white bg-[#5d5dfe] my-5 p-5 rounded-2xl">
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore rem
						commodi eaque libero animi molestias velit officia maxime? Totam,
						minima.
					</p>
				</div>
			</div>
	);
}
