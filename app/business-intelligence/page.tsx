'use client'

import { Users, AlertCircle, TrendingUp } from 'lucide-react'
import { AppLayout } from '@/components/app-layout'
import { KPICard } from '@/components/kpi-card'
import { useCustomers } from '@/context/customer-context'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const churnData = [
  { month: 'Jan', churnRate: 5.2 },
  { month: 'Feb', churnRate: 4.8 },
  { month: 'Mar', churnRate: 6.1 },
  { month: 'Apr', churnRate: 5.5 },
  { month: 'May', churnRate: 4.2 },
  { month: 'Jun', churnRate: 3.8 },
]

const segmentData = [
  { name: 'Enterprise', value: 35, color: '#3b82f6' },
  { name: 'Mid-Market', value: 28, color: '#60a5fa' },
  { name: 'SMB', value: 22, color: '#93c5fd' },
  { name: 'Startup', value: 15, color: '#dbeafe' },
]

const conversionData = [
  { week: 'W1', conversion: 2.4 },
  { week: 'W2', conversion: 2.1 },
  { week: 'W3', conversion: 2.8 },
  { week: 'W4', conversion: 3.2 },
  { week: 'W5', conversion: 2.9 },
  { week: 'W6', conversion: 3.5 },
]

export default function BusinessIntelligencePage() {
  const { totalCustomers, highRiskCount, avgChurnScore } = useCustomers()

  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Business Intelligence Hub</h1>
          <p className="text-foreground/70">Real-time analytics and customer insights</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            title="Total Customers"
            value={totalCustomers.toLocaleString()}
            change={12.5}
            changeLabel="this month"
            icon={<Users className="w-6 h-6" />}
            isPositive={true}
          />
          <KPICard
            title="High Risk Customers"
            value={highRiskCount.toString()}
            change={8.2}
            changeLabel="increasing"
            icon={<AlertCircle className="w-6 h-6" />}
            isPositive={false}
          />
          <KPICard
            title="Avg Churn Score"
            value={(avgChurnScore * 100).toFixed(1) + '%'}
            change={5.8}
            changeLabel="improvement"
            icon={<TrendingUp className="w-6 h-6" />}
            isPositive={true}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Churn Distribution */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Churn Rate Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={churnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
                <XAxis stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="churnRate"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Customer Segmentation */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Customer Segmentation</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Conversion Rate */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-foreground mb-6">Weekly Conversion Rate</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
                <XAxis stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="conversion" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
