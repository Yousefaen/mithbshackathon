"use client"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Check, Key, Save, Users } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNav />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="users">Users & Access</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure basic system settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="FoodTrack Bakery Inc." />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="america-new_york">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-new_york">America/New York (UTC-05:00)</SelectItem>
                        <SelectItem value="america-chicago">America/Chicago (UTC-06:00)</SelectItem>
                        <SelectItem value="america-denver">America/Denver (UTC-07:00)</SelectItem>
                        <SelectItem value="america-los_angeles">America/Los Angeles (UTC-08:00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="mm-dd-yyyy">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inventory-method">Inventory Method</Label>
                  <Select defaultValue="fifo">
                    <SelectTrigger id="inventory-method">
                      <SelectValue placeholder="Select inventory method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fifo">FIFO (First In, First Out)</SelectItem>
                      <SelectItem value="fefo">FEFO (First Expired, First Out)</SelectItem>
                      <SelectItem value="lifo">LIFO (Last In, First Out)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    FEFO is recommended for perishable food items to minimize waste
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Automated Alerts</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="low-stock">Low Stock Alerts</Label>
                      <p className="text-sm text-muted-foreground">Notify when inventory falls below threshold</p>
                    </div>
                    <Switch id="low-stock" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="expiration">Expiration Alerts</Label>
                      <p className="text-sm text-muted-foreground">Notify when items are approaching expiration</p>
                    </div>
                    <Switch id="expiration" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-reorder">Automated Reordering</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically generate purchase orders for low stock items
                      </p>
                    </div>
                    <Switch id="auto-reorder" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage & Temperature Monitoring</CardTitle>
                <CardDescription>Configure IoT sensor integration for temperature monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IoT Sensor Integration</Label>
                    <p className="text-sm text-muted-foreground">Connect temperature and humidity sensors</p>
                  </div>
                  <Badge className="bg-green-500">Connected</Badge>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <Card className="border-2 border-green-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Cold Storage #1</CardTitle>
                      <CardDescription>Dairy Products</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2.4°C</div>
                      <div className="flex items-center text-green-500">
                        <Check className="mr-1 h-4 w-4" />
                        <span className="text-xs">Within range (2-4°C)</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Cold Storage #2</CardTitle>
                      <CardDescription>Fruits & Vegetables</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5.1°C</div>
                      <div className="flex items-center text-green-500">
                        <Check className="mr-1 h-4 w-4" />
                        <span className="text-xs">Within range (4-7°C)</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-yellow-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Freezer #1</CardTitle>
                      <CardDescription>Frozen Ingredients</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">-17.2°C</div>
                      <div className="flex items-center text-yellow-500">
                        <AlertTriangle className="mr-1 h-4 w-4" />
                        <span className="text-xs">Warning: Above -18°C</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temp-check">Temperature Check Frequency</Label>
                  <Select defaultValue="15">
                    <SelectTrigger id="temp-check">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Every 5 minutes</SelectItem>
                      <SelectItem value="15">Every 15 minutes</SelectItem>
                      <SelectItem value="30">Every 30 minutes</SelectItem>
                      <SelectItem value="60">Every hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and access permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Active Users</h3>
                  <Button size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </div>

                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left font-medium">Name</th>
                        <th className="p-2 text-left font-medium">Email</th>
                        <th className="p-2 text-left font-medium">Role</th>
                        <th className="p-2 text-left font-medium">Status</th>
                        <th className="p-2 text-left font-medium">Last Login</th>
                        <th className="p-2 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">John Smith</td>
                        <td className="p-2">john.smith@example.com</td>
                        <td className="p-2">Administrator</td>
                        <td className="p-2">
                          <Badge className="bg-green-500">Active</Badge>
                        </td>
                        <td className="p-2">Today, 9:32 AM</td>
                        <td className="p-2 text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Sarah Johnson</td>
                        <td className="p-2">sarah.johnson@example.com</td>
                        <td className="p-2">Quality Manager</td>
                        <td className="p-2">
                          <Badge className="bg-green-500">Active</Badge>
                        </td>
                        <td className="p-2">Today, 10:15 AM</td>
                        <td className="p-2 text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Michael Rodriguez</td>
                        <td className="p-2">michael.rodriguez@example.com</td>
                        <td className="p-2">Production Manager</td>
                        <td className="p-2">
                          <Badge className="bg-green-500">Active</Badge>
                        </td>
                        <td className="p-2">Yesterday, 4:45 PM</td>
                        <td className="p-2 text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Emily Chen</td>
                        <td className="p-2">emily.chen@example.com</td>
                        <td className="p-2">Inventory Specialist</td>
                        <td className="p-2">
                          <Badge className="bg-yellow-500">Inactive</Badge>
                        </td>
                        <td className="p-2">3 days ago</td>
                        <td className="p-2 text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Role Permissions</h3>

                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-2 text-left font-medium">Role</th>
                          <th className="p-2 text-left font-medium">Inventory</th>
                          <th className="p-2 text-left font-medium">Production</th>
                          <th className="p-2 text-left font-medium">Quality</th>
                          <th className="p-2 text-left font-medium">Suppliers</th>
                          <th className="p-2 text-left font-medium">Reports</th>
                          <th className="p-2 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">Administrator</td>
                          <td className="p-2">Full Access</td>
                          <td className="p-2">Full Access</td>
                          <td className="p-2">Full Access</td>
                          <td className="p-2">Full Access</td>
                          <td className="p-2">Full Access</td>
                          <td className="p-2 text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Production Manager</td>
                          <td className="p-2">View, Edit</td>
                          <td className="p-2">Full Access</td>
                          <td className="p-2">View</td>
                          <td className="p-2">View</td>
                          <td className="p-2">View</td>
                          <td className="p-2 text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Quality Manager</td>
                          <td className="p-2">View</td>
                          <td className="p-2">View</td>
                          <td className="p-2">Full Access</td>
                          <td className="p-2">View</td>
                          <td className="p-2">View, Create</td>
                          <td className="p-2 text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Inventory Specialist</td>
                          <td className="p-2">Full Access</td>
                          <td className="p-2">View</td>
                          <td className="p-2">No Access</td>
                          <td className="p-2">View, Edit</td>
                          <td className="p-2">View</td>
                          <td className="p-2 text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security Settings</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for all administrator accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Password Policy</Label>
                      <p className="text-sm text-muted-foreground">Require strong passwords and 90-day rotation</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Audit Logging</Label>
                      <p className="text-sm text-muted-foreground">Track all user actions for accountability</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Integrations</CardTitle>
                <CardDescription>Connect with external systems and services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">ERP System</CardTitle>
                        <Badge className="bg-green-500">Connected</Badge>
                      </div>
                      <CardDescription>SAP Business One</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="font-medium">Active</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Last Sync:</span>
                          <span className="font-medium">Today, 11:30 AM</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sync Frequency:</span>
                          <span className="font-medium">Every 30 minutes</span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Accounting System</CardTitle>
                        <Badge className="bg-green-500">Connected</Badge>
                      </div>
                      <CardDescription>QuickBooks Online</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="font-medium">Active</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Last Sync:</span>
                          <span className="font-medium">Today, 10:15 AM</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sync Frequency:</span>
                          <span className="font-medium">Daily</span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">E-Commerce Platform</CardTitle>
                        <Badge className="bg-green-500">Connected</Badge>
                      </div>
                      <CardDescription>Shopify</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="font-medium">Active</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Last Sync:</span>
                          <span className="font-medium">Today, 11:45 AM</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sync Frequency:</span>
                          <span className="font-medium">Real-time</span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Logistics Provider</CardTitle>
                        <Badge className="bg-green-500">Connected</Badge>
                      </div>
                      <CardDescription>FedEx</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="font-medium">Active</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Last Sync:</span>
                          <span className="font-medium">Today, 9:30 AM</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tracking:</span>
                          <span className="font-medium">Enabled</span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Available Integrations</h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="border-dashed">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Point of Sale (POS)</CardTitle>
                        <CardDescription>Square</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Connect your Square POS system to sync sales data in real-time.
                        </p>
                        <Button size="sm" className="w-full">
                          Connect
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">CRM System</CardTitle>
                        <CardDescription>Salesforce</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Integrate with Salesforce to manage customer relationships.
                        </p>
                        <Button size="sm" className="w-full">
                          Connect
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Analytics Platform</CardTitle>
                        <CardDescription>Tableau</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Connect to Tableau for advanced data visualization and analytics.
                        </p>
                        <Button size="sm" className="w-full">
                          Connect
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">API Access</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>API Access</Label>
                      <p className="text-sm text-muted-foreground">Enable API access for third-party integrations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Key className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">API Key</h4>
                          <p className="text-sm text-muted-foreground">Last generated: 30 days ago</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Generate New Key
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Settings</CardTitle>
                <CardDescription>Configure regulatory compliance and safety standards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Regulatory Compliance</h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">HACCP Compliance</CardTitle>
                          <Badge className="bg-green-500">Active</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last Audit:</span>
                            <span className="font-medium">March 15, 2025</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Next Audit:</span>
                            <span className="font-medium">September 15, 2025</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Critical Control Points:</span>
                            <span className="font-medium">12 active</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">FDA Compliance</CardTitle>
                          <Badge className="bg-green-500">Active</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last Inspection:</span>
                            <span className="font-medium">February 10, 2025</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Status:</span>
                            <span className="font-medium">Compliant</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Registration:</span>
                            <span className="font-medium">Current</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">FSMA Compliance</CardTitle>
                          <Badge className="bg-green-500">Active</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Preventive Controls:</span>
                            <span className="font-medium">Implemented</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Food Safety Plan:</span>
                            <span className="font-medium">Current</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last Review:</span>
                            <span className="font-medium">January 5, 2025</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Allergen Management</CardTitle>
                          <Badge className="bg-green-500">Active</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Allergen Controls:</span>
                            <span className="font-medium">Implemented</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Labeling Compliance:</span>
                            <span className="font-medium">Current</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Cross-Contact Prevention:</span>
                            <span className="font-medium">Active</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recall Management</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mock Recall Drills</Label>
                      <p className="text-sm text-muted-foreground">Schedule regular mock recall exercises</p>
                    </div>
                    <Select defaultValue="quarterly">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="biannually">Bi-annually</SelectItem>
                        <SelectItem value="annually">Annually</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Recall Team Contacts</Label>
                      <p className="text-sm text-muted-foreground">
                        Maintain up-to-date contact information for recall team
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage Contacts
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Recall Documentation</Label>
                      <p className="text-sm text-muted-foreground">Maintain recall procedures and documentation</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Documents
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Audit Trail</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Audit Logging</Label>
                      <p className="text-sm text-muted-foreground">Track all system changes for compliance</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Retention Period</Label>
                      <p className="text-sm text-muted-foreground">How long to keep audit logs</p>
                    </div>
                    <Select defaultValue="7">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 year</SelectItem>
                        <SelectItem value="3">3 years</SelectItem>
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="7">7 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Export Audit Logs</Label>
                      <p className="text-sm text-muted-foreground">Download audit logs for external review</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure system alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Alert Channels</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send alerts to user email addresses</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send critical alerts via text message</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>In-App Notifications</Label>
                      <p className="text-sm text-muted-foreground">Display alerts within the application</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Slack Integration</Label>
                      <p className="text-sm text-muted-foreground">Send alerts to Slack channels</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Types</h3>

                  <div className="space-y-2">
                    <Label>Inventory Alerts</Label>
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="p-2 text-left font-medium">Alert Type</th>
                            <th className="p-2 text-center font-medium">Email</th>
                            <th className="p-2 text-center font-medium">SMS</th>
                            <th className="p-2 text-center font-medium">In-App</th>
                            <th className="p-2 text-center font-medium">Slack</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">Low Stock</td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Expiring Soon (7 days)</td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Expiring Soon (3 days)</td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Expired Items</td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Temperature Monitoring</Label>
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="p-2 text-left font-medium">Alert Type</th>
                            <th className="p-2 text-center font-medium">Email</th>
                            <th className="p-2 text-center font-medium">SMS</th>
                            <th className="p-2 text-center font-medium">In-App</th>
                            <th className="p-2 text-center font-medium">Slack</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">Temperature Warning</td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Temperature Critical</td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Sensor Failure</td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Quality Control</Label>
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="p-2 text-left font-medium">Alert Type</th>
                            <th className="p-2 text-center font-medium">Email</th>
                            <th className="p-2 text-center font-medium">SMS</th>
                            <th className="p-2 text-center font-medium">In-App</th>
                            <th className="p-2 text-center font-medium">Slack</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">QC Test Failed</td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">QC Test Due</td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                            <td className="p-2 text-center">
                              <Switch size="sm" defaultChecked />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

