import React, { useState,useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
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

export default function RatingPage() {
    const location = useLocation()
    const state = location.state as LocationState | null
    const navigate = useNavigate()
    const [deliverymanHKID, setDeliverymanHKID] = useState<string | null>(null)
    const [selectedRating, setSelectedRating] = useState(0)

    const updateStars = (rating: number) => {
        setSelectedRating(rating);
    };

    useEffect(() => {
        const fetchDeliverymanInfo = async () => {
            setLoading(true)
            try {
                // Get delivery information
                const deliveryResponse = await axios.post('http://localhost:5000/getdelivery2', { orderhash })
                if (deliveryResponse.data.success) {
                    const deliveryman = deliveryResponse.data.message.deliveryman

                    // Get HKID of the deliveryman
                    const hkidResponse = await axios.post('http://localhost:5000/getHKID2', { name: deliveryman })
                    if (hkidResponse.data.success) {
                        setDeliverymanHKID(hkidResponse.data.hkid)
                    } else {
                        throw new Error('Failed to get deliveryman HKID')
                    }
                } else {
                    throw new Error('Failed to get delivery information')
                }
            } catch (err) {
                console.error('Error fetching deliveryman info:', err)
                setError('Failed to fetch deliveryman information')
            } finally {
                setLoading(false)
            }
        }

        fetchDeliverymanInfo()
    }, [orderhash])

    const handleSubmit = async () => {
        if (selectedRating > 0 && deliverymanHKID) {
            setLoading(true)
            try {
                const currentScoreResponse = await axios.post('http://localhost:5000/getScore', {
                    HKID: deliverymanHKID
                })

                const currentScore = currentScoreResponse.data.score
                const newScore = currentScore + (selectedRating * 10)
                const response = await axios.post('http://localhost:5000/updateScore', {
                    HKID: deliverymanHKID,
                    score: newScore
                })

                if (response.data.success) {
                    alert('Thank you for your rating!')
                } else {
                    throw new Error('Failed to update score')
                }
            } catch (error) {
                console.error('Error updating score:', error)
                setError('There was an error updating the score. Please try again later.')
            } finally {
                setLoading(false)
            }
        } else {
            alert('Please select a rating before submitting.')
        }
    }

    const handleBackToDashboard = () => {
        navigate('/home')
    }
    if (!state) {
        return <div>Loading...</div> // Or some error message
    }
    const { orders, address1, address2, time, Fee, orderhash } = state
    const totalPrice = orders.reduce((sum, item) => sum + item.price * item.count, 0) + parseFloat(Fee)
    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4 space-y-4">
            <div className="w-full max-w-2xl">
                <div className="mb-6 text-4xl text-orange-600 font-bold">
                    Rate the delivery!
                </div>
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
                <CardFooter>
                    <div className="flex flex-col justify-center items-center w-full">
                        {/* Rating Stars */}
                        <div id="rating" className="flex space-x-2 mb-4">
                            {Array.from({length: 5}, (_, index) => (
                                <svg
                                    key={index}
                                    className={`w-8 h-8 cursor-pointer ${
                                        index < selectedRating ? 'text-yellow-400' : 'text-gray-400'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    onClick={() => updateStars(index + 1)}
                                >
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95 4.146.018c.958.004 1.355 1.226.584 1.818l-3.36 2.455 1.287 3.951c.3.922-.756 1.688-1.541 1.125L10 13.011l-3.353 2.333c-.785.563-1.841-.203-1.541-1.125l1.287-3.951-3.36-2.455c-.77-.592-.374-1.814.584-1.818l4.146-.018 1.286-3.95z"/>
                                </svg>
                            ))}
                        </div>

                        {/* Display the selected rating */}
                        <div id="rating-text" className="text-lg mb-4">
                            Rating: {selectedRating} star{selectedRating !== 1 ? 's' : ''}
                        </div>

                        <div className="flex gap-8 items-center justify-between">
                        {/* Submit Button */}
                        <Button
                            id="submit-btn"
                            className="bg-yellow-500 text-white hover:bg-yellow-600"
                            onClick={handleSubmit}
                        >
                            Submit Rating
                        </Button>

                        {/* Back to Dashboard Button */}
                        <Button
                            variant="outline"
                            onClick={handleBackToDashboard}
                            >
                            Back to Dashboard
                        </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
