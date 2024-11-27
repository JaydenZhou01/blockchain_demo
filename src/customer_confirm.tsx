import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {Button} from "@/components/ui/button";
import axios from "axios";
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import DeliverySystemABI from './DeliverySystemABI.json';

interface OrderItem {
    image: string;
    name: string;
    count: number;
    price: number;
}

interface LocationState {
    orders: OrderItem[];
    address1: string;
    address2: string;
    time: string;
    Fee: string;
    orderhash: string;
}

export default function OrderDetails() {
    const location = useLocation()
    const state = location.state as LocationState | null
    const navigate = useNavigate()
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [contract, setContract] = useState<any>(null);
    const [account, setAccount] = useState<string>('');
    const [orderDetails, setOrderDetails] = useState<any>(null);
    const [orderId, setOrderId] = useState<string>('');
    const [restaurantAddress, setRestaurantAddress] = useState<string>('');
    const [deliveryAddress, setDeliveryAddress] = useState<string>('');
    const [restaurantAmount, setRestaurantAmount] = useState<string>('');
    const [deliveryAmount, setDeliveryAmount] = useState<string>('');

    const initWeb3 = async () => {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          try {
            await window.ethereum.enable();
            setWeb3(web3Instance);
            const accounts = await web3Instance.eth.getAccounts();
            setAccount("0x3dfe367AEafe83d25061EaF082C5CE235837F03a"); //customer
            /* setAccount("0x1F1CFfe2F1eCf378FD1c97F1c897f77F7C0F33Da"); */ //delivery
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

    const handleConfirmReceipt = async (orderDetails: LocationState) => {
        console.log("Receipt confirmed for order:", orderDetails);
        await confirmFoodDelivery();
        // Navigate to the `/rating` page with the provided order details
        navigate('/rating', {
            state: {
                orders: orderDetails.orders,
                address1: orderDetails.address1,
                address2: orderDetails.address2 || '', // Optional field
                time: orderDetails.time,
                Fee: orderDetails.Fee,
                orderhash: orderDetails.orderhash,
            },
        });
    };




    const handleBackToDashboard = () => {
        navigate('/home') // Adjust the path as needed
    }
    const { orders, address1, address2, time, Fee, orderhash } = state

    const totalPrice = orders.reduce((sum, item) => sum + item.price, 0) + parseFloat(Fee)
    // The order is in the default "Prepare" stage
    const orderStages = ['Order Placed', 'Preparing your order...', 'On the way...', 'Enjoy your meal!']
    const [currentStage, setCurrentStage] = useState(0);
    const [progressPercentage, setProgressPercentage] = useState(0);

    const confirmFoodDelivery = async () => {
        if (contract && account) {
            try {
                // Replace with your backend API endpoint
                const response = await axios.post('http://localhost:5000/getdelivery2', {
                    orderhash:orderhash
                });
          
                if (response.data.success) {
                setOrderId(response.data.message.orderid);
                console.log(response.data.message.orderid);
                await contract.methods.confirmFoodDelivery(response.data.message.orderid).send({ from: account });
          
                //navigate('/Dhome');
                }
            }catch (error) {
              console.error('Login failed:', error);
            }
        }
      };


    useEffect(() => {
        // Call checksettle API to get the delivery status
        const checkDeliveryStatus = async () => {
            try {
                const response = await axios.post('http://localhost:5000/checksettle', { orderhash });

                if (response.data.success) {
                    const settle = response.data.message; // Fetch settle value from the API response
                    console.log('Delivery status:', settle);
                    if (settle === 1) {
                        setCurrentStage(2);
                    } else {
                        setCurrentStage(1);
                    }
                } else {
                    console.error('Failed to fetch delivery status:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching delivery status:', error);
            }
        };

        checkDeliveryStatus();
        initWeb3();
    }, [orderhash]);

    // Update progress percentage whenever currentStage changes
    useEffect(() => {
        setProgressPercentage(((currentStage+1) / orderStages.length) * 100);
    }, [currentStage]);

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4 space-y-4">
            <div className="w-full max-w-2xl">
                <div className="mb-6 text-4xl text-orange-600 font-bold">
                    {orderStages[currentStage]}
                </div>
                <Progress value={progressPercentage} className="w-full"/>
            </div>
            <Card className="w-full max-w-2xl bg-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-orange-600">Order Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                        <div className="inline-flex items-baseline">
                            <strong>Order Hash:</strong>
                            <p className="text-sm ml-2">{orderhash}</p>
                        </div>
                        <p><strong>Delivery Address:</strong> {address1}{address2 ? `, ${address2}` : ''}</p>
                        <p><strong>Delivery Time:</strong> {time}</p>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Dish</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.count}</TableCell>
                                    <TableCell
                                        className="text-right">${item.price.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={2} className="font-medium">Delivery Fee</TableCell>
                                <TableCell className="text-right">${Fee}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2} className="font-bold text-lg">Total</TableCell>
                                <TableCell className="text-right font-bold text-lg text-orange-600">
                                    ${totalPrice.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleBackToDashboard}>Back to Dashboard</Button>
                    <Button
                        variant="default"
                        onClick={() => handleConfirmReceipt(state)}
                    >
                        Confirm Receipt
                    </Button>

                </CardFooter>
            </Card>
        </div>
    )
}
