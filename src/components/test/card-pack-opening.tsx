'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

  useEffect(() => {
    let timer
    if (isOpening && openedCards.length < cards.length) {
      timer = setTimeout(() => {
        setOpenedCards(prev => [...prev, cards[prev.length]])
      }, 1000)
    } else if (openedCards.length === cards.length) {
      setIsOpening(false)
    }
    return () => clearTimeout(timer)
  }, [isOpening, openedCards])

  const openPack = () => {
    setIsOpening(true)
    setOpenedCards([])
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 p-4">
      <AnimatePresence>
        {!isOpening && openedCards.length === 0 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button onClick={openPack} className="text-2xl p-8 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg">
              <Package className="mr-2 h-8 w-8" />
              Open Pack
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpening && openedCards.length < cards.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-white text-2xl mb-8"
        >
          Opening pack...
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        <AnimatePresence>
          {openedCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50, rotateY: 180 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: index * 0.5, duration: 0.5 }}
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
        </AnimatePresence>
      </div>
    </div>
  )
}