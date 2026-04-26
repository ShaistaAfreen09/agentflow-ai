'use client'

import { useCustomers } from '@/context/customer-context'

export function MetricsTrend() {
  const { getMetricsTrend } = useCustomers()
  const trends = getMetricsTrend()

  const maxChurnRate = Math.max(...trends.map((t) => t.churnRate))
  const maxRevenue = Math.max(...trends.map((t) => t.revenue))

  return (
    <div className="space-y-6">
      {/* Churn Rate Trend */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Churn Rate Trend</h3>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-end gap-2 h-32 justify-between">
            {trends.map((trend, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-accent to-accent rounded-t"
                  style={{ height: `${(trend.churnRate / maxChurnRate) * 100}%` }}
                />
                <span className="text-xs text-foreground/60 text-center">{trend.date}</span>
                <span className="text-xs font-semibold text-foreground">{(trend.churnRate * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Trend */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Revenue Trend</h3>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-end gap-2 h-32 justify-between">
            {trends.map((trend, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t"
                  style={{ height: `${(trend.revenue / maxRevenue) * 100}%` }}
                />
                <span className="text-xs text-foreground/60 text-center">{trend.date}</span>
                <span className="text-xs font-semibold text-foreground">${(trend.revenue / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
