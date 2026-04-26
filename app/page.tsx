'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, Zap, Brain, BarChart3 } from 'lucide-react'
import { useState } from 'react'

export default function LandingPage() {
  const router = useRouter()
  const [deployToastVisible, setDeployToastVisible] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactFormSuccess, setContactFormSuccess] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleGetStarted = () => {
    router.push('/dashboard')
  }

  const handleDeployAgents = () => {
    setDeployToastVisible(true)
    setTimeout(() => setDeployToastVisible(false), 3000)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setContactFormSuccess(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => {
      setContactFormSuccess(false)
      setShowContactForm(false)
    }, 2000)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card flex flex-col">
      {/* Header */}
      <header className="px-8 py-6 flex justify-between items-center border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-accent-foreground rounded" />
          </div>
          <span className="font-semibold text-lg">AgentFlow</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => handleScroll('features')} className="px-6 py-2 text-foreground/70 hover:text-foreground transition-colors">
            Features
          </button>
          <button onClick={() => handleScroll('pricing')} className="px-6 py-2 text-foreground/70 hover:text-foreground transition-colors">
            Pricing
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-8 py-20">
        <div className="max-w-4xl w-full">
          <div className="text-center space-y-8 animate-in fade-in duration-700">
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">Powered by Autonomous AI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl font-bold tracking-tight text-balance">
              AI-powered CRM with{' '}
              <span className="bg-gradient-to-r from-accent via-accent to-blue-400 bg-clip-text text-transparent">
                autonomous agents
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed text-balance">
              Predict, decide, and automate customer workflows using AI. Let intelligent agents handle your customer relationships while you focus on growth.
            </p>

            {/* Features Grid */}
            <div id="features" className="grid grid-cols-3 gap-6 my-12">
              <div className="p-6 rounded-xl bg-card border border-border/50 hover:border-accent/50 transition-all">
                <Brain className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Predictive Analytics</h3>
                <p className="text-sm text-foreground/60">AI predicts churn, conversion, and customer lifetime value</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border/50 hover:border-accent/50 transition-all">
                <Zap className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Autonomous Agents</h3>
                <p className="text-sm text-foreground/60">AI agents automatically execute actions and strategies</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border/50 hover:border-accent/50 transition-all">
                <BarChart3 className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Real-time Insights</h3>
                <p className="text-sm text-foreground/60">Monitor customer behavior and metrics in real-time</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center gap-4 pt-6">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-all hover:gap-3"
              >
                Enter App
                <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={handleDeployAgents} className="px-8 py-4 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-colors">
                Deploy AI Agents
              </button>
            </div>
          </div>

          {/* Pricing Section */}
          <div id="pricing" className="mt-32 pt-20 border-t border-border/50">
            <h2 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="p-8 rounded-xl bg-card border border-border/50 hover:border-accent/50 transition-all">
                <h3 className="font-semibold text-lg mb-2">Starter</h3>
                <p className="text-3xl font-bold text-accent mb-6">$99<span className="text-sm text-foreground/70">/mo</span></p>
                <ul className="space-y-3 text-sm mb-6">
                  <li>✓ Up to 1,000 customers</li>
                  <li>✓ Basic predictive analytics</li>
                  <li>✓ Email support</li>
                </ul>
                <button onClick={handleGetStarted} className="w-full px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors">Get Started</button>
              </div>
              <div className="p-8 rounded-xl bg-card border border-accent/50 hover:border-accent transition-all ring-1 ring-accent/30">
                <div className="inline-block px-3 py-1 bg-accent/20 rounded-full text-sm font-semibold text-accent mb-4">Popular</div>
                <h3 className="font-semibold text-lg mb-2">Professional</h3>
                <p className="text-3xl font-bold text-accent mb-6">$299<span className="text-sm text-foreground/70">/mo</span></p>
                <ul className="space-y-3 text-sm mb-6">
                  <li>✓ Up to 10,000 customers</li>
                  <li>✓ Advanced AI predictions</li>
                  <li>✓ Autonomous agents</li>
                  <li>✓ Priority support</li>
                </ul>
                <button onClick={handleGetStarted} className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-all">Get Started</button>
              </div>
              <div className="p-8 rounded-xl bg-card border border-border/50 hover:border-accent/50 transition-all">
                <h3 className="font-semibold text-lg mb-2">Enterprise</h3>
                <p className="text-3xl font-bold text-accent mb-6">Custom</p>
                <ul className="space-y-3 text-sm mb-6">
                  <li>✓ Unlimited customers</li>
                  <li>✓ Full AI automation</li>
                  <li>✓ Custom integrations</li>
                  <li>✓ Dedicated support</li>
                </ul>
                <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors">Contact Sales</button>
              </div>
            </div>
          </div>

          {/* Ready to Transform Section */}
          <div className="mt-32 pt-20 border-t border-border/50">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Ready to Transform Your Customer Experience with AI?</h2>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Join companies using AI-driven insights and autonomous agents to increase retention, boost revenue, and automate workflows.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex justify-center gap-4 pt-4">
                <button
                  onClick={handleGetStarted}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-all hover:gap-3"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="px-8 py-4 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-colors"
                >
                  Contact Sales
                </button>
              </div>

              {/* Trust Line */}
              <p className="text-sm text-foreground/60 pt-4">Trusted by modern data-driven teams</p>
            </div>
          </div>
        </div>
      </main>

      {/* Deploy Toast */}
      {deployToastVisible && (
        <div className="fixed bottom-8 right-8 px-6 py-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
          <p className="font-semibold">AI agents deployed successfully</p>
          <p className="text-sm text-green-400/80">Monitoring customer interactions in real-time</p>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full shadow-lg animate-in fade-in zoom-in duration-300">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Contact Sales</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>

              {contactFormSuccess ? (
                <div className="text-center py-8">
                  <p className="text-green-400 font-semibold mb-2">Thanks! Our team will reach out shortly.</p>
                  <p className="text-foreground/70">We appreciate your interest in AgentFlow.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      placeholder="Tell us about your needs..."
                      rows={4}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-all"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
