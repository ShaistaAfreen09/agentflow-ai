'use client'

import { AppLayout } from '@/components/app-layout'
import { CustomerTable } from '@/components/customer-table'
import { useCustomers } from '@/context/customer-context'

export default function Customer360Page() {
  const { totalCustomers, highRiskCount, customers } = useCustomers()
  const churnedCount = customers.filter((c) => c.status === 'churned').length

  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Customer 360</h1>
          <p className="text-foreground/70">View detailed customer profiles and churn risk analysis</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-foreground/70 mb-1">Total Customers Monitored</p>
            <p className="text-2xl font-bold text-foreground">{totalCustomers.toLocaleString()}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-foreground/70 mb-1">High Risk (Churn Score {'>'} 0.7)</p>
            <p className="text-2xl font-bold text-foreground">{highRiskCount}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-foreground/70 mb-1">Recently Churned</p>
            <p className="text-2xl font-bold text-foreground">{churnedCount}</p>
          </div>
        </div>

        {/* Table */}
        <CustomerTable />
      </div>
    </AppLayout>
  )
}
