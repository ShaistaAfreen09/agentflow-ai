'use client'

import { X, Calendar, Mail, TrendingDown, MessageSquare } from 'lucide-react'
import { useCustomers, type Customer } from '@/context/customer-context'

interface CustomerDetailPanelProps {
  customer: Customer | null
  onClose: () => void
}

export function CustomerDetailPanel({ customer, onClose }: CustomerDetailPanelProps) {
  const { getCustomerTimeline, updateCustomerStatus } = useCustomers()

  if (!customer) return null

  const timeline = getCustomerTimeline(customer.id)
  const sentimentColors = {
    positive: 'text-green-400 bg-green-500/20',
    neutral: 'text-yellow-400 bg-yellow-500/20',
    negative: 'text-red-400 bg-red-500/20',
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{customer.name}</h2>
            <p className="text-foreground/60">{customer.company}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-background rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background rounded-lg p-4">
              <p className="text-sm text-foreground/60 mb-1">Annual Revenue</p>
              <p className="text-2xl font-bold text-accent">${customer.revenue.toLocaleString()}</p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-sm text-foreground/60 mb-1">Churn Risk</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      customer.churnScore < 0.5 ? 'bg-green-500' : customer.churnScore < 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${customer.churnScore * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold w-10">{(customer.churnScore * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-sm text-foreground/60 mb-1">Engagement</p>
              <p className="text-2xl font-bold text-accent">{((customer.engagementScore || 0) * 100).toFixed(0)}%</p>
            </div>
            <div className={`rounded-lg p-4 ${sentimentColors[customer.sentiment || 'neutral']}`}>
              <p className="text-sm opacity-70 mb-1">Sentiment</p>
              <p className="text-lg font-bold capitalize">{customer.sentiment || 'neutral'}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-foreground/40" />
              <div>
                <p className="text-sm text-foreground/60">Email</p>
                <p className="text-foreground">{customer.email || 'Not available'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-foreground/40" />
              <div>
                <p className="text-sm text-foreground/60">Last Activity</p>
                <p className="text-foreground">{customer.lastActivity}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Activity Timeline</h3>
            <div className="space-y-2">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-foreground/40" />
                    <span className="text-foreground/60 w-24">{item.date}</span>
                  </div>
                  <span className="text-foreground">{item.event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Change */}
          {customer.status !== 'churned' && (
            <div className="flex gap-2">
              {customer.status === 'at-risk' && (
                <button
                  onClick={() => updateCustomerStatus(customer.id, 'active')}
                  className="flex-1 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                >
                  Mark as Active
                </button>
              )}
              {customer.status === 'active' && (
                <button
                  onClick={() => updateCustomerStatus(customer.id, 'churned')}
                  className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  Mark as Churned
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
