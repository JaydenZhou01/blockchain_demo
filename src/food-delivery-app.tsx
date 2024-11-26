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
import {Link, useNavigate} from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';

interface Order {
  image: string;
  name: string;
  count: number;
  price: number;
}

export default function Component() {
  const [address1, setAddress1] = useState("Elm Street, 23");
  const [isEditing1, setIsEditing1] = useState(false); // Manage whether the text area is visible
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [Total, setTotal] = useState(1);
  const [address2, setAddress2] = useState("");
  const [isEditing2, setIsEditing2] = useState(false); // Manage whether the text area is visible
  const [Fee, setFee] = useState('1');
  const [isEditing3, setIsEditing3] = useState(false); // Manage whether the text area is visible
  const [time, setTime] = useState("14:00-15:00");
  const [showPicker, setShowPicker] = useState(false);
  const [tempStartTime, setTempStartTime] = useState("");
  const [tempEndTime, setTempEndTime] = useState("");

  const handleButtonClick = () => {
    setShowPicker(!showPicker);
  };

  const handleCloseClick = () => {
    // Update the displayed time range and close the picker
    setTime(`${tempStartTime || "00:00"} - ${tempEndTime || "23:59"}`);
    setShowPicker(false);
  };
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    const userLogin = Cookies.get("userLogin");
    if(userLogin){
      const userInfo = JSON.parse(userLogin);
    try {
      // Replace with your backend API endpoint
      const response = await axios.post('http://localhost:5000/getorder', {
        name:userInfo.username
      });

      if (response.data.success) {
        console.log(response.data.message);
        const result=JSON.parse(response.data.message);
        var totalprice=0;
        for(var i=0;i<result.length;i++){
          result[i].price=result[i].count*result[i].price;
          totalprice+=result[i].price;
        }
        totalprice=totalprice+parseFloat(Fee);
        setOrders(result);
        setLoading(false);
        setTotal(totalprice);
      }
  }catch (error) {
    console.error('Login failed:', error);

  }
  };
}

const settleorder= async () =>{
  const userLogin = Cookies.get("userLogin");
    if(userLogin){
      const userInfo = JSON.parse(userLogin);
    try {
      // Replace with your backend API endpoint
      const response = await axios.post('http://localhost:5000/setorder', {
        name:userInfo.username,
        order_list:orders,
        des1:address1,
        des2:address2,
        timerange:time,
        service:Fee
      });

      if (response.data.success) {
        const { orderhash } = response.data; // Extract orderhash from response

        console.log("data stored, orderhash:", orderhash);

        navigate('/order', {
          state: {
            orders,     // Pass the orders array
            address1,   // Pass the primary delivery address
            address2,   // Pass the secondary delivery address
            time,       // Pass the time range
            Fee,        // Pass the service fee
            orderhash   // Pass the unique order hash
          },
        });
      }
  }catch (error) {
    console.error('Login failed:', error);
  }
  }

}



const handleEditClick1 = () => {
  setIsEditing1(true); // Show the text area
};

// Handle changes in the text area
const handleAddressChange1 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  setAddress1(event.target.value); // Update the address state
};

// Handle saving the updated address
const handleSaveClick1 = () => {
  setIsEditing1(false); // Hide the text area
};

const handleEditClick2 = () => {
  setIsEditing2(true); // Show the text area
};

// Handle changes in the text area
const handleAddressChange2 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  setAddress2(event.target.value); // Update the address state
};

// Handle saving the updated address
const handleSaveClick2 = () => {
  setIsEditing2(false); // Hide the text area
};

const handleEditClick3 = () => {
  setIsEditing3(true); // Show the text area
};

// Handle changes in the text area
const handleAddressChange3 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  setFee(event.target.value);
};

// Handle saving the updated address
const handleSaveClick3 = () => {
  var price=Total+parseFloat(Fee)-1;
  setTotal(price);
  setIsEditing3(false); // Hide the text area
};
useEffect(() => {
  fetchOrders();
}, []);


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
              <div className="text-3xl font-bold text-white">DT12,000</div>
            </div>
{/*             <div className="flex gap-2">
              <Button variant="secondary" className="flex-1">
                Top Up
              </Button>
              <Button variant="secondary" className="flex-1">
                Transfer
              </Button>
            </div> */}
          </CardContent>
        </Card>

        <div className="mb-6">
          <div className="mb-2 text-sm text-gray-500">Your Address</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span>{address1}</span>
            </div>
            {isEditing1 ? (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={address1}
            onChange={handleAddressChange1}
            rows={4}
          />
          <div className="mt-2 flex gap-2">
            <Button variant="outline" className="text-yellow-500" onClick={handleSaveClick1}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex gap-2">
           <Button variant="ghost" className="text-yellow-500" onClick={handleEditClick1}>
              Change
            </Button>
        </div>
      )}
          </div>
          <p className="mt-2 text-sm text-gray-400">
            {address2}
          </p>
          <div className="mt-4 flex gap-2">
          {isEditing2 ? (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={address2}
            onChange={handleAddressChange2}
            rows={4}
          />
          <div className="mt-2 flex gap-2">
            <Button variant="outline" className="text-yellow-500" onClick={handleSaveClick2}>
              Save
            </Button>
          </div>
        </div>
      ) : (
           <Button variant="outline" size="sm" onClick={handleEditClick2}>
           Add Details
            </Button>
      )}


          </div>
          <div className="mb-2 text-sm text-gray-500">Time Range for Delivery</div>
          <p className="mt-2 text-sm text-gray-400">
            {time}
          </p>
          <Button variant="outline" size="sm"  onClick={handleButtonClick}>
             Choose Time Range
          </Button>
          {showPicker && (
        <div className="time-picker mt-2 p-4 border rounded shadow bg-white">
          <p className="text-sm text-gray-600">Select a Time Range:</p>
          <div className="flex gap-2 mt-2">
            <input
              type="time"
              id="start-time"
              value={tempStartTime}
              className="border p-1 rounded"
              onChange={(e) => setTempStartTime(e.target.value)}
            />
            <span className="text-gray-400">to</span>
            <input
              type="time"
              id="end-time"
              value={tempEndTime}
              className="border p-1 rounded"
              onChange={(e) => setTempEndTime(e.target.value)}
            />
          </div>
          <button
            onClick={handleCloseClick}
            className="mt-4 px-4 py-2 bg-gray-100 rounded text-sm"
          >
            Close
          </button>
        </div>
      )}
        </div>

        <h2 className="mb-4 text-2xl font-bold">Order Menu</h2>
        <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <OrderItem
              image={order.image}
              name={order.name}
              quantity={order.count}
              price={order.price}
            />
          ))
        ) : (
          <p className="text-gray-500">No food has been ordered</p>
        )}
        </div>

        <Separator className="my-6" />

        <div className="mb-2 flex justify-between">
          <span className="text-gray-600">Service</span>
          <span className="font-medium">DT{parseFloat(Fee).toFixed(2)}</span>
          {isEditing3 ? (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={Fee}
            onChange={handleAddressChange3}
            rows={4}
          />
          <div className="mt-2 flex gap-2">
            <Button variant="outline" className="text-yellow-500" onClick={handleSaveClick3}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <Button variant="ghost" className="text-yellow-500" onClick={handleEditClick3}>
        more fee?
         </Button>
      )}

        </div>
        <div className="mb-6 flex justify-between">
          <span className="text-xl font-bold">Total</span>
          <span className="text-xl font-bold text-yellow-500">DT{Total.toFixed(2)}</span>

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
        <Button className="w-full bg-yellow-500 hover:bg-yellow-600" onClick={settleorder}>Checkout</Button>
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
      <div className="text-lg font-medium text-yellow-500">+DT{price.toFixed(2)}</div>
    </div>
  )
}
