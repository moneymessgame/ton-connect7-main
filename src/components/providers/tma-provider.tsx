"use client"

import { ReactNode } from "react"

import { SDKProvider } from "@telegram-apps/sdk-react"

function TmaProvider({
    children,
}: Readonly<{
    children: ReactNode
}>) {

    return (
        <SDKProvider>
            {children}
        </SDKProvider>
    )
}
  
export default TmaProvider