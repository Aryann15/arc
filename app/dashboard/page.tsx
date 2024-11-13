"use client";
import React, { useRef, useState, useEffect } from "react";
import { uploadBill } from "../actions/bill";

type Bill = {
  id: string;
  amount: number;
  description: string;
  createdAt: string;
  category?: {
    name: string;
  };
};


export default function Dashboard() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">ARC</h1>
          <p className="text-gray-500 text-sm">
            Easily manage your monthly expenses with our powerful app
          </p>
        </div>
        <button
          onClick={handleUploadClick}
          className={`px-4 py-2 rounded-md bg-white shadow-md hover:shadow-lg transition-shadow ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "+ Upload Bill"}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      </div>
)}


   