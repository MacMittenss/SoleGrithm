import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Props {
  sneakerId: number;
  sneakerName?: string;
}

function groupByDay(priceHistory: Array<{ price: number; timestamp: string | Date }>) {
  const map = new Map<string, { total: number; count: number }>();
  priceHistory.forEach((p) => {
    const d = new Date(p.timestamp);
    const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
    const curr = map.get(key) || { total: 0, count: 0 };
    curr.total += Number(p.price || 0);
    curr.count += 1;
    map.set(key, curr);
  });

  const arr = Array.from(map.entries()).map(([day, v]) => ({
    date: day,
    avg: v.count > 0 ? +(v.total / v.count).toFixed(2) : 0,
  }));
  // sort by date
  arr.sort((a, b) => (a.date < b.date ? -1 : 1));
  return arr;
}

export default function ProductPriceChart({ sneakerId, sneakerName }: Props) {
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ['/api/market/analytics', sneakerId],
    queryFn: async () => {
      const res = await fetch(`/api/market/analytics/${sneakerId}`);
      if (!res.ok) throw new Error('Failed to fetch market analytics');
      return res.json();
    },
    staleTime: 30_000,
    refetchInterval: 30_000,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">Loading chart…</div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center text-sm text-red-500">Chart unavailable</div>
        </CardContent>
      </Card>
    );
  }

  const history = (data && (data.priceHistory || data.price_history)) || [];
  const series = groupByDay(history);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Price History</span>
          {data && (
            <div className="text-right">
              <div className="text-lg font-bold">${data.currentPrice || 0}</div>
              <div className={`text-sm ${data.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {data.priceChange24h >= 0 ? '+' : ''}${data.priceChange24h?.toFixed(2) || 0} 
                ({data.priceChangePercent >= 0 ? '+' : ''}{data.priceChangePercent?.toFixed(1) || 0}%)
              </div>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {series.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">No price history available</div>
        ) : (
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <LineChart data={series}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 11 }}
                  tickFormatter={(date) => {
                    const d = new Date(date);
                    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  }}
                />
                <YAxis 
                  tickFormatter={(v) => `$${v}`} 
                  tick={{ fontSize: 11 }}
                  domain={['dataMin - 10', 'dataMax + 10']}
                />
                <Tooltip 
                  formatter={(value: any, name: string) => [`$${value}`, 'Average Price']}
                  labelFormatter={(date) => {
                    const d = new Date(date);
                    return d.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    });
                  }}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="avg" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#3b82f6', stroke: '#ffffff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
