import React, { useState,useEffect  } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import axios from 'axios';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import DeliverySystemABI from './DeliverySystemABI.json';

interface LocationState {
    id: string;
    pickup: string;
    des: string;
    timeRange: string;
    service: string;
    orderhash: string;
}
export default function DeliveryDetails() {
    const location = useLocation()
    const state = location.state as LocationState | null
    const {id, pickup, des, timeRange, service, orderhash} = state
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [contract, setContract] = useState<any>(null);
    const [account, setAccount] = useState<string>('');
    const [orderDetails, setOrderDetails] = useState<any>(null);
    const [orderId, setOrderId] = useState<string>('');
    const [restaurantAddress, setRestaurantAddress] = useState<string>('');
    const [deliveryAddress, setDeliveryAddress] = useState<string>('');
    const [restaurantAmount, setRestaurantAmount] = useState<string>('');
    const [deliveryAmount, setDeliveryAmount] = useState<string>('');
    const navigate = useNavigate()

    if (!state) {
        return <div>Loading...</div> // Or some error message
    }
    console.log(state);
    
    const initWeb3 = async () => {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          try {
            await window.ethereum.enable();
            setWeb3(web3Instance);
            const accounts = await web3Instance.eth.getAccounts();
            /* setAccount("0x3dfe367AEafe83d25061EaF082C5CE235837F03a"); //customer */
            setAccount("0x1F1CFfe2F1eCf378FD1c97F1c897f77F7C0F33Da"); //delivery
           /* setAccount("0xAa29B8Dc495A186A0acD240c415F2979A9E9623c"); */
            const contractInstance = new web3Instance.eth.Contract(
              DeliverySystemABI as AbiItem[],
              "0xaf55cC47Ac30a59976E2368EAB25959F2D69FFC6"
            );
            setContract(contractInstance);
          } catch (error) {
            console.error("Error initializing web3:", error);
          }
        } else {
          console.log('Please install MetaMask!');
        }
      };

    const confirmFoodPickup = async () => {
        if (contract && account) {
          try {
            await contract.methods.confirmFoodPickup(orderId).send({ from: account });
            alert('Food pickup confirmed!');
          } catch (error) {
            console.error('Error confirming food pickup:', error);
            alert('Failed to confirm food pickup. Check console for details.');
          }
        }
      };

    const handleStartDelivery = async() => {
        // Add logic for confirming delivery start
        try {
            // Replace with your backend API endpoint
            const response = await axios.post('http://localhost:5000/getdelivery', {
                orderhash:orderhash
            });
      
            if (response.data.success) {
            setOrderId(response.data.message.orderid);
            console.log(orderId);
            await confirmFoodPickup();
      
              navigate('/Dhome');
            }
        }catch (error) {
          console.error('Login failed:', error);
        }
        }
        console.log("Delivery Start");
    

    useEffect(() => {
        initWeb3();
      }, []);

    const handleBackToDashboard = () => {
        navigate('/Dhome') // Adjust the path as needed
    }
    

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4 space-y-4">
            <Card className="w-full max-w-2xl bg-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-orange-600">Delivery Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                        <div className="inline-flex items-baseline">
                            <strong>Order Hash:</strong>
                            <p className="text-sm ml-2">{orderhash}</p>
                        </div>
                        <p><strong>Pickup Address:</strong> {pickup}</p>
                        <p><strong>Destination Address:</strong> {des}</p>
                        <p><strong>Delivery Time:</strong> {timeRange}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleBackToDashboard}>Back to Dashboard</Button>
                    <Button variant="default" onClick={handleStartDelivery}>Start Delivery</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
