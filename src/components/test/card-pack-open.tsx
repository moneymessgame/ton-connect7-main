'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"

const rarityColors = {
  common: 'bg-gray-400',
  rare: 'bg-blue-500',
  epic: 'bg-purple-600',
  legendary: 'bg-yellow-500'
}

const cards = [
  { id: 1, rarity: 'common' },
  { id: 2, rarity: 'rare' },
  { id: 3, rarity: 'common' },
  { id: 4, rarity: 'epic' },
  { id: 5, rarity: 'legendary' }
]

export default function FirstPack() {
  const [isOpened, setIsOpened] = useState(false)
  const [revealedCards, setRevealedCards] = useState([])

  const openPackage = () => {
    setIsOpened(true)
    revealCards()
  }

  const revealCards = () => {
    cards.forEach((card, index) => {
      setTimeout(() => {
        setRevealedCards(prev => [...prev, card])
      }, index * 500)
    })
  }

  const resetPackage = () => {
    setIsOpened(false)
    setRevealedCards([])
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 p-4">
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Package
              size={120}
              className="text-yellow-500 mb-4"
            />
            <Button 
              onClick={openPackage}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
            >
              Open Package
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-3 gap-4">
        {revealedCards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`w-24 h-32 rounded-lg ${rarityColors[card.rarity]} flex items-center justify-center`}
            initial={{ opacity: 0, y: 50, rotateY: 180 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <Sparkles className="text-white" size={32} />
          </motion.div>
        ))}
      </div>

      {isOpened && revealedCards.length === cards.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <Button 
            onClick={resetPackage}
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Open Another Package
          </Button>
        </motion.div>
      )}
    </div>
  )
}