'use client'
 'type="submit"'
declare global {
  interface Window {
    ethereum?: any;
  }
}

import { useState, useEffect } from 'react'
import { Wallet, Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ethers } from 'ethers'
import axios from 'axios';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Component() {
  const [walletAddress, setWalletAddress] = useState('')
  const [realName, setRealName] = useState('')
  const [hkid, setHkid] = useState('')
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/real', {
        realname: realName,  // ensure 'name' is correctly passed as 'username'
        HKID: hkid,
        walletaddress:walletAddress
      });
  
      if (response.data.success) {
        navigate('/login');
      } else {
        if(response.data.message=="0"){
        alert("The user does not exsits");
        }
        else{
          alert("please provide the right infromation");
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
  
    }
  };

  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
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



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-gradient-x"></div>
      <Card className="w-full max-w-md max-w-md relative z-10 bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Delichain</CardTitle>
          <CardDescription className="text-center">
            Enter your real name and HKID to be a food deliveryman and get an award
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form  onSubmit={(e) => { e.preventDefault();}} className="space-y-4">
          <div className="space-y-2">
              <Label htmlFor="realName">Real Name</Label>
              <Input 
                id="realName" 
                type="text"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hkid">HKID</Label>
              <Input 
                id="hkid" 
                 type="text"
                value={hkid}
                onChange={(e) => setHkid(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
            <Label htmlFor="wallet">connect your wallet</Label>
            <div className="flex space-x-2">
              <Input 
                id="wallet" 
                type="text" 
                placeholder="Wallet Address" 
                value={walletAddress}
              />
              <Button onClick={handleConnectWallet} className="bg-yellow-500 hover:bg-yellow-600">
                <Wallet className="mr-2 h-4 w-4" />
                Connect
              </Button>
            </div>
          </div>
            <Button onClick={handleSignUp}  className="w-full bg-yellow-500 hover:bg-yellow-600">
              Get Start!
            </Button>
          </form>
          
          <Separator className="my-4" />
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-600 mt-2 w-full">
            Don&apos;t want to be a deliveryman now{' '}
            <Link to="/login" className="text-yellow-600 hover:underline">
                   Skip
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

