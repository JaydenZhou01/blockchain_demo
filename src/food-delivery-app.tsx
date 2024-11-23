import { Bell, ChevronRight, MapPin, Settings, Tv } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { create } from "ipfs-http-client";
import React, { useState,useEffect  } from "react";
import { Buffer } from "buffer";
import Loginpage from "./app_login.tsx";
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';

export default function Component() {
  const [address, setAddress] = useState<string>("Elm Street, 23");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    const userLogin = Cookies.get("userLogin");
    if(userLogin){
      const userInfo = JSON.parse(userLogin);
    try {
      // Replace with your backend API endpoint
      const response = await axios.post('http://localhost:5000/getorder', {
        walletaddress:userInfo.walletadress
      });

      if (response.data.success) {
        setOrders(response.data.message);
        setLoading(false);
      } 
  }catch (error) {
    console.error('Login failed:', error);

  }
  };
} 




  return (
    <div className="flex-grow min-h-screen bg-white">
      <div className="mx-auto w-full max-w-md overflow-hidden p-4">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex gap-4">
            <Tv className="h-6 w-6 text-yellow-500" />
            <Bell className="h-6 w-6 text-yellow-500" />
            <Settings className="h-6 w-6 text-yellow-500" />
          </div>
          <Link to="/login">
          <Avatar className="h-10 w-10">
            <AvatarImage alt="User" src="/placeholder.svg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          </Link>
        </header>

        <h2 className="mb-4 text-2xl font-bold">Your Balance</h2>
        <Card className="mb-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-300">
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="text-sm text-white">Balance</div>
              <div className="text-3xl font-bold text-white">$12,000</div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1">
                Top Up
              </Button>
              <Button variant="secondary" className="flex-1">
                Transfer
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <div className="mb-2 text-sm text-gray-500">Your Address</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span>Elm Street, 23</span>
            </div>
            <Button variant="ghost" className="text-yellow-500">
              Change
            </Button>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </p>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm">
              Add Details
            </Button>
            <Button variant="outline" size="sm">
              Add Note
            </Button>
          </div>
        </div>

        <h2 className="mb-4 text-2xl font-bold">Order Menu</h2>
        <div className="space-y-4">
          <OrderItem
            image="/placeholder.svg"
            name="Pepperoni Pizza"
            quantity={1}
            price={5.59}
          />
          <OrderItem
            image="/placeholder.svg"
            name="Cheese Burger"
            quantity={1}
            price={5.59}
          />
          <OrderItem
            image="/placeholder.svg"
            name="Vegan Pizza"
            quantity={1}
            price={5.59}
          />
        </div>

        <Separator className="my-6" />

        <div className="mb-2 flex justify-between">
          <span className="text-gray-600">Service</span>
          <span className="font-medium">$1.00</span>
        </div>
        <div className="mb-6 flex justify-between">
          <span className="text-xl font-bold">Total</span>
          <span className="text-xl font-bold text-yellow-500">$202.00</span>
        </div>

        <div className="mb-4 rounded-lg border p-4">
          <Button variant="ghost" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-yellow-100 p-2">
                <div className="h-4 w-4 rounded bg-yellow-500" />
              </div>
              <span>Have a coupon code?</span>
            </div>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        <Button className="w-full bg-yellow-500 hover:bg-yellow-600">Checkout</Button>
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
      <div className="text-lg font-medium text-yellow-500">+${price.toFixed(2)}</div>
    </div>
  )
}
