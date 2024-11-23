import React from 'react'
import { Button } from "@/components/ui/button"
import {useNavigate} from "react-router-dom";

const services = [
    {
        id: 1,
        title: 'Business Services',
        description:
            'Offering home delivery around the city, where your products will be at your doorstep within 48-72 hours.',
        icon: './assets/services-1.svg',
        features: ['Corporate goods', 'Shipment', 'Accessories'],
   },
    {
        id: 2,
        title: 'Statewide Services',
        description:
            'Offering home delivery around the city, where your products will be at your doorstep within 48-72 hours.',
        icon: './assets/services-2.svg',
        features: ['Unlimited Bandwidth', 'Encrypted Connection', 'Yes Traffic Logs'],
    },
    {
        id: 3,
        title: 'Personal Services',
        description:
            'You can trust us to safely deliver your most sensitive documents to the specific area in a short time.',
        icon: './assets/services-3.svg',
        features: ['Unlimited Bandwidth', 'Encrypted Connection', 'Yes Traffic Logs'],
    },
];

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate('/login');
    };
    return (
        <div
            className="absolute font-raleway top-0 left-0 w-full min-h-full bg-cover bg-center bg-no-repeat bg-custom-landing overflow-hidden z-0"
            >
            <div className="relative z-10">
                {/* Header */}
                <header className="container mx-auto px-16 py-8 bg-white/30 backdrop-blur-md fixed">
                    <nav className="flex items-center justify-between">
                        <a
                            href="#"
                            className="text-4xl font-bold text-orange-500"
                        >
                            Delichain
                        </a>

                        <div className="hidden md:flex items-center space-x-6">
                            <a href="/"
                               className="text-lg text-gray-700 hover:text-orange-500 transition-colors">Home</a>
                            <a href="#services"
                               className="text-lg text-gray-700 hover:text-orange-500 transition-colors">Our
                                Services</a>
                            <a href="#" className="text-lg text-gray-700 hover:text-orange-500 transition-colors">Find
                                Us</a>
                            <Button
                                className="bg-orange-500 text-white hover:bg-orange-600 text-lg px-4 py-2 " onClick={handleGetStarted}>Login</Button>
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="container mx-auto px-4 py-16 flex items-center min-h-screen">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        {/* Left Column */}
                        <div className="flex-1 space-y-6">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-800 leading-tight font-raleway">
                                Your Next Meal,
                                Powered by
                                <br/>
                                <span className="font-extrabold text-gray-800">Transparency and Trust</span>
                            </h1>
                            <p className="text-2xl text-gray-600">
                                Order, deliver, and connect with a trusted community
                                <br/>
                                on a decentralized platform built for transparency, and excellence.
                            </p>
                            <Button className="bg-orange-500 text-white hover:bg-orange-600 text-xl font-light py-4 rounded mt-8" onClick={handleGetStarted}>
                                Get started →
                            </Button>
                        </div>

                        {/* Right Column */}
                        <div className="flex-1">
                            <img className="pt-28 md:pt-0 w-full" src="./assets/hero.png"
                                 alt="illustration"/>
                        </div>
                    </div>
                </main>
            </div>
            <div className="container mx-auto px-4 py-12" id="services">
                {/* Services Section */}
                <div className="flex justify-center">
                    <div className="w-full md:w-2/3 lg:w-5/12 text-center mb-8">
                        <h5 className="text-red-600 uppercase text-lg font-extrabold">SERVICES</h5>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2">Our services for you</h2>
                    </div>
                </div>
                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {services.map((service) => (
                        <div key={service.id} className="pt-6 px-4 lg:px-8">
                            <div className="bg-white shadow-lg rounded-lg h-full p-6 flex flex-col justify-between">
                                {/* Icon and Title */}
                                <div className="text-center mb-4 mt-8">
                                    <img
                                        className="mx-auto h-16 w-16"
                                        src={service.icon}
                                        alt={`${service.title} Icon`}
                                    />
                                    <h5 className="my-4 text-xl font-semibold text-gray-800">{service.title}</h5>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-6 mx-6">{service.description}</p>

                                {/* Features List */}
                                <ul className="list-none space-y-4 mb-10 mx-6">
                                    {service.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                    <span className="mr-2">
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                    </span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Button */}
                                <div className="text-center">
                                    <button className="px-4 py-2 rounded transitions w-4/5 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                                        Learn more
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="bg-white dark:bg-gray-900">
                <div className="contain pb-0 pt-12">
                    <div className="flex flex-col items-center text-center">
                        <a
                            href="#"
                            className="text-4xl font-bold text-orange-500"
                        >
                            Delichain
                        </a>
                        <div className="flex flex-wrap justify-center mt-6 -mx-4">
                            <a href="#"
                               className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-orange-500 dark:text-gray-300 dark:hover:text-blue-400"> Home </a>

                            <a href="#"
                               className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-orange-500 dark:text-gray-300 dark:hover:text-blue-400"> About </a>

                            <a href="#"
                               className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-orange-500 dark:text-gray-300 dark:hover:text-blue-400"> Privacy </a>

                        </div>
                        <hr className="my-0 border-gray-200 md:my-2 dark:border-gray-700"/>
                        <p className= "text-sm text-gray-500 dark:text-gray-300">
                            Made with {" "}
                            <a href="https://tailwindcss.com/" className="text-orange-500 hover:underline">Tailwind CSS</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
