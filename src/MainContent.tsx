import React from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

const categories = [
    { name: 'Bakery', icon: '/assets/icons/Baked.svg', link: '#' },
    { name: 'Burger', icon: '/assets/icons/Burger.svg', link: '#' },
    { name: 'Beverage', icon: '/assets/icons/Coffee.svg', link: '#' },
    { name: 'Chicken', icon: '/assets/icons/Chicken.svg', link: '#' },
    { name: 'Pizza', icon: '/assets/icons/Fast.svg', link: '#' },
    { name: 'Seafood', icon: '/assets/icons/Fish.svg', link: '#' },
]



const popularDishes = [
    {
        name: "Spicy seasoned seafood noodles",
        price: "DT5",
        discount: "15% Off",
        rating: 5,
        image: "/assets/popular_1.png",
        favorite: true,
        reviewLink: "#",
        reviewCount: 73,
    },
    {
        name: "Beef dumpling in sour soup",
        price: "DT7",
        discount: "15% Off",
        rating: 4,
        image: "/assets/popular_2.png",
        favorite: false,
        reviewLink: "#",
        reviewCount: 32,
    },
    {
        name: "Spicy instant noodle with omelette",
        price: "DT6.5",
        discount: "15% Off",
        rating: 5,
        image: "/assets/popular_3.png",
        favorite: false,
        reviewLink: "#",
        reviewCount: 56,
    },
    {
        name: "Spicy fried rice with omelet",
        price: "DT4",
        discount: "15% Off",
        rating: 5,
        image: "/assets/popular_4.png",
        favorite: false,
        reviewLink: "#",
        reviewCount: 46,
    },
    {
        name: "Salted Pasta with mushroom sauce",
        price: "DT3.5",
        discount: "15% Off",
        rating: 5,
        image: "/assets/popular_5.png",
        favorite: false,
        reviewLink: "#",
        reviewCount: 65,
    },
    {
        name: "Tom Yum Soup",
        price: "DT8",
        discount: "15% Off",
        rating: 5,
        image: "/assets/popular_6.png",
        favorite: false,
        reviewLink: "#",
        reviewCount: 35,
    }
]

const restaurants = [
    {
        name: "Food world",
        image: "/assets/restaurant_1.png",
        logo: "/assets/icons/restaurant_logo_1.png",
        likes: 114,
        deliveryTime: 30,
        discount: "15",
        openStatus: false,
        link: "#",
    },
    {
        name: "Donuts hut",
        image: "/assets/restaurant_2.png",
        logo: "/assets/icons/restaurant_logo_2.png",
        likes: 514,
        deliveryTime: 20,
        discount: "10",
        openStatus: true,
        link: "#",
    },
    {
        name: "Ruby Tue",
        image: "/assets/restaurant_3.png",
        logo: "/assets/icons/restaurant_logo_3.png",
        likes: 1919,
        deliveryTime: 40,
        discount: "20",
        openStatus: true,
        link: "#",
    }]

const MainContent = () => {
    return (
        <div className="flex-grow py-8 gap-4">
            {/* Banner */}
            <div
                className="relative max-w-full bg-yellow-400 rounded-lg px-5 py-4 text-white overflow-hidden bg-no-repeat bg-cover bg-banner">
                <div
                    className="relative z-10 px-6 flex flex-col md:flex-row items-center md:items-start justify-between">
                    <div className="z-10 max-w-xl mt-4">
                        <h2 className="text-3xl font-bold leading-tight">
                            Get Discount Up to 50% <br/>
                            on Your First Order
                        </h2>
                        <p className="text-sm mt-4">
                            Order your favorite food and get it delivered to your doorstep
                        </p>
                    </div>
                    <div className="relative mt-8 md:mt-0 md:ml-10">
                        <img loading="lazy" src="/assets/banner-food.png" alt="Banner Food"
                             className="w-64 h-auto object-cover relative z-0 -mb-24"/>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="py-8 self-stretch">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Category</h2>
                    <a href="#" className="text-yellow-500 font-medium hover:underline flex items-center">
                        View all <span className="ml-1 text-lg">›</span>
                    </a>
                </div>
                {/* Category Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {categories.map((category) => (
                        <a
                            key={category.name}
                            href={category.link}
                            className="bg-yellow-50 shadow-md rounded-lg flex flex-col items-center justify-center p-4 hover:shadow-lg transition"
                        >
                            <img src={category.icon} alt={category.name} className="w-12 h-12 mb-3"/>
                            <p className="text-sm font-medium text-gray-700">{category.name}</p>
                        </a>))}
                </div>
            </div>

            {/* Popular Dishes */}
            <div className="py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Popular Dishes</h2>
                    <a href="#" className="text-yellow-500 font-medium hover:underline flex items-center">
                        View all <span className="ml-1 text-lg">›</span>
                    </a>
                </div>
                {/* Dishes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                    {popularDishes.map((dish) => (
                        <div
                            key={dish.name}
                            className="flex flex-col mb-16 items-center bg-yellow-50 shadow-md rounded-lg p-4 relative hover:shadow-lg transition"
                        >
                            {/* Discount Badge */}
                            <span
                                className="absolute bottom-0 left-0 bg-red-500 text-white text-lg font-bold px-2 py-1.5 rounded-tr rounded-bl">
                                {dish.discount}
                            </span>

                            {/* Food Image */}
                            <img
                                src={dish.image}
                                alt={dish.name}
                                className="w-4/5 object-cover mb-4 -mt-16 z-10 rounded-full overflow-hidden"
                            />

                            {/* Rating */}
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{dish.rating}</p>
                                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                                >
                                    <span>{dish.reviewCount}</span> reviews
                                </a>

                            </div>

                            {/* Food Name */}
                            <h3 className="text-sm font-semibold text-gray-800 text-center w-1/2">
                                {dish.name}
                            </h3>

                            {/* Price */}
                            <p className="text-yellow-500 font-bold text-lg mt-1">{dish.price}</p>

                            {/* Add to Cart Button */}
                            <button onClick={async () => {
                try {
                    const userLogin = Cookies.get("userLogin");
                    if(userLogin){
                    const userInfo = JSON.parse(userLogin);
                    const response = await axios.post('http://localhost:5000/setdish', {
                        dishname: dish.name,  // ensure 'name' is correctly passed as 'username'
                        dishprice: dish.price,
                        dishimage:dish.image,
                        name:userInfo.username
                      });

                      if (response.data.success) {
                        window.location.reload();
                      } else {
                        alert('something went wrong');
                      }
                    }
                    } catch (error) {
                      console.error('Login failed:', error);

                    }
            }

                            }
                                className="absolute bottom-0 right-0 bg-yellow-500 text-white rounded-tl rounded-br flex items-center justify-center hover:bg-yellow-600">
                                <span className="text-base font-bold px-2 py-2">
                                    Add to Cart
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Restaurants */}
            <div className="py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Featured Restaurants</h2>
                    <a href="#" className="text-yellow-500 font-medium hover:underline flex items-center">
                        View all <span className="ml-1 text-lg">›</span>
                    </a>
                </div>
                {/* Restaurant Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
                    {restaurants.map((restaurant) => (
                        <div
                            key={restaurant.name}
                            className="bg-transparent rounded-lg shadow-md overflow-hidden transition hover:shadow-lg"
                        >
                            {/* Image */}
                            <div className="relative">
                                <img
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    className="w-full h-40 object-cover"
                                />

                                <div className="absolute top-2 left-2 flex space-x-2 font-bold">
                                    {/* Discount and Delivery Time Badge*/}
                                    <span
                                        className="bg-orange-500 text-white text-sm px-2 py-1 rounded flex items-center space-x-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m8.99 14.993 6-6m6 3.001c0 1.268-.63 2.39-1.593 3.069a3.746 3.746 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043 3.745 3.745 0 0 1-3.068 1.593c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 0 1-3.296-1.043 3.746 3.746 0 0 1-1.043-3.297 3.746 3.746 0 0 1-1.593-3.068c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.297 3.745 3.745 0 0 1 3.296-1.042 3.745 3.745 0 0 1 3.068-1.594c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.297 3.746 3.746 0 0 1 1.593 3.068ZM9.74 9.743h.008v.007H9.74v-.007Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                                        </svg>

                                        <span>{restaurant.discount}% Off</span>
                                    </span>
                                    <span
                                        className="bg-yellow-500 text-white text-sm px-2 py-1 rounded flex items-center space-x-1">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor"
                                             className="size-4">
                                              <path strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                        <span>{restaurant.deliveryTime} min</span>
                                    </span>
                                </div>
                            </div>

                            {/* Restaurant Info */}
                            <div className="p-4 flex items-start space-x-3 relative">
                                <img
                                    src={restaurant.logo}
                                    alt={`${restaurant.name} logo`}
                                    className="w-12 h-12 rounded-lg"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
                                    <div className="flex items-center text-yellow-500 text-sm mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 24 24"
                                             fill="red"
                                             className="size-6">
                                            <path
                                                d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                                        </svg>
                                        <span className="ms-1 text-base font-bold">{restaurant.likes}</span>

                                    </div>
                                </div>
                                <span
                                    className={`absolute top-1/2 right-4 transform -translate-y-1/2 inline-block text-base font-medium px-2 py-1 rounded ${
                                        restaurant.openStatus
                                            ? 'bg-green-300 text-green-600'
                                            : 'bg-orange-300 text-orange-600'
                                    }`}
                                >
            {restaurant.openStatus ? 'Open Now' : 'Closed'}
          </span>
                            </div>
                        </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};
export default MainContent;
