'use client'

import * as React from 'react'
import { Home, MenuIcon as Restaurant, Star, MessageCircle, ClipboardList, CreditCard, Settings } from 'lucide-react'
import Cookies from "js-cookie";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from '@/components/ui/sidebar'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"

const menuItems = [
    { icon: Home, text: 'Dashboard', active: true },
    { icon: Restaurant, text: 'Food Order' },
    { icon: Star, text: 'Favorite' },
    { icon: MessageCircle, text: 'Message' },
    { icon: ClipboardList, text: 'Order History' },
    { icon: CreditCard, text: 'Bills' },
    { icon: Settings, text: 'Setting' },
]

export default function SidebarComponent() {
    const navigate = useNavigate();

    const switch_to = async () => {
        const userLogin = Cookies.get("userLogin");
        console.log(userLogin);
        if (userLogin) {
            const userInfo = JSON.parse(userLogin);
            console.log(userInfo.status);
            if(userInfo.status==1){
                navigate('/Dhome');
            }
            else{
                navigate('/realname');
            }
          }
      };

    return (
        <div className='pr-4 bg-white'>
            <SidebarProvider>
                <Sidebar variant='inset'>
                    <SidebarHeader onClick={switch_to} className="px-6 pt-6 pb-10 max-md:px-5">
                        <h1 className="text-3xl font-bold text-orange-500 text-center">
                            GoMeal<span className="text-orange-500">.</span>
                        </h1>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            {menuItems.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={item.active}
                                        className={`flex gap-4 items-center px-4 py-3 whitespace-nowrap rounded-md text-xl ${item.active
                                            ? 'text-zinc bg-yellow-100 shadow-md'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <a href="#" className="flex items-center gap-4 w-full">
                                            <item.icon className={`w-8 h-8 ${item.active ? 'text-yellow-500' : 'text-gray-600'}`} />
                                            <span className="truncate">{item.text}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        </div>

    )
}
