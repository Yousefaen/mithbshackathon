// This is a fallback response generator when the OpenAI API is unavailable

export function generateFallbackResponse(query: string): string {
  // Simple keyword matching for common questions
  const lowerQuery = query.toLowerCase()

  if (lowerQuery.includes("inventory") && lowerQuery.includes("low")) {
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

  // Default response if no keywords match
  return "I'm your FoodTrack Assistant. I can help you with inventory management, recipes, production planning, quality control, and more. Please ask a specific question about the system, and I'll do my best to assist you."
}

