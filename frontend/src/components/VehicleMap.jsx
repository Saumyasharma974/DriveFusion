import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation, Zap, Route, Search } from 'lucide-react';

const VehicleMap = ({ location }) => {
  const mapContainer = useRef(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [destination, setDestination] = useState('');
  
  // Simulated charging stations near NYC
  const chargingStations = [
    {
      id: 1,
      name: "Tesla Supercharger - Manhattan",
      distance: "2.1 km",
      type: "Supercharger",
      available: 8,
      total: 12,
      lat: 40.7589,
      lng: -73.9851
    },
    {
      id: 2,
      name: "ChargePoint Station - Brooklyn",
      distance: "5.3 km",
      type: "Level 2",
      available: 3,
      total: 6,
      lat: 40.6782,
      lng: -73.9442
    },
    {
      id: 3,
      name: "EVgo Fast Charging - Queens",
      distance: "8.7 km",
      type: "DC Fast",
      available: 2,
      total: 4,
      lat: 40.7282,
      lng: -73.7949
    },
    {
      id: 4,
      name: "Electrify America - Jersey City",
      distance: "12.4 km",
      type: "DC Fast",
      available: 6,
      total: 8,
      lat: 40.7178,
      lng: -74.0431
    }
  ];

  const initializeMap = (token) => {
    if (!mapContainer.current) return;

    // For demo purposes, we'll create a static map representation
    // In a real app, you would initialize Mapbox GL JS here
    const mapElement = mapContainer.current;
    mapElement.innerHTML = `
      <div class="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg relative overflow-hidden">
        <div class="absolute inset-0 opacity-20">
          <div class="w-full h-full" style="background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"2\" fill=\"%23fff\" opacity=\"0.3\"/><circle cx=\"20\" cy=\"30\" r=\"1\" fill=\"%23fff\" opacity=\"0.5\"/><circle cx=\"80\" cy=\"70\" r=\"1\" fill=\"%23fff\" opacity=\"0.4\"/><circle cx=\"30\" cy=\"80\" r=\"1\" fill=\"%23fff\" opacity=\"0.6\"/><circle cx=\"70\" cy=\"20\" r=\"1\" fill=\"%23fff\" opacity=\"0.3\"/></svg>'); background-size: 50px 50px;"></div>
        </div>
        <div class="absolute top-4 left-4 bg-white/10 backdrop-blur-sm rounded-lg p-2">
          <div class="flex items-center space-x-2 text-white">
            <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium">Current Location</span>
          </div>
          <div class="text-xs text-white/70 mt-1">
            ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}
          </div>
        </div>
        <div class="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg p-2 text-white text-xs">
          Interactive map requires Mapbox token
        </div>
      </div>
    `;
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      initializeMap(mapboxToken);
    }
  };

  const calculateRouteOptimization = () => {
    // Simulate route optimization calculation
    return {
      totalDistance: "45.2 km",
      estimatedTime: "52 min",
      batteryRequired: "18%",
      chargingStops: 1,
      recommendation: "Route optimized for current battery level"
    };
  };

  const routeInfo = calculateRouteOptimization();

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MapPin className="h-6 w-6 text-electric-blue" />
          <h3 className="text-xl font-semibold">Route & Charging Stations</h3>
        </div>
        <Badge variant="outline" className="border-electric-green text-electric-green">
          <Zap className="h-3 w-3 mr-1" />
          {chargingStations.length} stations nearby
        </Badge>
      </div>

      {/* Route Planning */}
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Enter destination..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button className="bg-electric-blue hover:bg-electric-blue/90">
            <Navigation className="h-4 w-4 mr-2" />
            Navigate
          </Button>
        </div>

        {destination && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-secondary/50 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Distance</div>
              <div className="font-semibold text-electric-blue">{routeInfo.totalDistance}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Time</div>
              <div className="font-semibold">{routeInfo.estimatedTime}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Battery Req.</div>
              <div className="font-semibold text-warning">{routeInfo.batteryRequired}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Stops</div>
              <div className="font-semibold text-electric-green">{routeInfo.chargingStops}</div>
            </div>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="space-y-4">
        {showTokenInput ? (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <h4 className="font-medium">Mapbox Integration</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Enter your Mapbox public token to enable interactive maps
              </p>
            </div>
            <div className="flex space-x-2 max-w-md mx-auto">
              <Input
                placeholder="pk.eyJ1Ijoi..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleTokenSubmit} disabled={!mapboxToken.trim()}>
                Connect
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your token from{' '}
              <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-electric-blue hover:underline">
                mapbox.com
              </a>
            </p>
          </div>
        ) : (
          <div ref={mapContainer} className="h-64 rounded-lg border border-border" />
        )}
      </div>

      {/* Charging Stations List */}
      <div className="space-y-3">
        <h4 className="font-medium flex items-center space-x-2">
          <Zap className="h-4 w-4 text-electric-green" />
          <span>Nearby Charging Stations</span>
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {chargingStations.map((station) => (
            <div
              key={station.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="space-y-1">
                <div className="font-medium text-sm">{station.name}</div>
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <span>{station.distance}</span>
                  <Badge variant="outline" className="text-xs px-2 py-0">
                    {station.type}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-electric-green">
                  {station.available}/{station.total}
                </div>
                <div className="text-xs text-muted-foreground">available</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {destination && (
        <div className="p-4 bg-electric-blue/10 rounded-lg border border-electric-blue/20">
          <div className="flex items-center space-x-2 text-electric-blue mb-2">
            <Route className="h-4 w-4" />
            <span className="font-medium">Route Optimization</span>
          </div>
          <p className="text-sm text-muted-foreground">{routeInfo.recommendation}</p>
        </div>
      )}
    </Card>
  );
};

export default VehicleMap;