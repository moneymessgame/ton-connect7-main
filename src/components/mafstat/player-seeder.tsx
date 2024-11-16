'use client'

import { useState } from 'react'
import { seedPlayers } from '@/actions/seed-players'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function PlayerSeeder() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const result = await seedPlayers(formData)
      setResult(result)
    } catch (error) {
      setResult({ success: false, message: 'An error occurred while seeding the database.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Player Seeder</CardTitle>
        <CardDescription>Upload a JSON file to seed player data into the database.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>
          <Button type="submit" disabled={!file || isLoading} className="w-full">
            {isLoading ? 'Seeding...' : 'Seed Players'}
          </Button>
        </form>
        {result && (
          <div className={`mt-4 p-4 rounded-md ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
            {result.success ? (
              <CheckCircle2 className="inline-block mr-2 text-green-600" />
            ) : (
              <AlertCircle className="inline-block mr-2 text-red-600" />
            )}
            {result.message}
          </div>
        )}
      </CardContent>
    </Card>
  )
}