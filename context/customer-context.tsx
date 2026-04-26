'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface Customer {
  id: string
  name: string
  company: string
  churnScore: number
  revenue: number
  lastActivity: string
  status: 'active' | 'at-risk' | 'churned'
  email?: string
  engagementScore?: number
  sentiment?: 'positive' | 'neutral' | 'negative'
  lastEngagement?: string
}

export interface AIRecommendation {
  id: string
  type: 'churn-prevention' | 'upsell' | 'support' | 'product-expansion'
  customerId: string
  title: string
  action: string
  impact: string
  priority: 'high' | 'medium' | 'low'
  completed?: boolean
}

interface CustomerContextType {
  customers: Customer[]
  totalCustomers: number
  highRiskCount: number
  avgChurnScore: number
  totalRevenue: number
  runRetentionAction: (count: number) => void
  retentionMessage: string | null
  updateCustomerStatus: (customerId: string, newStatus: Customer['status']) => void
  getAIRecommendations: () => AIRecommendation[]
  completeRecommendation: (recommendationId: string) => void
  searchCustomers: (query: string) => Customer[]
  filterByEngagement: (threshold: number) => Customer[]
  exportCustomerData: (format: 'csv' | 'json') => string
  getCustomerTimeline: (customerId: string) => { date: string; event: string }[]
  getMetricsTrend: () => { date: string; churnRate: number; revenue: number }[]
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined)

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    company: 'TechCorp Inc',
    churnScore: 0.25,
    revenue: 1500,
    lastActivity: '2 hours ago',
    status: 'active',
    email: 'john@techcorp.com',
    engagementScore: 0.89,
    sentiment: 'positive',
    lastEngagement: '2 hours ago',
  },
  {
    id: '2',
    name: 'Sarah Lee',
    company: 'Digital Ventures',
    churnScore: 0.45,
    revenue: 800,
    lastActivity: '1 day ago',
    status: 'at-risk',
    email: 'sarah@digital.com',
    engagementScore: 0.56,
    sentiment: 'neutral',
    lastEngagement: '3 days ago',
  },
  {
    id: '3',
    name: 'Mike Ross',
    company: 'Innovation Labs',
    churnScore: 0.76,
    revenue: 950,
    lastActivity: '3 days ago',
    status: 'at-risk',
    email: 'mike@innovation.com',
    engagementScore: 0.34,
    sentiment: 'negative',
    lastEngagement: '5 days ago',
  },
  {
    id: '4',
    name: 'Emma Johnson',
    company: 'GlobalNet Solutions',
    churnScore: 0.82,
    revenue: 1200,
    lastActivity: '5 hours ago',
    status: 'at-risk',
    email: 'emma@globalnet.com',
    engagementScore: 0.28,
    sentiment: 'negative',
    lastEngagement: '7 days ago',
  },
  {
    id: '5',
    name: 'David Martinez',
    company: 'CloudBurst Inc',
    churnScore: 0.15,
    revenue: 2100,
    lastActivity: '1 hour ago',
    status: 'active',
    email: 'david@cloudburst.com',
    engagementScore: 0.91,
    sentiment: 'positive',
    lastEngagement: '1 hour ago',
  },
  {
    id: '6',
    name: 'Lisa Wang',
    company: 'Enterprise Solutions',
    churnScore: 0.88,
    revenue: 1800,
    lastActivity: '2 weeks ago',
    status: 'churned',
    email: 'lisa@enterprise.com',
    engagementScore: 0.12,
    sentiment: 'negative',
    lastEngagement: '3 weeks ago',
  },
  {
    id: '7',
    name: 'James Smith',
    company: 'SecureData Corp',
    churnScore: 0.35,
    revenue: 950,
    lastActivity: '4 days ago',
    status: 'active',
    email: 'james@securedata.com',
    engagementScore: 0.78,
    sentiment: 'positive',
    lastEngagement: '2 days ago',
  },
  {
    id: '8',
    name: 'Jennifer Brown',
    company: 'Future Systems',
    churnScore: 0.72,
    revenue: 1450,
    lastActivity: '6 days ago',
    status: 'at-risk',
    email: 'jennifer@future.com',
    engagementScore: 0.45,
    sentiment: 'neutral',
    lastEngagement: '4 days ago',
  },
  {
    id: '9',
    name: 'Robert Taylor',
    company: 'TechVision',
    churnScore: 0.12,
    revenue: 2500,
    lastActivity: '30 minutes ago',
    status: 'active',
    email: 'robert@techvision.com',
    engagementScore: 0.92,
    sentiment: 'positive',
    lastEngagement: '30 minutes ago',
  },
  {
    id: '10',
    name: 'Jessica Chen',
    company: 'DataDrive Analytics',
    churnScore: 0.91,
    revenue: 750,
    lastActivity: '20 days ago',
    status: 'churned',
    email: 'jessica@datadrive.com',
    engagementScore: 0.08,
    sentiment: 'negative',
    lastEngagement: '1 month ago',
  },
]

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS)
  const [retentionMessage, setRetentionMessage] = useState<string | null>(null)
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])

  // Load persisted data on mount
  useEffect(() => {
    const savedCustomers = localStorage.getItem('agentflow_customers')
    if (savedCustomers) {
      try {
        setCustomers(JSON.parse(savedCustomers))
      } catch (e) {
        console.error('Failed to load customer data:', e)
      }
    }
  }, [])

  // Persist data whenever customers change
  useEffect(() => {
    localStorage.setItem('agentflow_customers', JSON.stringify(customers))
    generateRecommendations()
  }, [customers])

  const totalCustomers = customers.length
  const highRiskCount = customers.filter((c) => c.churnScore > 0.7).length
  const avgChurnScore = customers.reduce((sum, c) => sum + c.churnScore, 0) / customers.length
  const totalRevenue = customers.reduce((sum, c) => sum + c.revenue, 0)

  const generateRecommendations = () => {
    const recs: AIRecommendation[] = []

    customers.forEach((customer) => {
      if (customer.churnScore > 0.7 && customer.status !== 'churned') {
        recs.push({
          id: `churn-${customer.id}`,
          type: 'churn-prevention',
          customerId: customer.id,
          title: `Prevent churn for ${customer.name}`,
          action: 'Schedule immediate support call and offer 30% retention discount',
          impact: `Potential revenue at risk: $${customer.revenue}`,
          priority: 'high',
        })
      }

      if (customer.revenue > 1500 && customer.churnScore < 0.5 && (customer.engagementScore || 0) > 0.75) {
        recs.push({
          id: `upsell-${customer.id}`,
          type: 'upsell',
          customerId: customer.id,
          title: `Upsell opportunity for ${customer.name}`,
          action: 'Present premium features and enterprise plan',
          impact: `Potential additional revenue: $${Math.round(customer.revenue * 0.3)}`,
          priority: 'medium',
        })
      }
    })

    setRecommendations(recs)
  }

  const runRetentionAction = (count: number) => {
    setRetentionMessage(`Retention campaign triggered for ${count} customers`)
    setTimeout(() => setRetentionMessage(null), 5000)
  }

  const updateCustomerStatus = useCallback(
    (customerId: string, newStatus: Customer['status']) => {
      setCustomers((prev) =>
        prev.map((c) => (c.id === customerId ? { ...c, status: newStatus, lastActivity: 'Just now' } : c))
      )
    },
    []
  )

  const getAIRecommendations = useCallback(() => {
    return recommendations
  }, [recommendations])

  const completeRecommendation = useCallback((recommendationId: string) => {
    setRecommendations((prev) => prev.map((r) => (r.id === recommendationId ? { ...r, completed: true } : r)))
  }, [])

  const searchCustomers = useCallback(
    (query: string) => {
      const lowerQuery = query.toLowerCase()
      return customers.filter(
        (c) =>
          c.name.toLowerCase().includes(lowerQuery) ||
          c.company.toLowerCase().includes(lowerQuery) ||
          c.email?.toLowerCase().includes(lowerQuery)
      )
    },
    [customers]
  )

  const filterByEngagement = useCallback(
    (threshold: number) => {
      return customers.filter((c) => (c.engagementScore || 0) >= threshold)
    },
    [customers]
  )

  const exportCustomerData = useCallback(
    (format: 'csv' | 'json') => {
      if (format === 'json') {
        return JSON.stringify(customers, null, 2)
      } else {
        const headers = ['ID', 'Name', 'Company', 'Revenue', 'Churn Score', 'Status', 'Email']
        const rows = customers.map((c) => [c.id, c.name, c.company, c.revenue, c.churnScore.toFixed(2), c.status, c.email || ''])
        const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n')
        return csv
      }
    },
    [customers]
  )

  const getCustomerTimeline = useCallback(
    (customerId: string) => {
      const customer = customers.find((c) => c.id === customerId)
      if (!customer) return []

      return [
        { date: customer.lastActivity, event: 'Last activity recorded' },
        { date: customer.lastEngagement || '1 week ago', event: 'Last platform engagement' },
        { date: '30 days ago', event: 'Account anniversary this month' },
      ]
    },
    [customers]
  )

  const getMetricsTrend = useCallback(() => {
    return [
      { date: '5 days ago', churnRate: 0.28, revenue: 17500 },
      { date: '4 days ago', churnRate: 0.32, revenue: 18200 },
      { date: '3 days ago', churnRate: 0.38, revenue: 17900 },
      { date: '2 days ago', churnRate: 0.35, revenue: 18500 },
      { date: '1 day ago', churnRate: 0.32, revenue: 18800 },
      { date: 'Today', churnRate: avgChurnScore, revenue: totalRevenue },
    ]
  }, [avgChurnScore, totalRevenue])

  return (
    <CustomerContext.Provider
      value={{
        customers,
        totalCustomers,
        highRiskCount,
        avgChurnScore,
        totalRevenue,
        runRetentionAction,
        retentionMessage,
        updateCustomerStatus,
        getAIRecommendations,
        completeRecommendation,
        searchCustomers,
        filterByEngagement,
        exportCustomerData,
        getCustomerTimeline,
        getMetricsTrend,
      }}
    >
      {children}
    </CustomerContext.Provider>
  )
}

export function useCustomers() {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error('useCustomers must be used within CustomerProvider')
  }
  return context
}
