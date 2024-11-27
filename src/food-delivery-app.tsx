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
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import DeliverySystemABI from './DeliverySystemABI.json';
import { ethers } from 'ethers'

interface Order {
  image: string;
  name: string;
  count: number;
  price: number;
}

export default function Component() {
  const [userName, setUserName] = useState("U");
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
  //handle the blockchain effect
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any>(null);
  const account="0x3dfe367AEafe83d25061EaF082C5CE235837F03a";
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [orderId, setOrderId] = useState<string>('');
  const restaurantAddress="0xAa29B8Dc495A186A0acD240c415F2979A9E9623c";
  const deliveryAddress="0x1F1CFfe2F1eCf378FD1c97F1c897f77F7C0F33Da";
  const [restaurantAmount, setRestaurantAmount] = useState<string>('');
  const [deliveryAmount, setDeliveryAmount] = useState<string>('');
  const [oid, setOid] = useState('1');
  const [balance, setBalance] = useState<string | null>(null)

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
        await setRestaurantAmount(totalprice.toFixed(2));
        totalprice=totalprice+parseFloat(Fee);
        setOrders(result);
        setTotal(totalprice);

        await setDeliveryAmount(Fee);
        console.log(restaurantAmount);
        console.log(deliveryAmount);
      }
  }catch (error) {
    console.error('Login failed:', error);

  }
  };
}

const initWeb3 = async () => {
  if (window.ethereum) {
    const web3Instance = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      setWeb3(web3Instance);
      const accounts = await web3Instance.eth.getAccounts();
     /*  setAccount("0x3dfe367AEafe83d25061EaF082C5CE235837F03a"); //customer */
     /*  setAccount("0x1F1CFfe2F1eCf378FD1c97F1c897f77F7C0F33Da"); //delivery */
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

const getAmount  = async () => {
  
const balanceWei = await contract.methods.getBalance(account);
console.log(parseInt(balanceWei));
const balanceEth = ethers.utils.formatEther(balanceWei);
setBalance(balanceEth);
}
      
const createOrder = async () => {
  if (contract && account) {
    try {
      const totalAmount = Web3.utils.toWei((parseFloat(restaurantAmount) + parseFloat(deliveryAmount)).toFixed(2), 'ether');
      // Send the transaction
      console.log(totalAmount);
      const receipt = await contract.methods.createOrder(
        restaurantAddress,
        deliveryAddress,
        Web3.utils.toWei(restaurantAmount, 'ether'),
        Web3.utils.toWei(deliveryAmount, 'ether')
      ).send({ from: account, value: totalAmount });

      // Check if the receipt contains events
      if (receipt.events && receipt.events.OrderCreated) {
        const orderCount = receipt.events.OrderCreated.returnValues.orderId;
        console.log(parseInt(orderCount),typeof orderCount);
        Cookies.set("oid", JSON.stringify({oid:parseInt(orderCount)}), { expires: 7 });
        //setOid(orderCount);

        //alert(`Order created successfully! Order Count: ${orderCount}`);
      } else {
        console.log('Full receipt:', receipt);
        alert('Order created successfully, but order count not found in the event. Check console for full receipt.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Check console for details.');
    }
  }
};

const settleorder= async () =>{
  const userLogin = Cookies.get("userLogin");

    if(userLogin){
      const userInfo = JSON.parse(userLogin);
    try {
      // Replace with your backend API endpoint
      await createOrder();
      console.log(oid);
      const ido=Cookies.get("oid");
      if(ido){
      const id_d = JSON.parse(ido);
      const response = await axios.post('http://localhost:5000/setorder', {
        name:userInfo.username,
        order_list:orders,
        des1:address1,
        des2:address2,
        timerange:time,
        service:Fee,
        orderid:id_d.oid
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
  initWeb3();
  getAmount();
}, []);


  return (
    <div className="flex-grow min-h-screen bg-white">
      <div className="mx-auto w-full max-w-md overflow-hidden p-4">
        {/*<header className="mb-6 flex items-center justify-between">*/}
        {/*  <div className="flex gap-4">*/}
        {/*    <Tv className="h-6 w-6 text-yellow-500" />*/}
        {/*    <Bell className="h-6 w-6 text-yellow-500" />*/}
        {/*    <Settings className="h-6 w-6 text-yellow-500" />*/}
        {/*  </div>*/}
        {/*  <Link to="/login">*/}
        {/*  <Avatar className="h-10 w-10">*/}
        {/*    <AvatarImage alt="User" src="/placeholder.svg" />*/}
        {/*    <AvatarFallback>U</AvatarFallback>*/}
        {/*  </Avatar>*/}
        {/*  </Link>*/}
        {/*</header>*/}

        <h2 className="mb-4 text-2xl font-bold">Your Balance</h2>
        <Card className="mb-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-300">
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="text-sm text-white">Balance</div>
              <div className="text-3xl font-bold text-white">DT{balance}</div>
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
