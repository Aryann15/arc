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
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryTotal[]>([]);

  const categoryColors: Record<string, string> = {
    Food: "rgb(129, 201, 149)",
    Transport: "rgb(244, 114, 96)",
    Utilities: "rgb(41, 98, 114)",
    Entertainment: "rgb(241, 196, 99)",
    Healthcare: "rgb(116, 185, 255)",
    Others: "rgb(162, 162, 162)",
    Groceries: "rgb(255, 178, 102)",
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const fetchBills = async () => {
    try {
      const response = await fetch("/api/bills");
      const data = await response.json();
      setBills(data);
      const categoryTotals: Record<string, number> = {};
      let totalExpense = 0;
      data.forEach((bill: Bill) => {
        const categoryName = bill.category?.name || "Others";
        categoryTotals[categoryName] =
          (categoryTotals[categoryName] || 0) + bill.amount;
        totalExpense += bill.amount;

        const categoryData: CategoryTotal[] = Object.entries(categoryTotals).map(
          ([name, total]) => ({
            name,
            total,
            percentage: totalExpense > 0 ? (total / totalExpense) * 100 : 0,
            color: categoryColors[name] || "rgb(162, 162, 162)",
          })
        );
      })
      categoryData.sort((a, b) => b.percentage - a.percentage);

      setCategories(categoryData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching bills:", error);
      setIsLoading(false);
    }
  };


  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadBill(formData);

      if (result.success) {
        // Refresh the bills list
        fetchBills();
      } else {
        console.error("Upload failed:", result.error);
      }
    } catch (error) {
      console.error("Error during upload:", error);
    } finally {
      setIsUploading(false);
    }
  };
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
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Expense Categories</h2>
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <p>Loading categories...</p>
            </div> ):(
               <>
               <div className="relative" style={{ paddingBottom: "100%" }}>
                 <svg viewBox="0 0 100 100" className="absolute inset-0">
                   {categories.map((category, index) => {
                     const previousSlices = categories.slice(0, index);
                     const startAngle = previousSlices.reduce(
                       (acc, slice) => acc + slice.percentage * 3.6,
                       0
                     );
                     const endAngle = startAngle + category.percentage * 3.6;
 
                     const startRadians = ((startAngle - 90) * Math.PI) / 180;
                     const endRadians = ((endAngle - 90) * Math.PI) / 180;
 
                     const x1 = 50 + 40 * Math.cos(startRadians);
                     const y1 = 50 + 40 * Math.sin(startRadians);
                     const x2 = 50 + 40 * Math.cos(endRadians);
                     const y2 = 50 + 40 * Math.sin(endRadians);
 
                     const largeArcFlag = category.percentage > 50 ? 1 : 0;
 
                     const d = [
                       `M 50 50`,
                       `L ${x1} ${y1}`,
                       `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                       "Z",
                     ].join(" ");
 
                     return (
                       <path key={category.name} d={d} fill={category.color} />
                     );
                   })}
                 </svg>
               </div>
            )}
      </div>
)}


   