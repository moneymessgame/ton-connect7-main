'use client'

import { useState, useCallback } from 'react'
import { Character, Rarity } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from 'lucide-react'
import { updateCharacter } from './actions'

type CharacterWithRarity = Character & { rarity: Rarity }

type CharacterTableProps = {
  initialCharacters: CharacterWithRarity[]
  rarities: Rarity[]
  createCharacter: (data: any) => Promise<{ success: boolean; character?: CharacterWithRarity; error?: string }>
  deleteCharacter: (id: string) => Promise<{ success: boolean; error?: string }>
}

export default function CharacterTable({ 
  initialCharacters, 
  rarities,
  createCharacter,
  deleteCharacter
}: CharacterTableProps) {
  const [characters, setCharacters] = useState(initialCharacters)
  const [editingCharacter, setEditingCharacter] = useState<CharacterWithRarity | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [rarityFilter, setRarityFilter] = useState<string | null>(null)
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [showInfoDialog, setShowInfoDialog] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterWithRarity | null>(null)

  const filteredCharacters = characters
    .filter(character => 
      (character.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.nickname?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (rarityFilter === 'all' || character.rarityId === rarityFilter)
    )

  const paginatedCharacters = filteredCharacters.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const totalPages = Math.ceil(filteredCharacters.length / pageSize)

  const handleCreateOrUpdate = async () => {
    if (!editingCharacter) return

    const action = isCreating ? createCharacter : updateCharacter
    const result = await action(editingCharacter)

    if (result.success && result.character) {
      if (isCreating) {
        setCharacters([...characters, result.character])
      } else {
        setCharacters(characters.map(c => c.id === result.character!.id ? result.character! : c))
      }
      setEditingCharacter(null)
      setIsCreating(false)
    } else {
      console.error('Failed to save character:', result.error)
    }
  }

  const handleDelete = async (id: string) => {
    const result = await deleteCharacter(id)
    if (result.success) {
      setCharacters(characters.filter(c => c.id !== id))
    } else {
      console.error('Failed to delete character:', result.error)
    }
  }

  const openCreateDialog = () => {
    setIsCreating(true)
    setEditingCharacter({
      id: '',
      number: '',
      firstName: '',
      lastName: '',
      nickname: '',
      src: '',
      url: '',
      rarityId: rarities[0].id,
      value: {},
      rarity: rarities[0]
    } as CharacterWithRarity)
  }

  const openInfoDialog = useCallback((character: CharacterWithRarity) => {
    setSelectedCharacter(character)
    setShowInfoDialog(true)
  }, [])

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-4">
        <Input
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={rarityFilter || 'all'} onValueChange={(value) => setRarityFilter(value === 'all' ? null : value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by rarity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All rarities</SelectItem>
            {rarities.map((rarity) => (
              <SelectItem key={rarity.id} value={rarity.id}>{rarity.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Cards per page" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((size) => (
              <SelectItem key={size} value={size.toString()}>{size} per page</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={openCreateDialog}>Create New Character</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
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
            {paginatedCharacters.map((character) => (
              <tr key={character.id}>
                <td className="border px-4 py-2">
                  <Image src={character.src} alt={character.nickname || ''} width={50} height={50} className="rounded-full" />
                </td>
                <td className="border px-4 py-2">{character.number}</td>
                <td className="border px-4 py-2">
                  <Link href={`/characters/${character.url}`} className="text-blue-500 hover:underline">
                    {character.nickname || `${character.firstName} ${character.lastName}`}
                  </Link>
                </td>
                <td className="border px-4 py-2">{character.rarity.name}</td>
                <td className="border px-4 py-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openInfoDialog(character)}>
                        Info
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditingCharacter(character)}>
                        Change
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(character.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredCharacters.length)} of {filteredCharacters.length} characters
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog open={!!editingCharacter} onOpenChange={() => {
        setEditingCharacter(null)
        setIsCreating(false)
      }}>
        {editingCharacter && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isCreating ? 'Create Character' : 'Edit Character'}</DialogTitle>
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
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateOrUpdate}>{isCreating ? 'Create' : 'Save changes'}</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        {selectedCharacter && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedCharacter.nickname || `${selectedCharacter.firstName} ${selectedCharacter.lastName}`}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Image src={selectedCharacter
.src} alt={selectedCharacter.nickname || ''} width={200} height={200} className="rounded-full mx-auto" />
              <p><strong>Number:</strong> {selectedCharacter.number}</p>
              <p><strong>Rarity:</strong> {selectedCharacter.rarity.name}</p>
              <p><strong>URL:</strong> {selectedCharacter.url}</p>
              
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}

