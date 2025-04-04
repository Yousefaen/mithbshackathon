"use client"

import { useState, useRef, useEffect } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, Send, User, Loader2 } from "lucide-react"

export default function AssistantPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your FoodTrack Assistant. How can I help you with your food inventory management today?",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message to the chat
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simple text response for now to avoid API issues
      const simulatedResponse = await simulateAssistantResponse(input)

      // Add assistant response to the chat
      setMessages((prev) => [...prev, { role: "assistant", content: simulatedResponse }])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Simulate assistant response without API call
  const simulateAssistantResponse = async (query) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("inventory") && (lowerQuery.includes("low") || lowerQuery.includes("stock"))) {
      return "To check low inventory items, go to the Inventory section and use the 'Low Stock' filter. This will show all items below their minimum threshold. You can also see a summary of low stock items on the dashboard."
    }

    if (lowerQuery.includes("expir") || (lowerQuery.includes("expire") && lowerQuery.includes("soon"))) {
      return "To view items expiring soon, check the 'Expiring Soon' section on the dashboard or go to the Inventory section and use the 'Expiration Date' filter to sort items by their expiration dates."
    }

    if (lowerQuery.includes("add") && (lowerQuery.includes("item") || lowerQuery.includes("product"))) {
      return "To add a new inventory item, go to the Inventory section and click the '+ Add Item' button in the top right corner. Fill in the required details like name, category, quantity, and expiration date."
    }

    if (lowerQuery.includes("recipe")) {
      return "You can manage recipes in the Recipes section. Here you can view existing recipes, create new ones, calculate costs based on ingredient prices, and link recipes to production batches."
    }

    if (lowerQuery.includes("forecast") || lowerQuery.includes("predict")) {
      return "The Forecasting section uses AI to predict future inventory needs based on historical data. You can view demand forecasts, seasonal trends, and get recommendations for optimal inventory levels."
    }

    if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("hey")) {
      return "Hello! I'm your FoodTrack Assistant. I can help you with inventory management, recipes, production planning, quality control, and more. How can I assist you today?"
    }

    if (lowerQuery.includes("help") || lowerQuery.includes("what can you do")) {
      return "I can help you with various aspects of the FoodTrack system, including:\n\n- Inventory management\n- Recipe information\n- Production planning\n- Quality control\n- Supplier management\n- Warehouse organization\n- Forecasting and analytics\n\nJust ask me a specific question, and I'll do my best to assist you!"
    }

    // Default response
    return (
      "I understand you're asking about \"" +
      query +
      '". As your FoodTrack Assistant, I can help with inventory management, recipes, production planning, quality control, and more. Could you please provide more details about what specific information you need?'
    )
  }

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex min-h-screen w-full">
      <MainNav />
      <main className="flex-1 overflow-auto pl-64">
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">FoodTrack Assistant</h1>
          </div>

          <div className="grid flex-1 grid-rows-[1fr,auto]">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Chat with FoodTrack Assistant</CardTitle>
                <CardDescription>
                  Ask questions about inventory management, recipes, production, or any other feature
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className="flex items-start gap-3 max-w-[80%]">
                          {message.role === "assistant" && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                <Bot size={16} />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <div className="whitespace-pre-wrap">{message.content}</div>
                          </div>
                          {message.role === "user" && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                <User size={16} />
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-start gap-3 max-w-[80%]">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <Bot size={16} />
                            </AvatarFallback>
                          </Avatar>
                          <div className="rounded-lg px-4 py-2 bg-muted">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

