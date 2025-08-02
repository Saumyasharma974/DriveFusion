import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Battery, TrendingUp } from 'lucide-react';

const BatteryHealthChart = ({ data }) => {
  // Generate historical data for the chart
  const generateHistoricalData = () => {
    const points = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hour = time.getHours();
      
      // Simulate realistic battery drain throughout the day
      let batteryLevel = 90;
      if (hour >= 8 && hour <= 18) {
        // Daytime usage
        batteryLevel = 90 - ((hour - 8) * 7) + Math.random() * 10;
      } else if (hour > 18 && hour <= 22) {
        // Evening usage
        batteryLevel = 60 - ((hour - 18) * 5) + Math.random() * 8;
      } else {
        // Night/early morning - minimal usage
        batteryLevel = 85 + Math.random() * 10;
      }
      
      points.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        battery: Math.max(20, Math.min(100, batteryLevel)),
        voltage: 45 + Math.random() * 5,
        temperature: 25 + Math.random() * 10,
        predicted: Math.max(15, batteryLevel - 5 + Math.random() * 3)
      });
    }
    
    return points;
  };

  const chartData = generateHistoricalData();

  const predictBatteryLife = () => {
    const currentBattery = data.batteryPercentage;
    const averageConsumption = 3.2; // km per percent
    const estimatedRange = currentBattery * averageConsumption;
    
    return {
      range: estimatedRange,
      timeToEmpty: (currentBattery / 8).toFixed(1), // Assuming 8% drain per hour
      recommendation: currentBattery < 30 ? 'Charge soon' : 'Good for extended trips'
    };
  };

  const prediction = predictBatteryLife();

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Battery className="h-6 w-6 text-electric-blue" />
          <h3 className="text-xl font-semibold">Battery Health Analytics</h3>
        </div>
        <div className="flex items-center space-x-2 text-sm text-electric-green">
          <TrendingUp className="h-4 w-4" />
          <span>Predictive Analysis</span>
        </div>
      </div>

      {/* Battery Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-gradient-to-r from-electric-blue/10 to-electric-blue/5 border border-electric-blue/20">
          <div className="text-sm text-muted-foreground">Estimated Range</div>
          <div className="text-2xl font-bold text-electric-blue">{prediction.range.toFixed(0)} km</div>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20">
          <div className="text-sm text-muted-foreground">Time to Empty</div>
          <div className="text-2xl font-bold text-warning">{prediction.timeToEmpty} hrs</div>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-r from-electric-green/10 to-electric-green/5 border border-electric-green/20">
          <div className="text-sm text-muted-foreground">Status</div>
          <div className="text-lg font-semibold text-electric-green">{prediction.recommendation}</div>
        </div>
      </div>

      {/* Battery Trend Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="batteryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--electric-blue))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--electric-blue))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--electric-green))" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="hsl(var(--electric-green))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Area
              type="monotone"
              dataKey="battery"
              stroke="hsl(var(--electric-blue))"
              strokeWidth={2}
              fill="url(#batteryGradient)"
              name="Battery %"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="hsl(var(--electric-green))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Predicted %"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ML Predictions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
        <div className="space-y-2">
          <h4 className="font-medium text-electric-blue">Failure Prediction</h4>
          <p className="text-sm text-muted-foreground">
            Battery health: <span className="text-success font-medium">96%</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Predicted maintenance: <span className="text-warning font-medium">3 months</span>
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-electric-green">Optimization Tips</h4>
          <p className="text-sm text-muted-foreground">• Avoid charging above 90% regularly</p>
          <p className="text-sm text-muted-foreground">• Optimal temp range: 20-35°C</p>
        </div>
      </div>
    </Card>
  );
};

export default BatteryHealthChart;