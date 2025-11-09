// Leaflet Map Integration Script

(function() {
    'use strict';

    const mapContainer = document.getElementById('map');
    if (!mapContainer || typeof L === 'undefined') {
        console.warn('Map container not found or Leaflet not loaded');
        return;
    }

    // Alliance Operations actual business location in Orlando, FL
    // Coordinates for 1713 Edgewater Dr, Orlando, FL 32804
    const businessLocation = {
        lat: 28.5501,
        lng: -81.3856,
        name: 'Alliance Operations FL',
        address: '1713 Edgewater Dr, Suite 488, Orlando, FL 32804'
    };

    try {
        // Initialize map
        const map = L.map('map', {
            center: [businessLocation.lat, businessLocation.lng],
            zoom: 16,
            scrollWheelZoom: false,
            zoomControl: true
        });

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        // Custom marker icon
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="
                    background: linear-gradient(135deg, #A89F84 0%, #3F2D0B 100%);
                    width: 40px;
                    height: 40px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    border: 3px solid white;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-shield-alt" style="
                        color: white;
                        font-size: 18px;
                        transform: rotate(45deg);
                    "></i>
                </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });

        // Add marker
        const marker = L.marker([businessLocation.lat, businessLocation.lng], {
            icon: customIcon
        }).addTo(map);

        // Add popup
        marker.bindPopup(`
            <div style="text-align: center; padding: 10px; font-family: 'Inter', sans-serif;">
                <h3 style="color: #A89F84; margin: 0 0 8px 0; font-size: 1.1rem; font-family: 'Montserrat', sans-serif;">
                    ${businessLocation.name}
                </h3>
                <p style="margin: 0 0 8px 0; color: #272725; font-size: 0.9rem;">
                    ${businessLocation.address}
                </p>
                <div style="margin-top: 12px;">
                    <p style="margin: 8px 0; font-size: 0.85rem; color: #272725;">
                        <strong>Phone:</strong> <a href="tel:+19174024999" style="color: #A89F84; text-decoration: none;">+1 (917) 402-4999</a>
                    </p>
                    <p style="margin: 8px 0; font-size: 0.85rem; color: #272725;">
                        <strong>Email:</strong> <a href="mailto:Info@allianceopsfl.com" style="color: #A89F84; text-decoration: none;">Info@allianceopsfl.com</a>
                    </p>
                </div>
                <a href="https://www.google.com/maps/dir//1713+Edgewater+Dr+Suite+488+Orlando+FL+32804"
                   target="_blank"
                   rel="noopener noreferrer"
                   style="
                       display: inline-block;
                       padding: 8px 16px;
                       background: #A89F84;
                       color: #272725;
                       text-decoration: none;
                       border-radius: 4px;
                       font-weight: 600;
                       font-size: 0.85rem;
                       margin-top: 12px;
                       transition: background 0.3s ease;
                   "
                   onmouseover="this.style.background='#3F2D0B'; this.style.color='white';"
                   onmouseout="this.style.background='#A89F84'; this.style.color='#272725';">
                    Get Directions
                </a>
            </div>
        `).openPopup();

        // Enable scroll zoom when clicking the map
        map.on('click', function() {
            map.scrollWheelZoom.enable();
        });

        // Disable scroll zoom when mouse leaves map
        map.on('mouseout', function() {
            map.scrollWheelZoom.disable();
        });

        // Invalidate size after map is visible (fixes display issues)
        setTimeout(() => {
            map.invalidateSize();
        }, 100);

    } catch (error) {
        console.error('Error initializing map:', error);

        // Show fallback message
        mapContainer.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                background: #f5f5f5;
                flex-direction: column;
                padding: 2rem;
                text-align: center;
                color: #272725;
            ">
                <i class="fas fa-map-marked-alt" style="font-size: 3rem; color: #A89F84; margin-bottom: 1rem;"></i>
                <h3 style="margin-bottom: 0.5rem;">Unable to load map</h3>
                <p style="margin-bottom: 1rem;">Please enable JavaScript to view the interactive map</p>
                <a href="https://www.openstreetmap.org/#map=13/${businessLocation.lat}/${businessLocation.lng}"
                   target="_blank"
                   rel="noopener noreferrer"
                   style="
                       padding: 12px 24px;
                       background: #A89F84;
                       color: #272725;
                       text-decoration: none;
                       border-radius: 4px;
                       font-weight: 600;
                   ">
                    View on OpenStreetMap
                </a>
            </div>
        `;
    }

})();
