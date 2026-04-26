'use client'

import { AppLayout } from '@/components/app-layout'
import { AIRecommendations } from '@/components/ai-recommendations'
import { MetricsTrend } from '@/components/metrics-trend'
import { useCustomers } from '@/context/customer-context'

export default function InsightsPage() {
  const { getAIRecommendations } = useCustomers()
  const recommendations = getAIRecommendations()
  const activeCount = recommendations.filter((r) => !r.completed).length

  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Insights & Recommendations</h1>
          <p className="text-foreground/70">AI-powered analysis and actionable recommendations for your customer base</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-foreground/70 mb-2">Active Recommendations</p>
            <p className="text-4xl font-bold text-accent">{activeCount}</p>
            <p className="text-xs text-foreground/60 mt-2">Awaiting action</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-foreground/70 mb-2">Priority Items</p>
            <p className="text-4xl font-bold text-red-400">{recommendations.filter((r) => r.priority === 'high' && !r.completed).length}</p>
            <p className="text-xs text-foreground/60 mt-2">High priority actions</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-foreground/70 mb-2">Completed</p>
            <p className="text-4xl font-bold text-green-400">{recommendations.filter((r) => r.completed).length}</p>
            <p className="text-xs text-foreground/60 mt-2">Actions taken</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recommendations */}
          <div className="bg-card border border-border rounded-xl p-6">
            <AIRecommendations />
          </div>

          {/* Metrics Trend */}
          <div className="bg-card border border-border rounded-xl p-6">
            <MetricsTrend />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
