
import React, { useState } from "react";
import { create } from "ipfs-http-client";
import {
  Bell, ChevronRight, MapPin, Settings, Tv
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const ipfs = create({ url: "http://127.0.0.1:5001" }); // Connect to local IPFS

export default function Component() {
  const [cid, setCid] = useState<string | null>(null);
  const [jsonData, setJsonData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to store JSON to IPFS
  const handleStoreJson = async () => {
    try {
      setError(null);
      const data = { name: "Sample JSON", description: "Stored in IPFS" };
      const file = Buffer.from(JSON.stringify(data));

      const added = await ipfs.add(file);
      setCid(added.path);
      setJsonData(JSON.stringify(data, null, 2)); // Show what was stored
    } catch (err) {
      console.error("Error storing JSON:", err);
      setError("Failed to store JSON in IPFS.");
    }
  };

  // Function to read JSON from IPFS
  const handleReadJson = async () => {
    if (!cid) {
      setError("No CID available to fetch.");
      return;
    }
    try {
      setError(null);
      const stream = ipfs.cat(cid);
      const decoder = new TextDecoder("utf-8");
      let content = "";

      for await (const chunk of stream) {
        content += decoder.decode(chunk);
      }

      setJsonData(content);
    } catch (err) {
      console.error("Error reading JSON from IPFS:", err);
      setError("Failed to fetch JSON from IPFS.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="mx-auto w-full max-w-md p-4">
        <h1 className="text-xl font-bold mb-4">Food Delivery App</h1>
        <Separator className="my-4" />
        <div className="space-y-4">
          <Button onClick={handleStoreJson} className="w-full bg-blue-500 text-white">
            Store JSON to IPFS
          </Button>
          <Button onClick={handleReadJson} className="w-full bg-green-500 text-white">
            Read JSON from IPFS
          </Button>
          {cid && (
            <div className="p-4 bg-gray-200 rounded">
              <strong>Stored CID:</strong> <code>{cid}</code>
            </div>
          )}
          {jsonData && (
            <div className="p-4 bg-gray-200 rounded">
              <strong>JSON Data:</strong>
              <pre>{jsonData}</pre>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
