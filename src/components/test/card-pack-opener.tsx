'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CharacterCard from './character-card'

const rarityColors = {
  common: 'bg-gray-400',
  rare: 'bg-blue-500',
  epic: 'bg-purple-600',
  legendary: 'bg-yellow-500'
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0 }
}

export default function SecondPack() {
  const [isOpening, setIsOpening] = useState(false)
  const [cards, setCards] = useState([])

  const openPack = () => {
    setIsOpening(true)
    setTimeout(() => {
      const newCards = Array(5).fill(null).map(() => ({
        id: Math.random().toString(36).substr(2, 9),
        rarity: ['common', 'common', 'rare', 'epic', 'legendary'][Math.floor(Math.random() * 5)]
      }))
      setCards(newCards)
      setIsOpening(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-full min-h-full ">
			<div className="min-w-full h-full">
        <AnimatePresence>
          {!isOpening && cards.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center h-full"
            >
              <Package className="w-32 h-32 text-yellow-500 mb-4" />
              <Button onClick={openPack} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded">
                Open Pack
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {isOpening && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-32 h-32 border-8 border-yellow-500 border-t-transparent rounded-full mx-auto"
          />
        )}

        <div className="grid grid-cols-3 gap-4 col-start-1">
          <AnimatePresence>
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ delay: index * 0.2 }}
                className={`relative aspect-[2/3] rounded-lg ${rarityColors[card.rarity]} shadow-lg overflow-hidden`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  
                  <CharacterCard  />
                </div>
                <div className="absolute bottom-2 left-2 right-2 text-center text-white text-xs font-bold bg-black bg-opacity-50 rounded py-1">
                  {card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {cards.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8 text-center"
          >
            <Button onClick={() => setCards([])} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Open Another Pack
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}