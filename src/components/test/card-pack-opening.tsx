'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const rarityColors = {
  Common: 'bg-gray-400',
  Rare: 'bg-blue-500',
  Epic: 'bg-purple-600',
  Legendary: 'bg-yellow-500'
}

const cards = [
  { id: 1, rarity: 'Common', name: 'Forest Sprite' },
  { id: 2, rarity: 'Rare', name: 'Mystic Owl' },
  { id: 3, rarity: 'Epic', name: 'Dragon Whisperer' },
  { id: 4, rarity: 'Common', name: 'Stone Golem' },
  { id: 5, rarity: 'Legendary', name: 'Celestial Phoenix' }
]

export default function ThirdPack() {
  const [isOpening, setIsOpening] = useState(false)
  const [openedCards, setOpenedCards] = useState([])

  const openPack = () => {
    setIsOpening(true)
    let cardIndex = 0
    const interval = setInterval(() => {
      if (cardIndex < cards.length) {
        setOpenedCards((prev) => [...prev, cards[cardIndex]])
        cardIndex++
      } else {
        clearInterval(interval)
        setIsOpening(false)
      }
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 p-4">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: isOpening ? 1.2 : 1, opacity: isOpening ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        {!isOpening && openedCards.length === 0 && (
          <Button onClick={openPack} className="text-2xl p-8 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg">
            <Package className="mr-2 h-8 w-8" />
            Open Pack
          </Button>
        )}
        {isOpening && (
          <div className="text-white text-2xl">Opening pack...</div>
        )}
      </motion.div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {openedCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 50, rotateY: 180 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ delay: index * 0.5 + 0.5, duration: 0.5 }}
            className={`relative ${rarityColors[card.rarity]} rounded-lg p-4 aspect-[3/4] shadow-xl flex flex-col justify-between`}
          >
            <div className="text-white font-bold">{card.name}</div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white opacity-75">{card.rarity}</span>
              {card.rarity === 'Legendary' && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="text-yellow-300" />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}