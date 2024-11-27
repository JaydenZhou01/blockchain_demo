import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {Button} from "@/components/ui/button";
import axios from "axios";

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

    const handleConfirmReceipt = (orderDetails: LocationState) => {
        console.log("Receipt confirmed for order:", orderDetails);

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

    const totalPrice = orders.reduce((sum, item) => sum + item.price * item.count, 0) + parseFloat(Fee)
    // The order is in the default "Prepare" stage
    const orderStages = ['Order Placed', 'Preparing your order...', 'On the way...', 'Enjoy your meal!']
    const [currentStage, setCurrentStage] = useState(0);
    const [progressPercentage, setProgressPercentage] = useState(0);

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
                                        className="text-right">${(item.price * item.count).toFixed(2)}</TableCell>
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
