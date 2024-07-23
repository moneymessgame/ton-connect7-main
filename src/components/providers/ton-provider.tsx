"use client"

import { ReactNode } from "react"

import {
    type ActionConfiguration,
    TonConnectUIProvider,
} from "@tonconnect/ui-react"

function TonProvider({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    
    console.log(process.env.NEXT_PUBLIC_TONCONNECT_MANIFEST_URL)

    return (
        <TonConnectUIProvider
            manifestUrl={`${process.env.NEXT_PUBLIC_TONCONNECT_MANIFEST_URL}`}
            actionsConfiguration={{
                twaReturnUrl: process.env
                .NEXT_PUBLIC_TWA_URL as ActionConfiguration["twaReturnUrl"],
            }}
        >
            {children}
        </TonConnectUIProvider>
    )
}
  
export default TonProvider