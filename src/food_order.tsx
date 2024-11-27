import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Cookies from "js-cookie";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area"
import SidebarComponent from "@/Sidebar.tsx";


interface OrderItem {
    name: string;
    price: number;
    image: string;
    count: number;
}

interface Order {
    id: string;
    order: OrderItem[];
    des: string;
    time: string;
    fee: string;
    orderhash: string;
}

export default function FoodOrders() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleConfirm = (order: Order) => {
        navigate('/order', {
            state: {
                orders: order.order,
                address1: order.des,
                address2: '',
                time: order.time,
                Fee: order.fee,
                orderhash: order.orderhash,
            },
        });
    };
    const calculateTotal = (order: Order) => {
        const itemsTotal = order.order.reduce((sum, item) => sum + item.price, 0);
        return itemsTotal + parseFloat(order.fee);
    };

    const fetchOrders = async () => {
        const userLogin = Cookies.get("userLogin");
        if (userLogin) {
            const userInfo = JSON.parse(userLogin);
            try{
                const response=await axios.post('http://localhost:5000/getallorder', {name: userInfo.username});
            if (response.data.success) {
                const fetchedOrders: Order[] = response.data.message.map((order) => {
                    const parsedContent = JSON.parse(order.content)[0];
                    console.log('Parsed content:', parsedContent);
                    return {
                        id: order.id,
                        orderhash: order.orderhash,
                        order: parsedContent.order.map((item) => ({
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            count: item.count,
                        })), // Map the parsed content to the OrderItem array
                        des: parsedContent.des || '',
                        time: parsedContent.time || '',
                        fee: parsedContent.fee || '',
                    };
                });
                setOrders(fetchedOrders);
                console.log('Fetched orders:', fetchedOrders);
                } else {
                    setError('Failed to fetch orders');
                }
            } catch (error) {
                    console.error('Error fetching orders:', error);
                    setError('An error occurred while fetching orders');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('User not logged in');
                setLoading(false);
            }
        };

        useEffect(() => {
            fetchOrders();
        }, []);

        if (loading) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center text-red-500 p-4">
                    {error}
                </div>
            );
        }

    return (
        <div
            className="flex overflow-visible bg-white min-h-screen min-w-screen font-barlow">
            <SidebarComponent/>
            <div className="container mx-auto p-4">
                <Card className="w-full max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-orange-600">Your Food Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                            {orders.length === 0 ? (
                                <div className="flex justify-center items-center h-full">
                                    <p className="text-center text-gray-500">No orders found.</p>
                                </div>
                            ) : (
                                orders.map((order, index) => (
                                    <div
                                        key={order.orderhash || index}
                                        className="mb-4 p-4 border rounded-lg shadow-md"
                                    >
                                        <h3 className="text-lg font-semibold text-orange-600">
                                            Order #{order.id}
                                        </h3>
                                        <div className="mt-2 space-y-1 text-gray-700">
                                            <p>
                                                <strong>Delivery Address:</strong> {order.des}
                                            </p>
                                            <p>
                                                <strong>Delivery Time:</strong> {order.time}
                                            </p>
                                            <p>
                                                <strong>Total Price:</strong> $
                                                {calculateTotal(order).toFixed(2)}
                                            </p>
                                        </div>
                                        <Button
                                            onClick={() => handleConfirm(order)}
                                            className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2"
                                        >
                                            Confirm Order
                                        </Button>
                                    </div>
                                ))
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
            )
            }
