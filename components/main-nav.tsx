import Link from "next/link"
import {
  Package,
  Bot,
  BarChart3,
  BoxIcon,
  ClipboardList,
  TrendingUp,
  Warehouse,
  FlaskRoundIcon as Flask,
  Utensils,
  ShoppingCart,
  Settings,
} from "lucide-react"

export function MainNav() {
  return (
    <div className="fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <span className="text-lg font-semibold">FoodTrack</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/assistant"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Bot className="h-5 w-5" />
              Assistant
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/inventory"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <BoxIcon className="h-5 w-5" />
              Inventory
            </Link>
          </li>
          <li>
            <Link
              href="/batches"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ClipboardList className="h-5 w-5" />
              Batches
            </Link>
          </li>
          <li>
            <Link
              href="/recipes"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Utensils className="h-5 w-5" />
              Recipes
            </Link>
          </li>
          <li>
            <Link
              href="/production"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Package className="h-5 w-5" />
              Production
            </Link>
          </li>
          <li>
            <Link
              href="/suppliers"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Suppliers
            </Link>
          </li>
          <li>
            <Link
              href="/quality"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Flask className="h-5 w-5" />
              Quality
            </Link>
          </li>
          <li>
            <Link
              href="/warehouses"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Warehouse className="h-5 w-5" />
              Warehouses
            </Link>
          </li>
          <li>
            <Link
              href="/forecasting"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <TrendingUp className="h-5 w-5" />
              Forecasting
            </Link>
          </li>
          <li>
            <Link
              href="/analytics"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <BarChart3 className="h-5 w-5" />
              Analytics
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto border-t p-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
      </div>
    </div>
  )
}

