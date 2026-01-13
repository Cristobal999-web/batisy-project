'use client';

import { GoogleMapsDelivery } from '../app/DeliveryMap';

export function EnergyDelivery() {
    return (
        // Height calculation leaves room for bottom nav (80px)
        <div className="bg-background" style={{ height: 'calc(100vh - 80px)' }}>
            <GoogleMapsDelivery />
        </div>
    );
}
