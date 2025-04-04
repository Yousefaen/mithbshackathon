import { BarChart3, BoxIcon, ClipboardList, Package, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Bar,
  CartesianGrid,
} from "recharts"
import { MainNav } from "@/components/main-nav"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full">
      <MainNav />
      <main className="flex-1 overflow-auto pl-64">
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Inventory Items</CardTitle>
                <BoxIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-muted-foreground">+12 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Within 7 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">To be fulfilled</p>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Inventory Status</CardTitle>
                    <CardDescription>Current stock levels across all categories</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={inventoryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="current" name="Current Stock" fill="#16a34a" />
                          <Bar dataKey="minimum" name="Minimum Required" fill="#dc2626" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Low Stock Items</CardTitle>
                    <CardDescription>Items that need to be restocked soon</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Flour (All-Purpose)</div>
                          <div>15%</div>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Sugar (Granulated)</div>
                          <div>20%</div>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Vanilla Extract</div>
                          <div>10%</div>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Cocoa Powder</div>
                          <div>25%</div>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Baking Powder</div>
                          <div>18%</div>
                        </div>
                        <Progress value={18} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Expiring Soon</CardTitle>
                    <CardDescription>Items that will expire within 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Fresh Milk</p>
                          <p className="text-xs text-muted-foreground">Dairy</p>
                        </div>
                        <div className="text-sm text-red-500">2 days</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Cream Cheese</p>
                          <p className="text-xs text-muted-foreground">Dairy</p>
                        </div>
                        <div className="text-sm text-red-500">3 days</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Fresh Eggs</p>
                          <p className="text-xs text-muted-foreground">Dairy</p>
                        </div>
                        <div className="text-sm text-orange-500">5 days</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Strawberries</p>
                          <p className="text-xs text-muted-foreground">Fruits</p>
                        </div>
                        <div className="text-sm text-orange-500">5 days</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Fresh Yeast</p>
                          <p className="text-xs text-muted-foreground">Baking</p>
                        </div>
                        <div className="text-sm text-orange-500">6 days</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Latest inventory movements and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-green-100 p-2">
                          <Package className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Received 50kg of Flour (All-Purpose)</p>
                          <p className="text-xs text-muted-foreground">Today at 10:30 AM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-red-100 p-2">
                          <Package className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Used 25kg of Sugar (Granulated) for production
                          </p>
                          <p className="text-xs text-muted-foreground">Today at 9:15 AM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-yellow-100 p-2">
                          <ClipboardList className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Inventory count updated for Dairy products</p>
                          <p className="text-xs text-muted-foreground">Yesterday at 4:30 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-blue-100 p-2">
                          <Package className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Ordered 100kg of Cocoa Powder</p>
                          <p className="text-xs text-muted-foreground">Yesterday at 2:15 PM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Analytics</CardTitle>
                  <CardDescription>Detailed analysis of inventory usage and trends</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="usage" name="Usage" stroke="#2563eb" />
                        <Line type="monotone" dataKey="received" name="Received" stroke="#16a34a" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>Generate and download inventory reports</CardDescription>
                  </div>
                  <Button className="ml-auto" asChild>
                    <a href="#">Generate Report</a>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">Monthly Inventory Summary</p>
                        <p className="text-sm text-muted-foreground">March 2025</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href="#">Download</a>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">Expiration Report</p>
                        <p className="text-sm text-muted-foreground">Next 30 days</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href="#">Download</a>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">Stock Movement Analysis</p>
                        <p className="text-sm text-muted-foreground">Q1 2025</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href="#">Download</a>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Supplier Performance</p>
                        <p className="text-sm text-muted-foreground">Last 6 months</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href="#">Download</a>
                      </Button>
                    </div>
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

const inventoryData = [
  { category: "Flour", current: 120, minimum: 50 },
  { category: "Sugar", current: 80, minimum: 40 },
  { category: "Dairy", current: 60, minimum: 30 },
  { category: "Fruits", current: 40, minimum: 20 },
  { category: "Nuts", current: 90, minimum: 35 },
  { category: "Chocolate", current: 70, minimum: 25 },
]

const analyticsData = [
  { month: "Jan", usage: 65, received: 80 },
  { month: "Feb", usage: 59, received: 50 },
  { month: "Mar", usage: 80, received: 90 },
  { month: "Apr", usage: 81, received: 60 },
  { month: "May", usage: 56, received: 70 },
  { month: "Jun", usage: 55, received: 60 },
]

