'use client'

import { AppLayout } from '@/components/app-layout'
import { ChatInterface } from '@/components/chat-interface'
import { Brain, Activity, Users } from 'lucide-react'
import { useCustomers } from '@/context/customer-context'

export default function AgentConsolePage() {
  const { customers, highRiskCount, runRetentionAction } = useCustomers()

  const handleQuickPrompt = (prompt: string) => {
    const textarea = document.querySelector('textarea')
    if (textarea) {
      textarea.value = prompt
      textarea.focus()
    }
  }

  return (
    <AppLayout>
      <div className="p-8 h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-foreground mb-2">Agent Console</h1>
          <p className="text-foreground/70">Interact with your autonomous AI customer analytics agent</p>
        </div>

        {/* Main Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
          {/* Chat Interface - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 min-h-0">
            <ChatInterface />
          </div>

          {/* Right Sidebar - Agent Info & Quick Actions */}
          <div className="space-y-6">
            {/* Agent Status */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <h3 className="font-semibold text-foreground">Agent Status</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-foreground/70 mb-1">System</p>
                  <p className="text-green-400 font-medium">Active & Monitoring</p>
                </div>
                <div>
                  <p className="text-foreground/70 mb-1">Last Update</p>
                  <p className="text-foreground">2 minutes ago</p>
                </div>
                <div>
                  <p className="text-foreground/70 mb-1">Processing</p>
                  <p className="text-foreground">847 actions queued</p>
                </div>
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Prompts</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => handleQuickPrompt('Show me my high churn risk customers')}
                  className="w-full px-4 py-2 bg-background hover:bg-background/80 border border-border rounded-lg text-left text-sm text-foreground/80 transition-colors"
                >
                  Who are my at-risk customers?
                </button>
                <button 
                  onClick={() => handleQuickPrompt('What are the upsell opportunities?')}
                  className="w-full px-4 py-2 bg-background hover:bg-background/80 border border-border rounded-lg text-left text-sm text-foreground/80 transition-colors"
                >
                  Show upsell opportunities
                </button>
                <button 
                  onClick={() => handleQuickPrompt('Execute retention actions')}
                  className="w-full px-4 py-2 bg-background hover:bg-background/80 border border-border rounded-lg text-left text-sm text-foreground/80 transition-colors"
                >
                  Execute retention actions
                </button>
                <button 
                  onClick={() => handleQuickPrompt('Generate customer summary')}
                  className="w-full px-4 py-2 bg-background hover:bg-background/80 border border-border rounded-lg text-left text-sm text-foreground/80 transition-colors"
                >
                  Generate churn report
                </button>
              </div>
            </div>

            {/* Run Retention Action Button */}
            <button 
              onClick={() => runRetentionAction(highRiskCount)}
              className="w-full px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-all"
            >
              Run Retention Action ({highRiskCount} customers)
            </button>

            {/* Current Tasks */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Recent Actions</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Activity className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-foreground font-medium">Sent 234 re-engagement emails</p>
                    <p className="text-foreground/70 text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-foreground font-medium">Identified 89 upsell prospects</p>
                    <p className="text-foreground/70 text-xs">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Brain className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-foreground font-medium">Updated churn predictions</p>
                    <p className="text-foreground/70 text-xs">6 hours ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Capabilities */}
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Agent Capabilities</h3>
              <div className="space-y-2 text-sm text-foreground/80">
                <p>✓ Real-time churn prediction</p>
                <p>✓ Conversion lead scoring</p>
                <p>✓ Automated outreach</p>
                <p>✓ Behavior analysis</p>
                <p>✓ Custom report generation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
