import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [27.8493, -13.1339], // Lusaka, Zambia
      zoom: 6,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    setIsMapInitialized(true);
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  const handleInitialize = () => {
    if (mapboxToken) {
      initializeMap(mapboxToken);
    }
  };

  if (!isMapInitialized) {
    return (
      <Card className="p-6 max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-4">Initialize Map</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Enter your Mapbox public token to view the map. Get your token at{' '}
          <a 
            href="https://mapbox.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            mapbox.com
          </a>
        </p>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter Mapbox token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <Button onClick={handleInitialize}>
            Initialize
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;
