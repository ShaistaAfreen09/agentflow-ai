'use client'

import { AppLayout } from '@/components/app-layout'
import { AIInsightCard } from '@/components/ai-insight-card'
import { useCustomers } from '@/context/customer-context'

export default function PredictiveAIPage() {
  const { customers, highRiskCount, totalRevenue } = useCustomers()
  
  const highRevenueLow = customers.filter((c) => c.revenue > 1500 && c.churnScore < 0.5).length
  const upsellRevenue = Math.round(customers.filter((c) => c.churnScore > 0.7 && c.revenue > 1000).length * 2.4)

  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Predictive AI Analysis</h1>
          <p className="text-foreground/70">AI-powered predictions based on behavior patterns and activity history</p>
        </div>

        {/* AI Explanation Box */}
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-2">How Our AI Works</h3>
          <p className="text-foreground/80 leading-relaxed">
            Our machine learning models analyze customer behavior patterns, engagement metrics, transaction history, and industry trends to predict churn risk and conversion opportunities. The system continuously learns from outcomes to improve accuracy over time.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* High Churn Customers */}
          <AIInsightCard
            title="High Churn Risk Customers"
            description="Customers likely to churn in the next 30 days"
            metric="Customers at High Risk"
            count={highRiskCount}
            type="churn"
            insights={[
              'Recent decrease in feature usage (-45% last 30 days)',
              'No interaction with support team for 45+ days',
              'Payment failures detected in the last 2 months',
              'Similar behavioral patterns to 89% of churned customers',
            ]}
          />

          {/* High Value Customers */}
          <AIInsightCard
            title="High Value Low Churn"
            description="Most valuable customers with low churn risk"
            metric="Loyal High Value"
            count={highRevenueLow}
            type="conversion"
            insights={[
              'Average revenue per customer: $2,100+',
              'Engagement score in top 20% of user base',
              'Strong retention history (95%+ retained)',
              'Excellent upsell candidates for premium features',
            ]}
          />

          {/* Upsell Opportunities */}
          <AIInsightCard
            title="Upsell Opportunities"
            description="Customers ready for plan upgrades"
            metric="Expansion Revenue"
            count={`$${upsellRevenue}K`}
            type="opportunity"
            insights={[
              'Currently using 70%+ of available plan features',
              'Growing usage rate (avg +12% per month)',
              'Team size doubled in last quarter',
              'Competitors identified using more advanced features',
            ]}
          />

          {/* Recommended Actions */}
          <AIInsightCard
            title="Recommended AI Actions"
            description="Autonomous agent suggested workflows"
            metric="Pending Actions"
            count={customers.length * 5}
            type="action"
            insights={[
              `Send re-engagement emails to ${highRiskCount} at-risk customers`,
              `Schedule calls with ${Math.floor(highRiskCount * 0.8)} high-value accounts`,
              `Offer 50% discount trials to ${highRevenueLow} conversion-ready users`,
              `Personalized recommendations for ${customers.length - highRiskCount} customers`,
            ]}
          />
        </div>

        {/* Bottom CTA */}
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Activate AI Recommendations?</h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Deploy our autonomous agents to automatically execute retention strategies, send personalized communications, and optimize customer lifecycle management.
          </p>
          <button className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-all">
            Deploy AI Agents
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
