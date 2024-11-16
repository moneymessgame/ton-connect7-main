"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'

type BattleHistory = {
  id: number
  date: string
  opponent: string
  result: "victory" | "defeat"
  score: number
}

export default function Options() {
  const [activeTab, setActiveTab] = useState("profile")
  const [searchTerm, setSearchTerm] = useState("")
  const [resultFilter, setResultFilter] = useState("all")

  const userProfile = {
    nickname: "SpaceCommander",
    description: "Veteran space strategist with 5 years of experience.",
    socialLink: "https://space-social.com/SpaceCommander",
  }

  const battleHistory: BattleHistory[] = [
    { id: 1, date: "2023-10-15", opponent: "StarRaider", result: "victory", score: 1500 },
    { id: 2, date: "2023-10-10", opponent: "GalacticWarrior", result: "defeat", score: 1200 },
    { id: 3, date: "2023-10-05", opponent: "CosmicConqueror", result: "victory", score: 1800 },
    { id: 4, date: "2023-09-30", opponent: "NebulaNavigator", result: "victory", score: 1600 },
    { id: 5, date: "2023-09-25", opponent: "AsteroidAce", result: "defeat", score: 1100 },
  ]

  const filteredBattles = battleHistory.filter((battle) => {
    const matchesSearch = battle.opponent.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = resultFilter === "all" || battle.result === resultFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Options</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="battle-history">Battle History</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Nickname:</strong> {userProfile.nickname}</p>
                <p><strong>Description:</strong> {userProfile.description}</p>
                <p><strong>Social Link:</strong> <a href={userProfile.socialLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{userProfile.socialLink}</a></p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="battle-history">
          <Card>
            <CardHeader>
              <CardTitle>Battle History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Search opponents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  value={resultFilter}
                  onChange={(e) => setResultFilter(e.target.value)}
                  className="border rounded-md p-2"
                >
                  <option value="all">All Results</option>
                  <option value="victory">Victories</option>
                  <option value="defeat">Defeats</option>
                </select>
              </div>
              <div className="space-y-2">
                {filteredBattles.map((battle) => (
                  <div key={battle.id} className="flex justify-between items-center bg-muted p-2 rounded-md">
                    <span>{battle.date}</span>
                    <span>{battle.opponent}</span>
                    <span className={battle.result === "victory" ? "text-green-500" : "text-red-500"}>
                      {battle.result.charAt(0).toUpperCase() + battle.result.slice(1)}
                    </span>
                    <span>{battle.score} pts</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}