import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import {MapPinIcon} from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Package } from 'lucide-react'

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const orders = [
    {
        id: "0x1234...5678",
        pickup: "123 Main St, Anytown, USA",
        destination: "456 Elm St, Othertown, USA",
        reward: "0.05 ETH"
    },
    {
        id: "0x2345...6789",
        pickup: "789 Oak Ave, Somewhere, USA",
        destination: "101 Pine Rd, Elsewhere, USA",
        reward: "0.07 ETH"
    },
    {
        id: "0x3456...7890",
        pickup: "202 Maple Dr, Heretown, USA",
        destination: "303 Birch Ln, Theretown, USA",
        reward: "0.06 ETH"
    },
    {
        id: "0x4567...8901",
        pickup: "404 Cedar Blvd, Nowhereville, USA",
        destination: "505 Spruce Ave, Somewhereville, USA",
        reward: "0.08 ETH"
    },
    {
        id: "0x5678...9012",
        pickup: "606 Redwood Ct, Thistown, USA",
        destination: "707 Sequoia Pl, Thattown, USA",
        reward: "0.09 ETH"
    }
]

const MainContent: React.FC = () => {
    const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(
        null
    );
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Replace with your API key
    });

    const handleTakeOrder = (orderId: string) => {
        console.log(`Order taken: ${orderId}`)
        // Here you would typically call a function to update the blockchain or your backend
    }

    // Function to get the user's current location
    const locateUser = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    const newPosition = {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude,
                    };
                    setPosition(newPosition);
                    if (map) {
                        map.panTo(newPosition); // Move the map center to the user's location
                        map.setZoom(15); // Set an appropriate zoom level
                    }
                },
                (err) => {
                    console.error('Error getting location:', err);
                    setError('Unable to fetch location. Please enable location services.');
                }
            );
        } else {
            setError('Geolocation is not supported by your browser.');
        }
    };

    // Automatically fetch location when the page loads
    useEffect(() => {
        locateUser();
    }, []);

    if (loadError) return <p>Error loading maps. Please check your API key.</p>;
    if (!isLoaded) return <p>Loading map...</p>;

    return (
        <div className="flex-grow min-h-screen">
            <div className="flex py-8 gap-4 relative">
                {error && <p className="text-red-500">{error}</p>}
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={position || {lat: 0, lng: 0}}
                    zoom={position ? 15 : 2}
                    onLoad={(mapInstance) => setMap(mapInstance)}
                >
                    {position && <Marker position={position}/>}
                </GoogleMap>

                {/* Locate Button */}
                <button
                    onClick={locateUser}
                    className="absolute right-2 top-1/3 z-10 bg-white text-gray-500 px-2.5 py-2.5 shadow-lg hover:bg-yellow-600"
                >
                    <MapPinIcon/>
                </button>
            </div>
            <div className="mt-4 text-start">
                <p className="text-base text-gray-600 mt-2">
                    Use the map above to view your current location or search for delivery routes. Click the location
                    button to center the map on your current position.
                </p>
            </div>
            <div className="flex justify-between items-center mb-6 mt-6">
                <h2 className="text-2xl font-bold text-gray-800">Orders Near You</h2>
                <a href="#" className="text-yellow-500 font-medium hover:underline flex items-center">
                    View all <span className="ml-1 text-lg">›</span>
                </a>
            </div>
            <Card className="w-full max-w-full mx-auto mt-6 rounded bg-orange-50">
                <CardContent className="p-4">
                    <ScrollArea className="h-[400px] w-full pr-4 pt-4">
                        {orders.map((order, index) => (
                            <React.Fragment key={order.id}>
                                {index > 0 && <Separator className="my-4"/>}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-semibold">Order #{index + 1}</h3>
                                        <Badge variant="secondary"
                                               className="bg-yellow-400 text-yellow-900 font-bold text-lg">
                                            {order.reward}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Hash ID: {order.id}</p>
                                    <div className="grid grid-cols-1 gap-2 mt-2">
                                        <div>
                                            <p className="text-sm font-medium">Pickup:</p>
                                            <p className="text-sm text-muted-foreground">{order.pickup}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Destination:</p>
                                            <p className="text-sm text-muted-foreground">{order.destination}</p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => handleTakeOrder(order.id)}
                                        className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white"
                                    >
                                        <Package className="mr-2 h-4 w-4"/> Take Order
                                    </Button>
                                </div>
                            </React.Fragment>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
        ;
};

export default MainContent;
