'use client'

import React, { useState,useEffect} from 'react'
import { Bell, ChevronRight, MapPin, Settings, Tv, DollarSign, Clock, Navigation, Wallet } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {Link, useNavigate} from "react-router-dom";
import { ethers } from 'ethers'
import Cookies from "js-cookie";
import axios from 'axios';

interface Order {
  image: string;
  name: string;
  count: number;
  price: number;
}

export default function Component() {
  const [isAccepted, setIsAccepted] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [orders, setOrders] = useState<Order[]>([]);
  const [time, setTime] = useState("");
  const [Award, setAward] = useState(1);
  const [pickup, setP] = useState("");
  const [des, setD] = useState("");
  const navigate = useNavigate()
  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setWalletAddress(address)
        console.log('Connected to wallet:', address)
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    } else {
      console.log('Please install MetaMask!')
    }
  }

  const fetchDelivery = async () => {
    const Dinfo = Cookies.get("DID");
    if(Dinfo){
      const content = JSON.parse(Dinfo);
      console.log("Content:",content);
    try {
      // Replace with your backend API endpoint
      const response = await axios.post('http://localhost:5000/getdelivery', {
        orderhash:content.orderhash
      });

      if (response.data.success) {
        var result=response.data.message;
        var data=JSON.parse(result[0].content);
        // console.log(data);
        setOrders(data[0].order);
        setAward(content.service);
        setTime(content.time);
        setP(content.p);
        setD(content.d);

      }
  }catch (error) {
    console.error('Login failed:', error);

  }
  };
}

    const handleAccept = () => {
      if (walletAddress) {
        setIsAccepted(true)
      } else {
        alert('Please connect your wallet first')
      }
    }

    const settle = async () => {
      const Dinfo = Cookies.get("DID");
      if(Dinfo){
        const content = JSON.parse(Dinfo);
        // console.log(content);
      try {
        // Replace with your backend API endpoint
        const response = await axios.post('http://localhost:5000/settledelivery', {
          orderhash:content.orderhash,
        });

        if (response.data.success) {
            console.log("settle delivery");
            navigate('/delivery', {
              state: {
              id:content.id,
              pickup:content.p,
              des:content.d,
              timeRange:content.time,
              service:content.service,
              orderhash:content.orderhash,}});
        }

    }catch (error) {
      console.error('Login failed:', error);

    }
    };
  }

   useEffect(() => {
    fetchDelivery();
  }, []);

  return (
      <div className="flex min-h-screen bg-white p-4">
        <div className="mx-auto w-full max-w-sm bg-white overflow-hidden">
          <header className="mb-6 flex items-center justify-between">
            <div className="flex gap-4">
              <Tv className="h-6 w-6 text-yellow-500"/>
              <Bell className="h-6 w-6 text-yellow-500"/>
              <Settings className="h-6 w-6 text-yellow-500"/>
            </div>
            <Link to="/login">
              <Avatar className="h-10 w-10">
                <AvatarImage alt="User" src="/placeholder.svg"/>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
          </header>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">New Delivery Offer</h2>
                <Card className="mb-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-300">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="text-sm text-white">Offer Amount</div>
                      <div className="text-3xl font-bold text-white">DT{Award.toFixed(2)}</div>
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
                      <MapPin className="h-5 w-5 text-gray-400"/>
                      <span>{pickup}</span>
                    </div>
                    <Button variant="ghost" className="text-yellow-500">
                      View on Explorer
                    </Button>
                  </div>
                  <Separator className="my-4"/>
                  <div className="mb-2 text-sm text-gray-500">Delivery Address</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-gray-400"/>
                      <span>{des}</span>
                    </div>
                    <Button variant="ghost" className="text-yellow-500">
                      View on Explorer
                    </Button>
                  </div>
                  <Separator className="my-4"/>
                  <div className="mb-2 text-sm text-gray-500">Time Range</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{time}</span>
                    </div>
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
                    <Button variant="outline" onClick={handleConnectWallet}>
                      <Wallet className="mr-2 h-4 w-4"/>
                      Connect
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                <div className="space-y-4 mb-6">
                {orders.length > 0 ? (
          orders.map((order, index) => (
            <OrderItem
              image={order.image}
              name={order.name}
              quantity={order.count}
              price={order.price}
            />
          ))
        ) : (
          <p className="text-gray-500">No food has been ordered</p>
        )}
                </div>

                <Separator className="my-6"/>

                <div className="mb-6 flex justify-between">
                  <span className="text-xl font-bold">Total Reward</span>
                  <span className="text-xl font-bold text-yellow-500">DT{Award.toFixed(2)}</span>
                </div>

                <div className="mb-4 rounded-lg border p-4">
                  <Button variant="ghost" className="w-full justify-between">
                    <div className="flex items-center gap-2">
                      <div className="rounded-md bg-yellow-100 p-2">
                        <Navigation className="h-4 w-4 text-yellow-500"/>
                      </div>
                      <span>View transaction details</span>
                    </div>
                    <ChevronRight className="h-5 w-5"/>
                  </Button>
                </div>

                <Button className="w-full bg-yellow-500 hover:bg-yellow-600" disabled={!isAccepted} onClick={settle}>
                {isAccepted ? 'Sign Transaction' : 'Accept to Sign'}
                </Button>
              </div>
            </div>
        </div>
      </div>
  )
}

function OrderItem({
  image,
  name,
  quantity,
  price,
}: {
  image: string
  name: string
  quantity: number
  price: number
}) {
  return (
    <div className="flex items-center gap-4">
      <img
        alt={name}
        className="h-16 w-16 rounded-full object-cover"
        src={image}
      />
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-500">x{quantity}</p>
      </div>
      <Clock className="h-5 w-5 text-gray-400" />
    </div>
  )
}

