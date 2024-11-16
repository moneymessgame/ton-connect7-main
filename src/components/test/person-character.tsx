"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MinusCircle, PlusCircle } from 'lucide-react'

type Characteristic = "Strength" | "Dexterity" | "Intelligence" | "Charisma"

export default function Component() {
  const [characteristics, setCharacteristics] = useState<Record<Characteristic, number>>({
    Strength: 1,
    Dexterity: 1,
    Intelligence: 1,
    Charisma: 1,
  })

  const totalPoints = Object.values(characteristics).reduce((sum, value) => sum + value, 0)
  const remainingPoints = 25 - totalPoints

  const handleIncrement = (char: Characteristic) => {
    if (remainingPoints > 0 && characteristics[char] < 10) {
      setCharacteristics((prev) => ({ ...prev, [char]: prev[char] + 1 }))
    }
  }

  const handleDecrement = (char: Characteristic) => {
    if (characteristics[char] > 1) {
      setCharacteristics((prev) => ({ ...prev, [char]: prev[char] - 1 }))
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Character Card</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <img
            src="/placeholder.svg?height=100&width=100"
            alt="Character Avatar"
            className="rounded-full w-24 h-24 mb-2"
          />
          <h2 className="text-2xl font-bold">John Doe</h2>
        </div>
        <div className="space-y-4">
          {(Object.keys(characteristics) as Characteristic[]).map((char) => (
            <div key={char} className="flex items-center justify-between">
              <span className="font-medium">{char}</span>
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleDecrement(char)}
                  disabled={characteristics[char] <= 1}
                  aria-label={`Decrease ${char}`}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{characteristics[char]}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleIncrement(char)}
                  disabled={remainingPoints <= 0 || characteristics[char] >= 10}
                  aria-label={`Increase ${char}`}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <p className="font-medium">
            Remaining Points: <span className="text-primary">{remainingPoints}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}