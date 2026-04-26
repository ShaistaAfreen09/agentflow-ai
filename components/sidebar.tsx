'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Users, Brain, MessageSquare, Home, Lightbulb } from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }

  const navItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/business-intelligence', label: 'Business Intelligence', icon: BarChart3 },
    { href: '/customer-360', label: 'Customer 360', icon: Users },
    { href: '/predictive-ai', label: 'Predictive AI', icon: Brain },
    { href: '/insights', label: 'Insights', icon: Lightbulb },
    { href: '/agent-console', label: 'Agent Console', icon: MessageSquare },
  ]

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-accent-foreground rounded" />
          </div>
          <span className="font-semibold text-lg text-foreground">AgentFlow</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                active
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="px-4 py-3 bg-sidebar-accent/10 rounded-lg text-sm text-sidebar-foreground">
          <p className="font-medium mb-1">AI Agent Status</p>
          <p className="text-sidebar-foreground/70">Active & Monitoring</p>
        </div>
      </div>
    </aside>
  )
}
