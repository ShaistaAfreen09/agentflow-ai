'use client'

import { CheckCircle2, AlertCircle, TrendingUp, Zap } from 'lucide-react'
import { useCustomers } from '@/context/customer-context'

export function AIRecommendations() {
  const { getAIRecommendations, completeRecommendation } = useCustomers()
  const recommendations = getAIRecommendations()

  const typeIcons = {
    'churn-prevention': <AlertCircle className="w-5 h-5 text-red-400" />,
    upsell: <TrendingUp className="w-5 h-5 text-green-400" />,
    support: <Zap className="w-5 h-5 text-yellow-400" />,
    'product-expansion': <TrendingUp className="w-5 h-5 text-blue-400" />,
  }

  const priorityBgColors = {
    high: 'bg-red-500/10 border-red-500/30',
    medium: 'bg-yellow-500/10 border-yellow-500/30',
    low: 'bg-blue-500/10 border-blue-500/30',
  }

  const activRecommendations = recommendations.filter((r) => !r.completed)
  const completedRecommendations = recommendations.filter((r) => r.completed)

  return (
    <div className="space-y-6">
      {/* Active Recommendations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Active Recommendations</h3>
          <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold">{activRecommendations.length}</span>
        </div>

        <div className="space-y-3">
          {activRecommendations.length === 0 ? (
            <div className="text-center py-8 text-foreground/60">
              <p>No active recommendations. Your customer health is excellent!</p>
            </div>
          ) : (
            activRecommendations.map((rec) => (
              <div key={rec.id} className={`border border-border/50 rounded-lg p-4 ${priorityBgColors[rec.priority]}`}>
                <div className="flex items-start gap-3 mb-3">
                  {typeIcons[rec.type]}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground mb-1">{rec.title}</h4>
                    <p className="text-sm text-foreground/70">{rec.action}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                    rec.priority === 'high'
                      ? 'bg-red-500/30 text-red-300'
                      : rec.priority === 'medium'
                        ? 'bg-yellow-500/30 text-yellow-300'
                        : 'bg-blue-500/30 text-blue-300'
                  }`}>
                    {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-foreground/60">{rec.impact}</p>
                  <button
                    onClick={() => completeRecommendation(rec.id)}
                    className="px-3 py-1 bg-foreground/10 hover:bg-foreground/20 rounded text-xs text-foreground transition-colors"
                  >
                    Complete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Completed Recommendations */}
      {completedRecommendations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Completed</h3>
          <div className="space-y-2">
            {completedRecommendations.slice(0, 3).map((rec) => (
              <div key={rec.id} className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm text-foreground/70">{rec.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
