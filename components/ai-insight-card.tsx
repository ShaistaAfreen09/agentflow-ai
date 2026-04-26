import { AlertTriangle, TrendingUp, Target, Zap } from 'lucide-react'

interface AIInsightCardProps {
  title: string
  description: string
  metric: string
  count: string | number
  insights: string[]
  type: 'churn' | 'conversion' | 'opportunity' | 'action'
}

export function AIInsightCard({
  title,
  description,
  metric,
  count,
  insights,
  type,
}: AIInsightCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'churn':
        return <AlertTriangle className="w-6 h-6 text-red-400" />
      case 'conversion':
        return <TrendingUp className="w-6 h-6 text-green-400" />
      case 'opportunity':
        return <Target className="w-6 h-6 text-blue-400" />
      case 'action':
        return <Zap className="w-6 h-6 text-yellow-400" />
    }
  }

  const getBorderColor = () => {
    switch (type) {
      case 'churn':
        return 'border-red-500/30 bg-red-500/5'
      case 'conversion':
        return 'border-green-500/30 bg-green-500/5'
      case 'opportunity':
        return 'border-blue-500/30 bg-blue-500/5'
      case 'action':
        return 'border-yellow-500/30 bg-yellow-500/5'
    }
  }

  return (
    <div className={`border rounded-xl p-6 ${getBorderColor()}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-foreground/70">{description}</p>
        </div>
        {getIcon()}
      </div>

      <div className="mb-6 py-4 border-t border-b border-foreground/10">
        <p className="text-sm text-foreground/70 mb-1">{metric}</p>
        <p className="text-3xl font-bold text-foreground">{count}</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-foreground/70 uppercase mb-3">AI Analysis</p>
        <div className="space-y-2">
          {insights.map((insight, idx) => (
            <div key={idx} className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-1.5 flex-shrink-0" />
              <p className="text-sm text-foreground/80">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
