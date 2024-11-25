'use client'

import { useState } from 'react'
import { Character, Rarity } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type CharacterWithRarity = Character & { rarity: Rarity }

export default function CharacterTable({ 
  initialCharacters, 
  rarities 
}: { 
  initialCharacters: CharacterWithRarity[], 
  rarities: Rarity[] 
}) {
  const [characters, setCharacters] = useState(initialCharacters)
  const [editingCharacter, setEditingCharacter] = useState<CharacterWithRarity | null>(null)

  const handleEdit = (character: CharacterWithRarity) => {
    setEditingCharacter(character)
  }

  const handleSave = async () => {
    if (!editingCharacter) return

    try {
      const response = await fetch('/api/characters', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCharacter),
      })

      if (response.ok) {
        const updatedCharacter = await response.json()
        setCharacters(characters.map(c => c.id === updatedCharacter.id ? updatedCharacter : c))
        setEditingCharacter(null)
      } else {
        console.error('Failed to save character')
      }
    } catch (error) {
      console.error('Error saving character:', error)
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Number</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Rarity</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {characters.map((character) => (
              <tr key={character.number}>
                <td className="border px-4 py-2">
                  <Image src={`/characters/small/${character.src}`} alt={character.nickname || ''} width={50} height={50} className="rounded-full" />
                </td>
                <td className="border px-4 py-2">{character.number}</td>
                <td className="border px-4 py-2">
                  <Link href={`/characters/${character.url}`} className="text-blue-500 hover:underline">
                    {character.nickname || `${character.firstName} ${character.lastName}`}
                  </Link>
                </td>
                <td className="border px-4 py-2">{character.rarity.name}</td>
                <td className="border px-4 py-2">
                  <Button onClick={() => handleEdit(character)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!editingCharacter} onOpenChange={() => setEditingCharacter(null)}>
        {editingCharacter && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Character</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="number" className="text-right">
                  Number
                </label>
                <Input
                  id="number"
                  value={editingCharacter.number}
                  onChange={(e) => setEditingCharacter({ ...editingCharacter, number: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="firstName" className="text-right">
                  First Name
                </label>
                <Input
                  id="firstName"
                  value={editingCharacter.firstName || ''}
                  onChange={(e) => setEditingCharacter({ ...editingCharacter, firstName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="lastName" className="text-right">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  value={editingCharacter.lastName || ''}
                  onChange={(e) => setEditingCharacter({ ...editingCharacter, lastName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="nickname" className="text-right">
                  Nickname
                </label>
                <Input
                  id="nickname"
                  value={editingCharacter.nickname || ''}
                  onChange={(e) => setEditingCharacter({ ...editingCharacter, nickname: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="src" className="text-right">
                  Image Source
                </label>
                <Input
                  id="src"
                  value={editingCharacter.src}
                  onChange={(e) => setEditingCharacter({ ...editingCharacter, src: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="url" className="text-right">
                  URL
                </label>
                <Input
                  id="url"
                  value={editingCharacter.url}
                  onChange={(e) => setEditingCharacter({ ...editingCharacter, url: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="rarity" className="text-right">
                  Rarity
                </label>
                <Select
                  value={editingCharacter.rarityId}
                  onValueChange={(value) => setEditingCharacter({ ...editingCharacter, rarityId: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    {rarities.map((rarity) => (
                      <SelectItem key={rarity.id} value={rarity.id}>
                        {rarity.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="value" className="text-right">
                  Value (JSON)
                </label>
                <Textarea
                  id="value"
                  value={JSON.stringify(editingCharacter.value, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsedValue = JSON.parse(e.target.value)
                      setEditingCharacter({ ...editingCharacter, value: parsedValue })
                    } catch (error) {
                      console.error('Invalid JSON:', error)
                    }
                  }}
                  className="col-span-3"
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}

