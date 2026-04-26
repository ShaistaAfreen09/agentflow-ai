'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, ChevronUp, ChevronDown } from 'lucide-react'
import { useCustomers, type Customer } from '@/context/customer-context'
import { CustomerDetailPanel } from './customer-detail-panel'

export function CustomerTable() {
  const { customers } = useCustomers()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortField, setSortField] = useState<'name' | 'churnScore'>('churnScore')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const filteredCustomers = useMemo(() => {
    let filtered = customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.company.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = filterStatus === 'all' || customer.status === filterStatus
      return matchesSearch && matchesFilter
    })

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField]
      let bVal = b[sortField]
      if (sortDir === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    return filtered
  }, [searchQuery, filterStatus, sortField, sortDir])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-400'
      case 'at-risk':
        return 'bg-yellow-500/10 text-yellow-400'
      case 'churned':
        return 'bg-red-500/10 text-red-400'
      default:
        return 'bg-gray-500/10 text-gray-400'
    }
  }

  const toggleSort = (field: 'name' | 'churnScore') => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-80">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-foreground/50" />
            <input
              type="text"
              placeholder="Search by name or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg text-foreground hover:border-accent transition-colors">
            <Filter className="w-4 h-4" />
            <span>All Statuses</span>
          </button>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="at-risk">At Risk</option>
            <option value="churned">Churned</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/70">
                  <button
                    onClick={() => toggleSort('name')}
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    Name
                    {sortField === 'name' && (
                      sortDir === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/70">Company</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/70">Last Activity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/70">
                  <button
                    onClick={() => toggleSort('churnScore')}
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    Churn Score
                    {sortField === 'churnScore' && (
                      sortDir === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/70">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    onClick={() => setSelectedCustomer(customer)}
                    className="border-b border-border hover:bg-background/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{customer.name}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{customer.company}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{customer.lastActivity}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-background rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              customer.churnScore < 0.5
                                ? 'bg-green-500'
                                : customer.churnScore < 0.8
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                            }`}
                            style={{ width: `${customer.churnScore * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-foreground/70 w-10">{(customer.churnScore * 100).toFixed(0)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-foreground/50">
                    No customers found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Panel */}
      <CustomerDetailPanel customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
    </div>
  )
}
