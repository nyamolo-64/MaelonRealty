import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function CostBreakdown({ costItems, totalExpenses, allowance, surplus }) {
  const data = costItems.map(item => ({ name: item.label, value: item.amount, color: item.color }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Spending Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3}>
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip formatter={(val) => [`KES ${val.toLocaleString()}`, '']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar breakdown */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Cost Breakdown</h3>
          <div className="space-y-3">
            {costItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-foreground">KES {item.amount.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground ml-2">{item.pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Monthly Expenses', value: `KES ${totalExpenses.toLocaleString()}`, sub: 'Total outgoing', color: 'text-foreground' },
          { label: 'Monthly Allowance', value: `KES ${allowance.toLocaleString()}`, sub: 'Total incoming', color: 'text-emerald-600' },
          { label: surplus >= 0 ? 'Monthly Savings' : 'Monthly Deficit', value: `${surplus >= 0 ? '+' : ''}KES ${Math.abs(surplus).toLocaleString()}`, sub: surplus >= 0 ? 'Available to save' : 'Need to cover', color: surplus >= 0 ? 'text-emerald-600' : 'text-rose-500' },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-2xl border border-border p-4 text-center">
            <p className={`font-bold text-xl ${s.color}`}>{s.value}</p>
            <p className="text-sm font-medium text-foreground mt-0.5">{s.label}</p>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}