"use client";
import React, { useRef, useState, useEffect } from "react";
import { uploadBill } from "../actions/bill";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Upload, Wallet, TrendingUp, Calendar, Filter, Download } from 'lucide-react';


type Bill = {
  id: string;
  amount: number;
  description: string;
  createdAt: string;
  category?: {
    name: string;
  };
};

type CategoryTotal = {
  name: string;
  total: number;
  color: string;
  percentage: number;
};

type WeeklyExpense = {
  week: string;
  total: number;
};

export default function Dashboard() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [bills, setBills] = useState<Bill[]>([]);
  const [categories, setCategories] = useState<CategoryTotal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [weeklyExpenses, setWeeklyExpenses] = useState<WeeklyExpense[]>([]);


  const categoryColors: Record<string, string> = {
    Food: "rgb(129, 201, 149)",
    Transport: "rgb(244, 114, 96)",
    Utilities: "rgb(41, 98, 114)",
    Entertainment: "rgb(241, 196, 99)",
    Healthcare: "rgb(116, 185, 255)",
    Others: "rgb(162, 162, 162)",
    Groceries: "rgb(255, 178, 102)",
  };

  const getWeekDetails = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Set to Sunday

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Saturday

    return {
      weekString: `${startOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${endOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`,
      startDate: startOfWeek,
      endDate: endOfWeek,
    };
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
      });
      const weeklyData: Record<string, number> = {};

      data.forEach((bill: Bill) => {
        const billDate = new Date(bill.createdAt);
        const { weekString } = getWeekDetails(billDate);
        weeklyData[weekString] = (weeklyData[weekString] || 0) + bill.amount;
      });

      const weeklyExpensesArray = Object.entries(weeklyData)
        .map(([week, total]) => ({
          week,
          total: total
        }))
        .sort((a, b) => {
          const dateA = new Date(a.week.split(" - ")[0]);
          const dateB = new Date(b.week.split(" - ")[0]);
          return dateA.getTime() - dateB.getTime();
        })
        .slice(-6);

      setWeeklyExpenses(weeklyExpensesArray);

      const categoryData: CategoryTotal[] = Object.entries(categoryTotals).map(
        ([name, total]) => ({
          name,
          total,
          percentage: totalExpense > 0 ? (total / totalExpense) * 100 : 0,
          color: categoryColors[name] || "rgb(162, 162, 162)",
        })
      );

      categoryData.sort((a, b) => b.percentage - a.percentage);

      setCategories(categoryData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching bills:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (  
<div className="min-h-screen bg-gray-50">
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <header className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ARC Dashboard
            </h1>
            <p className="text-sm text-gray-600">
              Track and manage your expenses efficiently
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button 
              variant="outline" 
              className="flex-1 sm:flex-none flex items-center gap-2"
            >
              <Download size={16} />
              Export
            </Button>
            <Button 
              className="flex-1 sm:flex-none flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Upload size={16} />
              Upload Bill
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Wallet className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Expenses</p>
                  <p className="text-2xl font-bold">₹45,249</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp size={12} />
                    +2.5% from last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Average</p>
                  <p className="text-2xl font-bold">₹38,120</p>
                  <p className="text-xs text-gray-600">Last 6 months</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Wallet className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Remaining Budget</p>
                  <p className="text-2xl font-bold">₹24,751</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div 
                      className="h-full bg-green-600 rounded-full" 
                      style={{ width: '45%' }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Highest Category</p>
                  <p className="text-2xl font-bold">₹12,380</p>
                  <p className="text-xs text-gray-600">Groceries</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </header>

      <main>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white p-1 rounded-lg border">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="space-y-0 pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Expense Trend</CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-sm"
                      >
                        Weekly
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-sm"
                      >
                        Monthly
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyExpenses}>
                        <XAxis 
                          dataKey="week" 
                          stroke="#94a3b8"
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis
                          stroke="#94a3b8"
                          tickFormatter={(value) => 
                            `₹${value.toLocaleString('en-IN')}`
                          }
                        />
                        <Tooltip
                          contentStyle={{ 
                            background: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                          formatter={(value) => [
                            `₹${value.toLocaleString('en-IN')}`,
                            'Total'
                          ]}
                        />
                        <Line
                          type="monotone"
                          dataKey="total"
                          stroke="#2563eb"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6, fill: "#2563eb" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="space-y-0 pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Category Distribution</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Filter size={16} />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-square">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                      {categories.map((category, index) => {
                        const previousSlices = categories.slice(0, index);
                        const startAngle = previousSlices.reduce(
                          (acc, slice) => acc + slice.percentage * 3.6,
                          0
                        );
                        const endAngle = startAngle + category.percentage * 3.6;
                        const startRadians = (startAngle * Math.PI) / 180;
                        const endRadians = (endAngle * Math.PI) / 180;
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
                          <path 
                            key={category.name} 
                            d={d} 
                            fill={category.color}
                            className="hover:opacity-90 cursor-pointer"
                          />
                        );
                      })}
                    </svg>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {categories.map((category) => (
                      <div 
                        key={category.name} 
                        className="flex items-center gap-2"
                      >
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }} 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {category.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {category.percentage}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Recent Transactions</CardTitle>
                  <Button 
                    variant="link" 
                    className="text-sm text-blue-600"
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bills.slice(0, 5).map((bill) => (
                    <div 
                      key={bill.id}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-${bill.category?.color}-100`}>
                          <div className={`w-8 h-8 text-${bill.category?.color}-600`} />
                        </div>
                        <div>
                          <p className="font-medium">{bill.description}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(bill.createdAt)}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold">
                        {formatAmount(bill.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
          </TabsContent>

          <TabsContent value="history">
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </div>
  );
}
