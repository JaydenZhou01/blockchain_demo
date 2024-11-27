import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

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
    const navigate = useNavigate()

    if (!state) {
        return <div>Loading...</div> // Or some error message
    }
    console.log(state)
    const handleStartDelivery = () => {
        // Add logic for confirming delivery start
        console.log("Delivery Start")
    }

    const handleBackToDashboard = () => {
        navigate('/Dhome') // Adjust the path as needed
    }
    const {id, pickup, des, timeRange, service, orderhash} = state

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
