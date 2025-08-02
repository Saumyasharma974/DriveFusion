import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  X, 
  Bell,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const AlertsPanel = ({ alerts: initialAlerts }) => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [emergencyMode, setEmergencyMode] = useState(false);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return AlertTriangle;
      case 'error':
        return AlertTriangle;
      case 'info':
        return Info;
      case 'success':
        return CheckCircle;
      default:
        return Info;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning':
        return 'warning';
      case 'error':
        return 'destructive';
      case 'info':
        return 'info';
      case 'success':
        return 'success';
      default:
        return 'info';
    }
  };

  const dismissAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const triggerEmergencyAlert = () => {
    setEmergencyMode(true);
    
    // Simulate emergency alert
    const emergencyAlert = {
      id: Date.now(),
      type: 'error',
      message: 'EMERGENCY: Accident detected! Emergency services notified.',
      time: 'Just now'
    };
    
    setAlerts(prev => [emergencyAlert, ...prev]);

    // Reset emergency mode after 5 seconds (for demo)
    setTimeout(() => {
      setEmergencyMode(false);
    }, 5000);
  };

  const simulateMLPrediction = () => {
    const predictions = [
      'ML Alert: Brake pad wear detected - service recommended within 2 weeks',
      'ML Alert: Battery degradation pattern detected - performance may decrease',
      'ML Alert: Unusual vibration pattern - suspension check recommended',
      'ML Alert: High accident risk area ahead - reduce speed advised'
    ];
    
    const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
    
    const newAlert = {
      id: Date.now(),
      type: 'warning',
      message: randomPrediction,
      time: 'Just now'
    };
    
    setAlerts(prev => [newAlert, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Emergency Controls */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6 text-destructive" />
            <h3 className="text-xl font-semibold">Emergency & Alerts</h3>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={simulateMLPrediction}
              className="border-warning text-warning hover:bg-warning/10"
            >
              Simulate ML Alert
            </Button>
            <Button
              variant="destructive"
              onClick={triggerEmergencyAlert}
              disabled={emergencyMode}
              className={emergencyMode ? 'animate-pulse' : ''}
            >
              {emergencyMode ? 'Emergency Active' : 'Emergency Test'}
            </Button>
          </div>
        </div>

        {emergencyMode && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <AlertTriangle className="h-6 w-6 text-destructive animate-pulse" />
              <h4 className="font-semibold text-destructive">EMERGENCY MODE ACTIVATED</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-destructive" />
                <span>SMS sent to emergency contacts</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-destructive" />
                <span>Email alert dispatched</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-destructive" />
                <span>Location shared with authorities</span>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-3 bg-secondary/30 rounded-lg">
            <div className="text-sm text-muted-foreground">Emergency Contact</div>
            <div className="font-medium">+1 (555) 123-4567</div>
          </div>
          <div className="p-3 bg-secondary/30 rounded-lg">
            <div className="text-sm text-muted-foreground">Insurance</div>
            <div className="font-medium">insurance@example.com</div>
          </div>
          <div className="p-3 bg-secondary/30 rounded-lg">
            <div className="text-sm text-muted-foreground">Roadside Assist</div>
            <div className="font-medium">+1 (555) 987-6543</div>
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Recent Alerts & Notifications</h4>
          <Badge variant="outline" className="border-info text-info">
            {alerts.length} active
          </Badge>
        </div>

        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-3 text-success" />
              <p>No active alerts. All systems normal.</p>
            </div>
          ) : (
            alerts.map((alert) => {
              const AlertIcon = getAlertIcon(alert.type);
              const alertColor = getAlertColor(alert.type);
              
              return (
                <div
                  key={alert.id}
                  className={`flex items-start space-x-3 p-4 rounded-lg border border-${alertColor}/20 bg-${alertColor}/5`}
                >
                  <AlertIcon className={`h-5 w-5 text-${alertColor} mt-0.5 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissAlert(alert.id)}
                    className="p-1 h-auto"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })
          )}
        </div>
      </Card>

      {/* ML Predictions & Recommendations */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4 flex items-center space-x-2">
          <div className="w-2 h-2 bg-electric-green rounded-full animate-pulse" />
          <span>AI Recommendations</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-electric-blue/5 rounded-lg border border-electric-blue/20">
            <h5 className="font-medium text-electric-blue mb-2">Battery Optimization</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Charge to 80% for daily use</li>
              <li>• Avoid extreme temperatures</li>
              <li>• Schedule charging during off-peak hours</li>
            </ul>
          </div>
          
          <div className="p-4 bg-electric-green/5 rounded-lg border border-electric-green/20">
            <h5 className="font-medium text-electric-green mb-2">Safety Tips</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Reduce speed in bad weather</li>
              <li>• Check tire pressure weekly</li>
              <li>• Update emergency contacts</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AlertsPanel;