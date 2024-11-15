'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download } from 'lucide-react'

export default function QRCodeGenerator() {
  const pathname = usePathname()
  const [url, setUrl] = useState('')

  useEffect(() => {
    // Combine the current pathname with the base URL
    const baseUrl = window.location.origin
    setUrl(`${baseUrl}${pathname}`)
  }, [pathname])

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code')
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = 'qrcode.png'
      downloadLink.href = `${pngFile}`
      downloadLink.click()
    }
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>QR Code Generator</CardTitle>
        <CardDescription>Generate a QR code for the current page URL</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="w-full">
          <Input 
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            placeholder="Enter URL" 
            className="w-full"
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-inner">
          <QRCodeSVG 
            id="qr-code"
            value={url} 
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={downloadQRCode} className="w-full">
          <Download className="mr-2 h-4 w-4" /> Download QR Code
        </Button>
      </CardFooter>
    </Card>
  )
}