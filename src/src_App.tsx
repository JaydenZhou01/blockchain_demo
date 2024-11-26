import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import DeliverySystemABI from './DeliverySystemABI.json';

/* declare global {
  interface Window {
    ethereum: any;
  }
} */

const contractAddress = ''; // TODO: Replace with your deployed contract address

function App() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string>('');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [orderId, setOrderId] = useState<string>('');
  const [restaurantAddress, setRestaurantAddress] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [restaurantAmount, setRestaurantAmount] = useState<string>('');
  const [deliveryAmount, setDeliveryAmount] = useState<string>('');

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);
          const accounts = await web3Instance.eth.getAccounts();
          setAccount("0x3dfe367AEafe83d25061EaF082C5CE235837F03a"); //customer
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

    initWeb3();
  }, []);

/*   const createOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contract && account) {
      try {
        const totalAmount = Web3.utils.toWei((parseFloat(restaurantAmount) + parseFloat(deliveryAmount)).toString(), 'ether');
        const id=await contract.methods.createOrder(
          restaurantAddress,
          deliveryAddress,
          Web3.utils.toWei(restaurantAmount, 'ether'),
          Web3.utils.toWei(deliveryAmount, 'ether')
        ).send({ from: account, value: totalAmount });
        console.log(id);
        alert('Order created successfully!');
      } catch (error) {
        console.error('Error creating order:', error);
        alert('Failed to create order. Check console for details.');
      }
    }
  }; */

  const createOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contract && account) {
      try {
        const totalAmount = Web3.utils.toWei((parseFloat(restaurantAmount) + parseFloat(deliveryAmount)).toString(), 'ether');
        
        // Send the transaction
        const receipt = await contract.methods.createOrder(
          restaurantAddress,
          deliveryAddress,
          Web3.utils.toWei(restaurantAmount, 'ether'),
          Web3.utils.toWei(deliveryAmount, 'ether')
        ).send({ from: account, value: totalAmount });

        // Check if the receipt contains events
        if (receipt.events && receipt.events.OrderCreated) {
          const orderCount = receipt.events.OrderCreated.returnValues.orderId;
          alert(`Order created successfully! Order Count: ${orderCount}`);
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

  const confirmFoodDelivery = async () => {
    if (contract && account) {
      try {
        await contract.methods.confirmFoodDelivery(orderId).send({ from: account });
        alert('Food delivery confirmed!');
      } catch (error) {
        console.error('Error confirming food delivery:', error);
        alert('Failed to confirm food delivery. Check console for details.');
      }
    }
  };

  const getOrderDetails = async () => {
    if (contract) {
      try {
        const order = await contract.methods.getOrder(orderId).call();
        setOrderDetails(order);
      } catch (error) {
        console.error('Error getting order details:', error);
        alert('Failed to get order details. Check console for details.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Three-Party Delivery System</h1>
            <p className="mb-4">Connected Account: {account}</p>
            
            <h2 className="text-xl font-semibold mb-4">Create Order</h2>
            <form onSubmit={createOrder} className="space-y-4 mb-6">
              <div>
                <label htmlFor="restaurantAddress" className="block text-sm font-medium text-gray-700">Restaurant Address</label>
                <input
                  type="text"
                  id="restaurantAddress"
                  value={restaurantAddress}
                  onChange={(e) => setRestaurantAddress(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">Delivery Address</label>
                <input
                  type="text"
                  id="deliveryAddress"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="restaurantAmount" className="block text-sm font-medium text-gray-700">Restaurant Amount (ETH)</label>
                <input
                  type="number"
                  id="restaurantAmount"
                  value={restaurantAmount}
                  onChange={(e) => setRestaurantAmount(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="deliveryAmount" className="block text-sm font-medium text-gray-700">Delivery Amount (ETH)</label>
                <input
                  type="number"
                  id="deliveryAmount"
                  value={deliveryAmount}
                  onChange={(e) => setDeliveryAmount(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Order
              </button>
            </form>

            <h2 className="text-xl font-semibold mb-4">Order Actions</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">Order ID</label>
                <input
                  type="number"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                onClick={confirmFoodPickup}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Confirm Food Pickup
              </button>
              <button
                onClick={confirmFoodDelivery}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Confirm Food Delivery
              </button>
              <button
                onClick={getOrderDetails}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Get Order Details
              </button>
            </div>

            {orderDetails && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Order Details:</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  {JSON.stringify(orderDetails, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

