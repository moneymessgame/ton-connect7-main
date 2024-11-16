'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronUpIcon, ChevronDownIcon, UserIcon } from 'lucide-react'

type Characteristic = 'strength' | 'dexterity' | 'intelligence' | 'luck'

const MAX_POINTS = 25
const MAX_CHARACTERISTIC_VALUE = 10

const CHARACTERISTIC_COLORS = {
  strength: { r: 255, g: 0, b: 0 },    // Red
  dexterity: { r: 0, g: 255, b: 0 },   // Green
  intelligence: { r: 0, g: 0, b: 255 }, // Blue
  luck: { r: 255, g: 255, b: 0 }       // Yellow
}

export default function CharacterCard() {
  const [characteristics, setCharacteristics] = useState({
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    luck: 0,
  })

  const [remainingPoints, setRemainingPoints] = useState(MAX_POINTS)

  useEffect(() => {
    const totalPoints = Object.values(characteristics).reduce((sum, value) => sum + value, 0)
    setRemainingPoints(MAX_POINTS - totalPoints)
  }, [characteristics])

  const incrementCharacteristic = (characteristic: Characteristic) => {
    if (remainingPoints > 0 && characteristics[characteristic] < MAX_CHARACTERISTIC_VALUE) {
      setCharacteristics(prev => ({
        ...prev,
        [characteristic]: prev[characteristic] + 1,
      }))
    }
  }

  const decrementCharacteristic = (characteristic: Characteristic) => {
    if (characteristics[characteristic] > 0) {
      setCharacteristics(prev => ({
        ...prev,
        [characteristic]: prev[characteristic] - 1,
      }))
    }
  }

  const getDominantCharacteristics = () => {
    const maxValue = Math.max(...Object.values(characteristics))
    return Object.entries(characteristics)
      .filter(([_, value]) => value === maxValue)
      .map(([key]) => key as Characteristic)
  }

  const getMixedColor = () => {
    const dominantCharacteristics = getDominantCharacteristics()
    if (dominantCharacteristics.length === 0) return 'rgb(229, 231, 235)' // Default gray

    let r = 0, g = 0, b = 0
    dominantCharacteristics.forEach(char => {
      r += CHARACTERISTIC_COLORS[char].r
      g += CHARACTERISTIC_COLORS[char].g
      b += CHARACTERISTIC_COLORS[char].b
    })

    r = Math.round(r / dominantCharacteristics.length)
    g = Math.round(g / dominantCharacteristics.length)
    b = Math.round(b / dominantCharacteristics.length)

    return `rgb(${r}, ${g}, ${b})`
  }

  const getTextColor = (bgColor: string) => {
    const rgb = bgColor.match(/\d+/g)
    if (!rgb) return 'text-gray-900'
    const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000
    return brightness > 128 ? 'text-gray-900' : 'text-white'
  }

  const renderCharacteristic = (characteristic: Characteristic, label: string) => (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex items-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => decrementCharacteristic(characteristic)}
            disabled={characteristics[characteristic] === 0}
            aria-label={`Decrease ${label}`}
          >
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
          <span className="mx-2 min-w-[20px] text-center">{characteristics[characteristic]}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => incrementCharacteristic(characteristic)}
            disabled={remainingPoints === 0 || characteristics[characteristic] === MAX_CHARACTERISTIC_VALUE}
            aria-label={`Increase ${label}`}
          >
            <ChevronUpIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Progress value={(characteristics[characteristic] / MAX_CHARACTERISTIC_VALUE) * 100} className="h-2" />
    </div>
  )

  const bgColor = getMixedColor()
  const textColor = getTextColor(bgColor)

  return (
    <Card className={`w-full max-w-md transition-colors duration-300 ${textColor}`} style={{ backgroundColor: bgColor }}>
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <UserIcon className="mr-2" />
          Character Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderCharacteristic('strength', 'Strength')}
        {renderCharacteristic('dexterity', 'Dexterity')}
        {renderCharacteristic('intelligence', 'Intelligence')}
        {renderCharacteristic('luck', 'Luck')}
        <div className="mt-4 text-center">
          <span className="font-medium">Remaining Points: {remainingPoints}</span>
        </div>
      </CardContent>
    </Card>
  )
}