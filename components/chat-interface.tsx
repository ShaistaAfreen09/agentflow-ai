'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader } from 'lucide-react'
import { useCustomers } from '@/context/customer-context'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isLoading?: boolean
}

export function ChatInterface() {
  const { customers, highRiskCount, totalCustomers, runRetentionAction, retentionMessage } = useCustomers()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hi! I'm your AI Agent. I'm monitoring your customer data in real-time. Ask me about churn risk, upsell opportunities, or retention actions!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from API')
      }

      const data = await response.json()
      const responseText = data.message

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          'Sorry, I encountered an error. Please ensure your OpenRouter API key is configured in the environment variables.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-background/50">
        <h2 className="text-lg font-semibold text-foreground">Agent Console</h2>
        <p className="text-sm text-foreground/70">Chat with your AI customer analytics agent</p>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}
          >
            <div
              className={`max-w-md ${
                message.role === 'user'
                  ? 'bg-accent text-accent-foreground rounded-lg rounded-tr-none'
                  : 'bg-background border border-border text-foreground rounded-lg rounded-tl-none'
              } px-4 py-3`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-accent-foreground/70' : 'text-foreground/50'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-background border border-border text-foreground rounded-lg rounded-tl-none px-4 py-3 flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin text-accent" />
              <span className="text-sm">Agent is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Retention Message */}
      {retentionMessage && (
        <div className="px-6 py-3 bg-green-500/10 border-t border-green-500/30 text-green-400 text-sm flex items-center justify-between">
          <span>{retentionMessage}</span>
          <span className="text-xs animate-pulse">✓ Campaign running</span>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border p-6 bg-background/50">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about your customers, predictions, or actions..."
            className="flex-1 bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/50 resize-none focus:outline-none focus:border-accent max-h-24"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  )
}
