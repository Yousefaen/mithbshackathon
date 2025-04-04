export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Get the latest user message
    const latestUserMessage = messages.filter((m) => m.role === "user").pop()?.content || ""

    // Simple response generation based on keywords
    let response = "I'm your FoodTrack Assistant. How can I help you today?"

    const lowerQuery = latestUserMessage.toLowerCase()

    if (lowerQuery.includes("inventory") && (lowerQuery.includes("low") || lowerQuery.includes("stock"))) {
      response =
        "To check low inventory items, go to the Inventory section and use the 'Low Stock' filter. This will show all items below their minimum threshold. You can also see a summary of low stock items on the dashboard."
    } else if (lowerQuery.includes("expir") || (lowerQuery.includes("expire") && lowerQuery.includes("soon"))) {
      response =
        "To view items expiring soon, check the 'Expiring Soon' section on the dashboard or go to the Inventory section and use the 'Expiration Date' filter to sort items by their expiration dates."
    } else if (lowerQuery.includes("add") && (lowerQuery.includes("item") || lowerQuery.includes("product"))) {
      response =
        "To add a new inventory item, go to the Inventory section and click the '+ Add Item' button in the top right corner. Fill in the required details like name, category, quantity, and expiration date."
    } else if (lowerQuery.includes("recipe")) {
      response =
        "You can manage recipes in the Recipes section. Here you can view existing recipes, create new ones, calculate costs based on ingredient prices, and link recipes to production batches."
    } else if (lowerQuery.includes("forecast") || lowerQuery.includes("predict")) {
      response =
        "The Forecasting section uses AI to predict future inventory needs based on historical data. You can view demand forecasts, seasonal trends, and get recommendations for optimal inventory levels."
    } else if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("hey")) {
      response =
        "Hello! I'm your FoodTrack Assistant. I can help you with inventory management, recipes, production planning, quality control, and more. How can I assist you today?"
    } else if (lowerQuery.includes("help") || lowerQuery.includes("what can you do")) {
      response =
        "I can help you with various aspects of the FoodTrack system, including:\n\n- Inventory management\n- Recipe information\n- Production planning\n- Quality control\n- Supplier management\n- Warehouse organization\n- Forecasting and analytics\n\nJust ask me a specific question, and I'll do my best to assist you!"
    } else {
      response =
        "I understand you're asking about \"" +
        latestUserMessage +
        '". As your FoodTrack Assistant, I can help with inventory management, recipes, production planning, quality control, and more. Could you please provide more details about what specific information you need?'
    }

    return new Response(response, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    })
  } catch (error) {
    console.error("Error in chat API route:", error)

    return new Response("Sorry, I encountered an error. Please try again.", {
      status: 200, // Return 200 even for errors to avoid client-side error handling issues
      headers: {
        "Content-Type": "text/plain",
      },
    })
  }
}

