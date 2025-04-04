"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Calendar, Download, TrendingDown, TrendingUp } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30")

  return (
    <div className="flex min-h-screen w-full">
      <MainNav />
      <main className="flex-1 overflow-auto pl-64">
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Analytics & Reporting</h1>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" asChild>
                <a href="#">
                  <Calendar className="mr-2 h-4 w-4" />
                  Custom Range
                </a>
              </Button>
              <Button asChild>
                <a href="#">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$124,580</div>
                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inventory Turnover</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-xs text-muted-foreground">+0.3 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Waste Rate</CardTitle>
                <TrendingDown className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.1%</div>
                <p className="text-xs text-muted-foreground">-0.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stockout Incidents</CardTitle>
                <TrendingDown className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">-2 from last month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="inventory" className="space-y-4">
            <TabsList>
              <TabsTrigger value="inventory">Inventory Analysis</TabsTrigger>
              <TabsTrigger value="sales">Sales & Demand</TabsTrigger>
              <TabsTrigger value="suppliers">Supplier Performance</TabsTrigger>
              <TabsTrigger value="profitability">Profitability</TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Inventory by Category</CardTitle>
                    <CardDescription>Current inventory value distribution by category</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={inventoryCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {inventoryCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Inventory Turnover by Category</CardTitle>
                    <CardDescription>How quickly inventory is sold by category</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={inventoryTurnoverData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="turnover" fill="#8884d8" name="Turnover Rate" />
                        <Bar dataKey="industry" fill="#82ca9d" name="Industry Average" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory Value Over Time</CardTitle>
                  <CardDescription>Total inventory value trends over the selected period</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={inventoryValueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Value" />
                      <Line type="monotone" dataKey="raw" stroke="#82ca9d" name="Raw Materials" />
                      <Line type="monotone" dataKey="finished" stroke="#ffc658" name="Finished Goods" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expiration Analysis</CardTitle>
                  <CardDescription>Inventory expiration timeline and waste tracking</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expirationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timeframe" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="value" fill="#8884d8" name="Expiring Value ($)" />
                      <Bar yAxisId="right" dataKey="items" fill="#82ca9d" name="Number of Items" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Forecast vs. Actual</CardTitle>
                  <CardDescription>Comparison of AI-driven sales forecasts with actual sales</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesForecastData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Line type="monotone" dataKey="forecast" stroke="#8884d8" name="Forecast" strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="actual" stroke="#82ca9d" name="Actual" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Selling Products</CardTitle>
                    <CardDescription>Products with highest sales volume</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart layout="vertical" data={topProductsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={150} />
                        <Tooltip formatter={(value) => `${value.toLocaleString()} units`} />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" name="Units Sold" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Seasonal Demand Patterns</CardTitle>
                    <CardDescription>Sales patterns by month for key product categories</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={seasonalDemandData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="cookies" stroke="#8884d8" name="Cookies" />
                        <Line type="monotone" dataKey="bread" stroke="#82ca9d" name="Bread" />
                        <Line type="monotone" dataKey="cakes" stroke="#ffc658" name="Cakes" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="suppliers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators for major suppliers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-2 text-left font-medium">Supplier</th>
                          <th className="p-2 text-center font-medium">On-Time Delivery</th>
                          <th className="p-2 text-center font-medium">Quality Rating</th>
                          <th className="p-2 text-center font-medium">Price Competitiveness</th>
                          <th className="p-2 text-center font-medium">Lead Time</th>
                          <th className="p-2 text-center font-medium">Overall Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">Premium Flour Mills</td>
                          <td className="p-2 text-center">98%</td>
                          <td className="p-2 text-center">4.8/5</td>
                          <td className="p-2 text-center">4.2/5</td>
                          <td className="p-2 text-center">3 days</td>
                          <td className="p-2 text-center">4.7/5</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Sweet Supplies Inc.</td>
                          <td className="p-2 text-center">95%</td>
                          <td className="p-2 text-center">4.9/5</td>
                          <td className="p-2 text-center">4.0/5</td>
                          <td className="p-2 text-center">3 days</td>
                          <td className="p-2 text-center">4.6/5</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Dairy Fresh</td>
                          <td className="p-2 text-center">99%</td>
                          <td className="p-2 text-center">4.7/5</td>
                          <td className="p-2 text-center">3.8/5</td>
                          <td className="p-2 text-center">2 days</td>
                          <td className="p-2 text-center">4.5/5</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Cocoa Delights</td>
                          <td className="p-2 text-center">92%</td>
                          <td className="p-2 text-center">4.9/5</td>
                          <td className="p-2 text-center">3.5/5</td>
                          <td className="p-2 text-center">5 days</td>
                          <td className="p-2 text-center">4.2/5</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Packaging Pro</td>
                          <td className="p-2 text-center">90%</td>
                          <td className="p-2 text-center">4.2/5</td>
                          <td className="p-2 text-center">4.5/5</td>
                          <td className="p-2 text-center">7 days</td>
                          <td className="p-2 text-center">4.1/5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>On-Time Delivery Performance</CardTitle>
                    <CardDescription>Delivery performance trends over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={supplierDeliveryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[80, 100]} />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                        <Line type="monotone" dataKey="flour" stroke="#8884d8" name="Premium Flour Mills" />
                        <Line type="monotone" dataKey="sugar" stroke="#82ca9d" name="Sweet Supplies Inc." />
                        <Line type="monotone" dataKey="dairy" stroke="#ffc658" name="Dairy Fresh" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quality Issues by Supplier</CardTitle>
                    <CardDescription>Number of quality issues reported</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={supplierQualityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="minor" stackId="a" fill="#8884d8" name="Minor Issues" />
                        <Bar dataKey="major" stackId="a" fill="#82ca9d" name="Major Issues" />
                        <Bar dataKey="critical" stackId="a" fill="#ff8042" name="Critical Issues" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profitability" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Profitability Analysis</CardTitle>
                  <CardDescription>Profit margin by product category</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={profitabilityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                      <Bar yAxisId="left" dataKey="cost" fill="#ff8042" name="Cost ($)" />
                      <Bar yAxisId="right" dataKey="margin" fill="#82ca9d" name="Margin (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Cost Breakdown</CardTitle>
                    <CardDescription>Production cost components</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={costBreakdownData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {costBreakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Profit Trends</CardTitle>
                    <CardDescription>Profit margin trends over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={profitTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                        <Line type="monotone" dataKey="cookies" stroke="#8884d8" name="Cookies" />
                        <Line type="monotone" dataKey="bread" stroke="#82ca9d" name="Bread" />
                        <Line type="monotone" dataKey="cakes" stroke="#ffc658" name="Cakes" />
                        <Line type="monotone" dataKey="overall" stroke="#ff8042" name="Overall" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

// Sample data for charts
const inventoryCategoryData = [
  { name: "Flour", value: 32500 },
  { name: "Sugar", value: 18700 },
  { name: "Dairy", value: 15200 },
  { name: "Chocolate", value: 24800 },
  { name: "Nuts", value: 19600 },
  { name: "Packaging", value: 13780 },
]

const inventoryTurnoverData = [
  { name: "Flour", turnover: 5.2, industry: 4.8 },
  { name: "Sugar", turnover: 4.8, industry: 4.5 },
  { name: "Dairy", turnover: 6.5, industry: 5.2 },
  { name: "Chocolate", turnover: 3.8, industry: 4.0 },
  { name: "Nuts", turnover: 3.2, industry: 3.5 },
  { name: "Packaging", turnover: 2.8, industry: 3.0 },
]

const inventoryValueData = [
  { date: "Jan", total: 110000, raw: 75000, finished: 35000 },
  { date: "Feb", total: 115000, raw: 78000, finished: 37000 },
  { date: "Mar", total: 118000, raw: 80000, finished: 38000 },
  { date: "Apr", total: 124580, raw: 84000, finished: 40580 },
  { date: "May", total: 122000, raw: 82000, finished: 40000 },
  { date: "Jun", total: 126000, raw: 85000, finished: 41000 },
]

const expirationData = [
  { timeframe: "0-7 days", value: 5200, items: 15 },
  { timeframe: "8-14 days", value: 7800, items: 22 },
  { timeframe: "15-30 days", value: 12500, items: 35 },
  { timeframe: "31-60 days", value: 28000, items: 65 },
  { timeframe: "61-90 days", value: 42000, items: 95 },
]

const salesForecastData = [
  { date: "Jan", forecast: 85000, actual: 82000 },
  { date: "Feb", forecast: 88000, actual: 90000 },
  { date: "Mar", forecast: 92000, actual: 93500 },
  { date: "Apr", forecast: 96000, actual: 97200 },
  { date: "May", forecast: 98000, actual: 96800 },
  { date: "Jun", forecast: 102000, actual: 103500 },
]

const topProductsData = [
  { name: "Chocolate Chip Cookies", value: 12500 },
  { name: "Whole Wheat Bread", value: 9800 },
  { name: "Vanilla Cupcakes", value: 8200 },
  { name: "Sourdough Bread", value: 7500 },
  { name: "Blueberry Muffins", value: 6800 },
]

const seasonalDemandData = [
  { month: "Jan", cookies: 8500, bread: 9200, cakes: 7800 },
  { month: "Feb", cookies: 8200, bread: 9000, cakes: 8500 },
  { month: "Mar", cookies: 8800, bread: 8800, cakes: 9200 },
  { month: "Apr", cookies: 9200, bread: 8500, cakes: 10500 },
  { month: "May", cookies: 9500, bread: 8200, cakes: 11200 },
  { month: "Jun", cookies: 9800, bread: 8000, cakes: 10800 },
  { month: "Jul", cookies: 10200, bread: 7800, cakes: 9500 },
  { month: "Aug", cookies: 10500, bread: 7500, cakes: 9200 },
  { month: "Sep", cookies: 9800, bread: 8200, cakes: 10500 },
  { month: "Oct", cookies: 9500, bread: 8500, cakes: 12500 },
  { month: "Nov", cookies: 10800, bread: 8800, cakes: 13800 },
  { month: "Dec", cookies: 12500, bread: 9200, cakes: 15200 },
]

const supplierDeliveryData = [
  { month: "Jan", flour: 97, sugar: 95, dairy: 99 },
  { month: "Feb", flour: 98, sugar: 96, dairy: 99 },
  { month: "Mar", flour: 96, sugar: 94, dairy: 98 },
  { month: "Apr", flour: 98, sugar: 95, dairy: 99 },
  { month: "May", flour: 99, sugar: 97, dairy: 100 },
  { month: "Jun", flour: 97, sugar: 96, dairy: 99 },
]

const supplierQualityData = [
  { name: "Premium Flour Mills", minor: 5, major: 1, critical: 0 },
  { name: "Sweet Supplies Inc.", minor: 3, major: 0, critical: 0 },
  { name: "Dairy Fresh", minor: 4, major: 1, critical: 0 },
  { name: "Cocoa Delights", minor: 7, major: 2, critical: 0 },
  { name: "Packaging Pro", minor: 8, major: 3, critical: 1 },
]

const profitabilityData = [
  { category: "Cookies", revenue: 125000, cost: 87500, margin: 30 },
  { category: "Bread", revenue: 98000, cost: 68600, margin: 30 },
  { category: "Cakes", revenue: 152000, cost: 98800, margin: 35 },
  { category: "Muffins", revenue: 68000, cost: 47600, margin: 30 },
  { category: "Pastries", revenue: 85000, cost: 59500, margin: 30 },
]

const costBreakdownData = [
  { name: "Raw Materials", value: 350000 },
  { name: "Labor", value: 280000 },
  { name: "Packaging", value: 120000 },
  { name: "Utilities", value: 85000 },
  { name: "Transportation", value: 65000 },
  { name: "Other", value: 45000 },
]

const profitTrendsData = [
  { month: "Jan", cookies: 28, bread: 29, cakes: 33, overall: 30 },
  { month: "Feb", cookies: 29, bread: 30, cakes: 34, overall: 31 },
  { month: "Mar", cookies: 30, bread: 30, cakes: 35, overall: 32 },
  { month: "Apr", cookies: 30, bread: 30, cakes: 35, overall: 32 },
  { month: "May", cookies: 31, bread: 29, cakes: 36, overall: 32 },
  { month: "Jun", cookies: 32, bread: 28, cakes: 36, overall: 32 },
]

