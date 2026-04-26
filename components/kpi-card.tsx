import { ReactNode } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  change: number
  changeLabel: string
  icon: ReactNode
  isPositive?: boolean
}

export function KPICard({
  title,
  value,
  change,
  changeLabel,
  icon,
  isPositive = true,
}: KPICardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-foreground/70 mb-2">{title}</p>
          <p className="text-3xl font-bold text-foreground mb-4">{value}</p>
          <div className="flex items-center gap-2">
            {isPositive ? (
              <ArrowUp className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDown className="w-4 h-4 text-red-500" />
            )}
            <span className={isPositive ? 'text-green-500 text-sm font-medium' : 'text-red-500 text-sm font-medium'}>
              {Math.abs(change)}% {changeLabel}
            </span>
          </div>
        </div>
        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
          {icon}
        </div>
      </div>
    </div>
  )
}
