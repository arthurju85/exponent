"use client"

import dynamic from 'next/dynamic'

const GenesisClient = dynamic(() => import('./client'), { ssr: false })

export default function GenesisWrapper() {
  return <GenesisClient />
}
