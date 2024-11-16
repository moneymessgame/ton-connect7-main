'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

type Role = {
  id: number
  text: string
  url: string
  team: string
  value: any
  player: any[]
}

export default function RoleCards({ roles }: { roles: Role[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {roles.map((role) => (
        <RoleCard key={role.id} role={role} />
      ))}
    </div>
  )
}

function RoleCard({ role }: { role: Role }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{role.text}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">Team: {role.team}</p>
        <a href={role.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Role URL
        </a>
      </CardContent>
      <CardFooter className="flex-grow flex flex-col justify-end">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full mb-2">
              {isOpen ? 'Hide Details' : 'Show Details'}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2 space-y-2">
              <h4 className="font-semibold">Value:</h4>
              <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                {JSON.stringify(role.value, null, 2)}
              </pre>
              <h4 className="font-semibold">Players:</h4>
              {role.player.length > 0 ? (
                <ul className="list-disc list-inside">
                  {role.player.map((player: any) => (
                    <li key={player.id}>{player.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No players assigned</p>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Badge>{role.player.length} Player(s)</Badge>
      </CardFooter>
    </Card>
  )
}