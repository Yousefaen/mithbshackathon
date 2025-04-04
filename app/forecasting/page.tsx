"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Calendar, RefreshCw, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function ForecastingPage() {
  const [timeRange, setTimeRange] = useState("30")

  return (
    <div className="flex min-h-screen w-full">
      <MainNav />
      <main className="flex-1 overflow-auto pl-64">
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">AI-Driven Forecasting</h1>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Next 7 days</SelectItem>
                  <SelectItem value="30">Next 30 days</SelectItem>
                  <SelectItem value="90">Next 90 days</SelectItem>
                  <SelectItem value="365">Next 12 months</SelectItem>
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
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Update Forecast
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Forecast Accuracy</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92.5%</div>
                <p className="text-xs text-muted-foreground">+1.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projected Sales</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$528,500</div>
                <p className="text-xs text-muted-foreground">+5.8% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projected Demand</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">58,250 units</div>
                <p className="text-xs text-muted-foreground">+4.2% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inventory Needs</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$215,800</div>
                <p className="text-xs text-muted-foreground">+3.5% from last period</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="demand" className="space-y-4">
            <TabsList>
              <TabsTrigger value="demand">Demand Forecast</TabsTrigger>
              <TabsTrigger value="inventory">Inventory Forecast</TabsTrigger>
              <TabsTrigger value="seasonal">Seasonal Analysis</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="demand" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Demand Forecast</CardTitle>
                  <CardDescription>AI-driven demand predictions for the next {timeRange} days</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={demandForecastData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value.toLocaleString()} units`} />
                      <Legend />
                      <Line type="monotone" dataKey="cookies" stroke="#8884d8" name="Cookies" />
                      <Line type="monotone" dataKey="bread" stroke="#82ca9d" name="Bread" />
                      <Line type="monotone" dataKey="cakes" stroke="#ffc658" name="Cakes" />
                      <Line type="monotone" dataKey="pastries" stroke="#ff8042" name="Pastries" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Products by Projected Demand</CardTitle>
                  <CardDescription>Products with highest forecasted demand</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Projected Demand</TableHead>
                        <TableHead>Growth</TableHead>
                        <TableHead>Confidence</TableHead>
                        <TableHead>Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topDemandProducts.map((product) => (
                        <TableRow key={product.name}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.demand.toLocaleString()} units</TableCell>
                          <TableCell className={product.growth > 0 ? "text-green-500" : "text-red-500"}>
                            {product.growth > 0 ? "+" : ""}
                            {product.growth}%
                          </TableCell>
                          <TableCell>
                            <ConfidenceBadge confidence={product.confidence} />
                          </TableCell>
                          <TableCell>{product.trend}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Projected Inventory Needs</CardTitle>
                  <CardDescription>Forecasted inventory requirements based on demand</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={inventoryForecastData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="current" fill="#8884d8" name="Current Inventory Value" />
                      <Bar dataKey="needed" fill="#82ca9d" name="Projected Need" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Critical Ingredients Forecast</CardTitle>
                  <CardDescription>Key ingredients requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ingredient</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Projected Need</TableHead>
                        <TableHead>Deficit/Surplus</TableHead>
                        <TableHead>Order By</TableHead>
                        <TableHead>Recommended Order</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {criticalIngredientsData.map((ingredient) => (
                        <TableRow key={ingredient.name}>
                          <TableCell className="font-medium">{ingredient.name}</TableCell>
                          <TableCell>
                            {ingredient.currentStock} {ingredient.unit}
                          </TableCell>
                          <TableCell>
                            {ingredient.projectedNeed} {ingredient.unit}
                          </TableCell>
                          <TableCell className={ingredient.deficit < 0 ? "text-red-500" : "text-green-500"}>
                            {ingredient.deficit > 0 ? "+" : ""}
                            {ingredient.deficit} {ingredient.unit}
                          </TableCell>
                          <TableCell>{ingredient.orderBy}</TableCell>
                          <TableCell>
                            {ingredient.recommendedOrder} {ingredient.unit}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seasonal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Demand Patterns</CardTitle>
                  <CardDescription>Historical and projected seasonal trends</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={seasonalTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value.toLocaleString()} units`} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="lastYear"
                        stroke="#8884d8"
                        name="Last Year"
                        strokeDasharray="5 5"
                      />
                      <Line type="monotone" dataKey="thisYear" stroke="#82ca9d" name="This Year" />
                      <Line type="monotone" dataKey="forecast" stroke="#ff8042" name="Forecast" strokeDasharray="3 3" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Seasonal Products</CardTitle>
                    <CardDescription>Products with strong seasonal patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Peak Season</TableHead>
                          <TableHead>Seasonality Index</TableHead>
                          <TableHead>Recommendation</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {seasonalProductsData.map((product) => (
                          <TableRow key={product.name}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.peakSeason}</TableCell>
                            <TableCell>{product.seasonalityIndex}</TableCell>
                            <TableCell>{product.recommendation}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>External Factors</CardTitle>
                    <CardDescription>External factors affecting demand</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Factor</TableHead>
                          <TableHead>Impact</TableHead>
                          <TableHead>Timeframe</TableHead>
                          <TableHead>Confidence</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {externalFactorsData.map((factor) => (
                          <TableRow key={factor.name}>
                            <TableCell className="font-medium">{factor.name}</TableCell>
                            <TableCell className={factor.impact.includes("+") ? "text-green-500" : "text-red-500"}>
                              {factor.impact}
                            </TableCell>
                            <TableCell>{factor.timeframe}</TableCell>
                            <TableCell>
                              <ConfidenceBadge confidence={factor.confidence} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Generated Recommendations</CardTitle>
                  <CardDescription>Strategic recommendations based on forecast data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recommendationsData.map((recommendation, index) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className={`${recommendation.priority === "High" ? "bg-red-500" : recommendation.priority === "Medium" ? "bg-yellow-500" : "bg-blue-500"}`}
                          >
                            {recommendation.priority} Priority
                          </Badge>
                          <Badge variant="outline">{recommendation.category}</Badge>
                        </div>
                        <h3 className="text-lg font-medium mb-2">{recommendation.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{recommendation.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="rounded-md border p-3">
                            <div className="font-medium mb-1">Expected Impact</div>
                            <div className="text-muted-foreground">{recommendation.impact}</div>
                          </div>
                          <div className="rounded-md border p-3">
                            <div className="font-medium mb-1">Implementation Timeframe</div>
                            <div className="text-muted-foreground">{recommendation.timeframe}</div>
                          </div>
                          <div className="rounded-md border p-3">
                            <div className="font-medium mb-1">Confidence Level</div>
                            <div className="text-muted-foreground">{recommendation.confidence}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function ConfidenceBadge({ confidence }) {
  if (confidence >= 90) {
    return <Badge className="bg-green-500">High ({confidence}%)</Badge>
  } else if (confidence >= 70) {
    return <Badge className="bg-yellow-500">Medium ({confidence}%)</Badge>
  } else {
    return <Badge className="bg-red-500">Low ({confidence}%)</Badge>
  }
}

// Sample data for charts and tables
const demandForecastData = [
  { date: "Week 1", cookies: 5200, bread: 4800, cakes: 3200, pastries: 2800 },
  { date: "Week 2", cookies: 5400, bread: 4700, cakes: 3400, pastries: 2900 },
  { date: "Week 3", cookies: 5600, bread: 4600, cakes: 3600, pastries: 3000 },
  { date: "Week 4", cookies: 5800, bread: 4500, cakes: 3800, pastries: 3100 },
  { date: "Week 5", cookies: 6000, bread: 4400, cakes: 4000, pastries: 3200 },
  { date: "Week 6", cookies: 6200, bread: 4300, cakes: 4200, pastries: 3300 },
]

const topDemandProducts = [
  {
    name: "Chocolate Chip Cookies",
    category: "Cookies",
    demand: 12500,
    growth: 8.5,
    confidence: 95,
    trend: "Increasing",
  },
  {
    name: "Vanilla Cupcakes",
    category: "Cakes",
    demand: 9800,
    growth: 5.2,
    confidence: 92,
    trend: "Stable",
  },
  {
    name: "Whole Wheat Bread",
    category: "Bread",
    demand: 8500,
    growth: -2.1,
    confidence: 88,
    trend: "Decreasing",
  },
  {
    name: "Blueberry Muffins",
    category: "Muffins",
    demand: 7200,
    growth: 6.8,
    confidence: 90,
    trend: "Increasing",
  },
  {
    name: "Chocolate Croissants",
    category: "Pastries",
    demand: 6800,
    growth: 9.5,
    confidence: 85,
    trend: "Increasing",
  },
]

const inventoryForecastData = [
  { category: "Flour", current: 32500, needed: 38000 },
  { category: "Sugar", current: 18700, needed: 22000 },
  { category: "Dairy", current: 15200, needed: 18500 },
  { category: "Chocolate", current: 24800, needed: 26000 },
  { category: "Nuts", current: 19600, needed: 18000 },
  { category: "Packaging", current: 13780, needed: 15500 },
]

const criticalIngredientsData = [
  {
    name: "Flour (All-Purpose)",
    currentStock: 120,
    projectedNeed: 180,
    deficit: -60,
    unit: "kg",
    orderBy: "2025-04-10",
    recommendedOrder: 100,
  },
  {
    name: "Sugar (Granulated)",
    currentStock: 80,
    projectedNeed: 110,
    deficit: -30,
    unit: "kg",
    orderBy: "2025-04-12",
    recommendedOrder: 75,
  },
  {
    name: "Butter",
    currentStock: 45,
    projectedNeed: 85,
    deficit: -40,
    unit: "kg",
    orderBy: "2025-04-08",
    recommendedOrder: 50,
  },
  {
    name: "Chocolate Chips",
    currentStock: 40,
    projectedNeed: 65,
    deficit: -25,
    unit: "kg",
    orderBy: "2025-04-15",
    recommendedOrder: 50,
  },
  {
    name: "Almonds",
    currentStock: 30,
    projectedNeed: 25,
    deficit: 5,
    unit: "kg",
    orderBy: "N/A",
    recommendedOrder: 0,
  },
]

const seasonalTrendsData = [
  { month: "Jan", lastYear: 42000, thisYear: 45000, forecast: 48000 },
  { month: "Feb", lastYear: 44000, thisYear: 47000, forecast: 50000 },
  { month: "Mar", lastYear: 46000, thisYear: 49000, forecast: 52000 },
  { month: "Apr", lastYear: 48000, thisYear: 51000, forecast: 54000 },
  { month: "May", lastYear: 52000, thisYear: 55000, forecast: 58000 },
  { month: "Jun", lastYear: 56000, thisYear: 59000, forecast: 62000 },
  { month: "Jul", lastYear: 54000, thisYear: 57000, forecast: 60000 },
  { month: "Aug", lastYear: 52000, thisYear: 55000, forecast: 58000 },
  { month: "Sep", lastYear: 50000, thisYear: 53000, forecast: 56000 },
  { month: "Oct", lastYear: 54000, thisYear: 57000, forecast: 60000 },
  { month: "Nov", lastYear: 58000, thisYear: 61000, forecast: 64000 },
  { month: "Dec", lastYear: 62000, thisYear: 65000, forecast: 68000 },
]

const seasonalProductsData = [
  {
    name: "Pumpkin Spice Muffins",
    peakSeason: "Fall (Sep-Nov)",
    seasonalityIndex: "Very High",
    recommendation: "Increase production by 40% in August",
  },
  {
    name: "Gingerbread Cookies",
    peakSeason: "Winter (Nov-Dec)",
    seasonalityIndex: "Very High",
    recommendation: "Begin production in early October",
  },
  {
    name: "Strawberry Shortcake",
    peakSeason: "Summer (Jun-Aug)",
    seasonalityIndex: "High",
    recommendation: "Increase production by 30% in May",
  },
  {
    name: "Hot Cross Buns",
    peakSeason: "Spring (Mar-Apr)",
    seasonalityIndex: "High",
    recommendation: "Limited production window, prepare in February",
  },
]

const externalFactorsData = [
  {
    name: "Summer Food Festival",
    impact: "+15% demand",
    timeframe: "June 15-20, 2025",
    confidence: 95,
  },
  {
    name: "School Year End",
    impact: "+10% demand for cakes",
    timeframe: "May 25-June 10, 2025",
    confidence: 90,
  },
  {
    name: "Flour Price Increase",
    impact: "-5% margin",
    timeframe: "Starting April 15, 2025",
    confidence: 85,
  },
  {
    name: "Competitor Promotion",
    impact: "-8% demand",
    timeframe: "April 5-20, 2025",
    confidence: 75,
  },
]

const recommendationsData = [
  {
    title: "Increase Flour Inventory",
    description:
      "Based on demand forecasts, current flour inventory will be insufficient. Recommend increasing order quantities by 25% for the next two ordering cycles.",
    category: "Inventory",
    priority: "High",
    impact: "Prevent stockouts, ensure production continuity",
    timeframe: "Immediate",
    confidence: 92,
  },
  {
    title: "Adjust Production Schedule for Seasonal Products",
    description:
      "Begin production of fall seasonal items two weeks earlier than last year based on trend analysis showing earlier consumer demand.",
    category: "Production",
    priority: "Medium",
    impact: "Capture early seasonal demand, +8% projected revenue",
    timeframe: "2-4 weeks",
    confidence: 85,
  },
  {
    title: "Optimize Cold Storage Allocation",
    description:
      "Reallocate cold storage space to prioritize dairy products with increasing demand and shorter shelf life.",
    category: "Warehouse",
    priority: "Medium",
    impact: "Reduce waste by 15%, improve inventory turnover",
    timeframe: "1 week",
    confidence: 88,
  },
  {
    title: "Negotiate Volume Discount with Sugar Supplier",
    description:
      "Projected sugar needs will increase by 18% over the next quarter. Recommend negotiating volume-based pricing with current supplier.",
    category: "Procurement",
    priority: "Low",
    impact: "Potential 5-7% cost reduction on key ingredient",
    timeframe: "4-6 weeks",
    confidence: 80,
  },
]

