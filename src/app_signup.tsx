'use client'

import { useState, useEffect } from 'react'
import { Wallet, Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ethers } from 'ethers'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username: name,  // ensure 'name' is correctly passed as 'username'
        password: password,
        walletaddress:walletAddress
      });
  
      if (response.data.success) {
        navigate('/login');
      } else {
        if(response.data.message=="0"){
        alert("The user already exsits");
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
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-gradient-x"></div>
      <Card className="w-full max-w-md relative z-10 bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign Up for Delichain</CardTitle>
          <CardDescription className="text-center">
            Create an account and connect your wallet to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={(e) => { e.preventDefault();}}  className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Username</Label>
              <Input 
                id="name" 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
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
            </div>
            <Button onClick={handleSignUp} className="w-full bg-yellow-500 hover:bg-yellow-600">
              Sign Up
            </Button>
          </form>
          
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-600 mt-2 w-full">
            Already have an account?{' '}
            <a href="/login" className="text-yellow-600 hover:underline">
              Log in
            </a>
          </p>
        </CardFooter>
        <CardFooter>
          <p className="text-center text-sm text-gray-600 mt-2 w-full">
            Want to be a food deliveryman and get an award?{' '}
            <a href="/realname" className="text-yellow-600 hover:underline">
            Real name authentication
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

