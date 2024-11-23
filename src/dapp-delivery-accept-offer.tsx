'use client'

import { useState } from 'react'
import { Bell, ChevronRight, MapPin, Settings, Tv, DollarSign, Clock, Navigation, Wallet } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export default function Component() {
  const [isAccepted, setIsAccepted] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')

  const handleAccept = () => {
    if (walletAddress) {
      setIsAccepted(true)
    } else {
      alert('Please connect your wallet first')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-yellow-500 p-4 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">dApp Delivery</h1>
            <div className="flex items-center gap-4">
              <Tv className="h-6 w-6" />
              <Bell className="h-6 w-6" />
              <Settings className="h-6 w-6" />
              <Avatar className="h-10 w-10">
                <AvatarImage alt="Driver" src="/placeholder.svg" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">New Delivery Offer</h2>
              <Card className="mb-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-300">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-sm text-white">Offer Amount</div>
                    <div className="text-3xl font-bold text-white">0.05 ETH</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" className="flex-1 items-center justify-center" onClick={handleAccept}>
                      Accept
                    </Button>
                    <Button variant="secondary" className="flex-1 items-center justify-center">
                      Decline
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="mb-6">
                <div className="mb-2 text-sm text-gray-500">Pickup Address</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span>0x1234...5678</span>
                  </div>
                  <Button variant="ghost" className="text-yellow-500">
                    View on Explorer
                  </Button>
                </div>
                <Separator className="my-4" />
                <div className="mb-2 text-sm text-gray-500">Delivery Address</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span>0x9876...4321</span>
                  </div>
                  <Button variant="ghost" className="text-yellow-500">
                    View on Explorer
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Connect Wallet</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter wallet address"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                  />
                  <Button variant="outline">
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Order Details</h2>
              <div className="space-y-4 mb-6">
                <OrderItem
                  name="CryptoPizza"
                  quantity={1}
                  tokenId="1234"
                />
                <OrderItem
                  name="NFTBurger"
                  quantity={2}
                  tokenId="5678"
                />
                <OrderItem
                  name="BlockchainSoda"
                  quantity={3}
                  tokenId="9101"
                />
              </div>

              <Separator className="my-6" />

              <div className="mb-2 flex justify-between">
                <span className="text-gray-600">Estimated Gas</span>
                <span className="font-medium">0.002 ETH</span>
              </div>
              <div className="mb-6 flex justify-between">
                <span className="text-xl font-bold">Total Reward</span>
                <span className="text-xl font-bold text-yellow-500">0.052 ETH</span>
              </div>

              <div className="mb-4 rounded-lg border p-4">
                <Button variant="ghost" className="w-full justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-yellow-100 p-2">
                      <Navigation className="h-4 w-4 text-yellow-500" />
                    </div>
                    <span>View transaction details</span>
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <Button className="w-full bg-yellow-500 hover:bg-yellow-600" disabled={!isAccepted}>
                {isAccepted ? 'Sign Transaction' : 'Accept to Sign'}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function OrderItem({
  name,
  quantity,
  tokenId,
}: {
  name: string
  quantity: number
  tokenId: string
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
        <DollarSign className="h-6 w-6 text-yellow-500" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
        <p className="text-xs text-gray-400">Token ID: {tokenId}</p>
      </div>
      <Clock className="h-5 w-5 text-gray-400" />
    </div>
  )
}