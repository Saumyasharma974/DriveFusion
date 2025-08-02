import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Battery, 
  Thermometer, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  MapPin,
  Car,
  Gauge
} from 'lucide-react';
import BatteryHealthChart from './BatteryHealthChart.jsx';
import VehicleMap from './VehicleMap.jsx';
import AlertsPanel from './AlertsPanel.jsx';

const VehicleDashboard = () => {
  const [sensorData, setSensorData] = useState({
    batteryPercentage: 75,
    temperature: 28,
    voltage: 48.2,
    motorRPM: 2800,
    speed: 45,
    tilt: 2.1,
    vibration: 0.3,
    location: { lat: 40.7128, lng: -74.0060 }
  });

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Battery temperature slightly elevated', time: '2 min ago' },
    { id: 2, type: 'info', message: 'Regular maintenance due in 500km', time: '1 hour ago' }
  ]);

  // Simulate real-time sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        batteryPercentage: Math.max(0, prev.batteryPercentage + (Math.random() - 0.5) * 2),
        temperature: Math.max(15, Math.min(50, prev.temperature + (Math.random() - 0.5) * 3)),
        voltage: Math.max(40, Math.min(52, prev.voltage + (Math.random() - 0.5) * 0.5)),
        motorRPM: Math.max(0, Math.min(5000, prev.motorRPM + (Math.random() - 0.5) * 200)),
        speed: Math.max(0, Math.min(80, prev.speed + (Math.random() - 0.5) * 5)),
        tilt: Math.max(-10, Math.min(10, prev.tilt + (Math.random() - 0.5) * 0.5)),
        vibration: Math.max(0, Math.min(2, prev.vibration + (Math.random() - 0.5) * 0.1))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getBatteryStatus = (percentage) => {
    if (percentage > 50) return { color: 'battery-full', status: 'Good' };
    if (percentage > 20) return { color: 'battery-medium', status: 'Medium' };
    return { color: 'battery-low', status: 'Low' };
  };

  const getHealthStatus = () => {
    const { batteryPercentage, temperature, voltage } = sensorData;
    if (batteryPercentage > 50 && temperature < 40 && voltage > 45) {
      return { status: 'Excellent', color: 'success', icon: CheckCircle };
    }
    if (batteryPercentage > 20 && temperature < 45 && voltage > 42) {
      return { status: 'Good', color: 'warning', icon: AlertTriangle };
    }
    return { status: 'Attention Required', color: 'destructive', icon: AlertTriangle };
  };

  const batteryStatus = getBatteryStatus(sensorData.batteryPercentage);
  const healthStatus = getHealthStatus();
  const HealthIcon = healthStatus.icon;

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-electric-blue to-electric-green bg-clip-text text-transparent">
            Vehicle Health Monitor
          </h1>
          <p className="text-muted-foreground mt-2">Real-time monitoring and predictive analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="border-electric-blue text-electric-blue">
            <div className="w-2 h-2 bg-electric-blue rounded-full mr-2 animate-pulse" />
            Live
          </Badge>
          <Button variant="outline" className="border-electric-blue text-electric-blue hover:bg-electric-blue/10">
            Emergency Contact
          </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Battery Status */}
        <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <Battery className={`h-8 w-8 text-${batteryStatus.color}`} />
              <Badge 
                variant="outline" 
                className={`border-${batteryStatus.color} text-${batteryStatus.color}`}
              >
                {batteryStatus.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">{sensorData.batteryPercentage.toFixed(1)}%</span>
                <span className="text-sm text-muted-foreground">battery</span>
              </div>
              <Progress 
                value={sensorData.batteryPercentage} 
                className="h-2"
              />
              <p className="text-sm text-muted-foreground">
                Estimated range: {(sensorData.batteryPercentage * 3.2).toFixed(0)}km
              </p>
            </div>
          </div>
        </Card>

        {/* Temperature */}
        <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-transparent" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <Thermometer className="h-8 w-8 text-warning" />
              <Badge variant="outline" className="border-warning text-warning">
                {sensorData.temperature > 35 ? 'Warm' : 'Normal'}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">{sensorData.temperature.toFixed(1)}°C</span>
                <span className="text-sm text-muted-foreground">temp</span>
              </div>
              <Progress 
                value={(sensorData.temperature / 50) * 100} 
                className="h-2"
              />
            </div>
          </div>
        </Card>

        {/* Voltage */}
        <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric-green/5 to-transparent" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <Zap className="h-8 w-8 text-electric-green" />
              <Badge variant="outline" className="border-electric-green text-electric-green">
                Stable
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">{sensorData.voltage.toFixed(1)}V</span>
                <span className="text-sm text-muted-foreground">voltage</span>
              </div>
              <Progress 
                value={(sensorData.voltage / 52) * 100} 
                className="h-2"
              />
            </div>
          </div>
        </Card>

        {/* Overall Health */}
        <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br from-${healthStatus.color}/5 to-transparent`} />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <HealthIcon className={`h-8 w-8 text-${healthStatus.color}`} />
              <Badge 
                variant="outline" 
                className={`border-${healthStatus.color} text-${healthStatus.color}`}
              >
                {healthStatus.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">{sensorData.speed.toFixed(0)}</span>
                <span className="text-sm text-muted-foreground">km/h</span>
              </div>
              <p className="text-sm text-muted-foreground">Current speed</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts and Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BatteryHealthChart data={sensorData} />
        <VehicleMap location={sensorData.location} />
      </div>

      {/* Motor Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Gauge className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Motor RPM</h3>
          </div>
          <div className="text-2xl font-bold">{sensorData.motorRPM.toFixed(0)}</div>
          <Progress value={(sensorData.motorRPM / 5000) * 100} className="mt-2" />
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Car className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Vehicle Tilt</h3>
          </div>
          <div className="text-2xl font-bold">{sensorData.tilt.toFixed(1)}°</div>
          <Progress value={Math.abs(sensorData.tilt) * 10} className="mt-2" />
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-warning" />
            <h3 className="text-lg font-semibold">Vibration</h3>
          </div>
          <div className="text-2xl font-bold">{sensorData.vibration.toFixed(2)}</div>
          <Progress value={(sensorData.vibration / 2) * 100} className="mt-2" />
        </Card>
      </div>

      {/* Alerts Panel */}
      <AlertsPanel alerts={alerts} />
    </div>
  );
};

export default VehicleDashboard;