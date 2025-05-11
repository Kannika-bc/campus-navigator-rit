// CampusNavigator.js
import React, { useState } from 'react';
import { Map, Navigation, Search, Menu, ArrowRight, MapPin, QrCode, Loader, Check } from 'lucide-react';
import './CampusNavigator.css'; // Make sure to create this file

// Main application component
function CampusNavigator() {
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Campus locations for autocomplete
  const campusLocations = [
    'Main Gate', 'Admin Block', 'CSE Department', 'ECE Department', 
    'Mechanical Department', 'Library', 'Canteen', 'Auditorium',
    'Sports Complex', 'Hostel Block A', 'Hostel Block B', 'Parking Area',
    'Food Court', 'Seminar Hall 1', 'Seminar Hall 2', 'Labs Block'
  ];
  
  // Simulate QR code scanning
  const handleScanQR = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      setIsScanning(false);
      setCurrentLocation('Main Gate');
    }, 2000);
  };
  
  // Simulate detecting current location
  const detectCurrentLocation = () => {
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      setIsLoading(false);
      setCurrentLocation('Library');
    }, 1500);
  };
  
  // Start navigation
  const startNavigation = () => {
    if (!currentLocation || !destination) {
      setError('Please select both current location and destination');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowMap(true);
      setShowNavigation(true);
    }, 1000);
  };
  
  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <Map className="icon" />
            <h1>RIT Campus Navigator</h1>
          </div>
          <Menu className="icon" />
        </div>
      </header>
      
      {/* Main Content */}
      <main className="main-content">
        {!showMap ? (
          <div className="content-container">
            {/* Welcome Card */}
            <div className="card welcome-card">
              <h2>Welcome to Ramaiah Institute of Technology</h2>
              <p>Navigate your way around campus with ease using our Campus Navigator app.</p>
            </div>
            
            {/* Location Input Card */}
            <div className="card">
              <h3>Set Your Location</h3>
              
              {/* Current Location */}
              <div className="input-group">
                <label>Current Location</label>
                <div className="input-row">
                  <div className="input-container">
                    <input
                      type="text"
                      className="text-input"
                      placeholder="Your current location"
                      value={currentLocation}
                      onChange={(e) => setCurrentLocation(e.target.value)}
                      list="current-locations"
                    />
                    <datalist id="current-locations">
                      {campusLocations.map((location, idx) => (
                        <option key={idx} value={location} />
                      ))}
                    </datalist>
                    {currentLocation && (
                      <Check className="check-icon" />
                    )}
                  </div>
                  <button
                    onClick={detectCurrentLocation}
                    className="icon-button"
                    title="Detect Current Location"
                  >
                    <MapPin className="icon-sm" />
                  </button>
                  <button
                    onClick={handleScanQR}
                    className="icon-button"
                    title="Scan QR Code"
                  >
                    <QrCode className="icon-sm" />
                  </button>
                </div>
              </div>
              
              {/* Destination */}
              <div className="input-group">
                <label>Destination</label>
                <div className="input-container">
                  <input
                    type="text"
                    className="text-input"
                    placeholder="Where do you want to go?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    list="destinations"
                  />
                  <datalist id="destinations">
                    {campusLocations.map((location, idx) => (
                      <option key={idx} value={location} />
                    ))}
                  </datalist>
                  {destination && (
                    <Check className="check-icon" />
                  )}
                </div>
              </div>
              
              {/* Error Message */}
              {error && (
                <div className="error-message">{error}</div>
              )}
              
              {/* Start Navigation Button */}
              <button
                onClick={startNavigation}
                className="primary-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="icon-sm spin" />
                ) : (
                  <>
                    <Navigation className="icon-sm" />
                    Start Navigation
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="content-container">
            {/* Navigation Info */}
            <div className="card nav-info-card">
              <div className="nav-header">
                <h3>Navigation</h3>
                <button 
                  onClick={() => {
                    setShowMap(false);
                    setShowNavigation(false);
                  }}
                  className="text-button"
                >
                  Reset
                </button>
              </div>
              <div className="nav-locations">
                <div className="location-box">
                  <div className="location-label">From</div>
                  <div>{currentLocation}</div>
                </div>
                <ArrowRight className="arrow-icon" />
                <div className="location-box">
                  <div className="location-label">To</div>
                  <div>{destination}</div>
                </div>
              </div>
            </div>
            
            {/* Campus Map with Navigation */}
            <div className="card map-container">
              <div className="campus-map">
                {/* Simulated Campus Map */}
                <div className="map-content">
                  {/* Simple campus map representation */}
                  <div className="map-overlay">
                    <div className="campus-outline">
                      {/* Buildings */}
                      <div className="building building-1"></div>
                      <div className="building building-2"></div>
                      <div className="building building-3"></div>
                      <div className="building building-4"></div>
                      <div className="building building-center"></div>
                      
                      {/* Navigation path */}
                      {showNavigation && (
                        <svg className="nav-path" viewBox="0 0 300 300">
                          <path 
                            d="M 30,30 L 120,120 L 200,120 L 280,200" 
                            stroke="#3B82F6" 
                            strokeWidth="4" 
                            fill="none" 
                            strokeDasharray="8,4"
                          />
                          <circle cx="30" cy="30" r="6" fill="#3B82F6" />
                          <circle cx="280" cy="200" r="6" fill="#EF4444" />
                        </svg>
                      )}
                      
                      {/* Location labels */}
                      <div className="location-label library-label">Library</div>
                      <div className="location-label dest-label">{destination}</div>
                    </div>
                  </div>
                  
                  {/* Navigation Instructions */}
                  <div className="nav-instructions">
                    <div className="instruction-card">
                      <h4>Next Direction</h4>
                      <p>Continue straight for 50 meters and turn right at the CSE Department</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation Steps */}
              <div className="nav-steps">
                <h4>Steps</h4>
                <ol className="steps-list">
                  <li className="step-item">
                    <div className="step-number">1</div>
                    <div>Exit the {currentLocation} and walk straight for 50 meters</div>
                  </li>
                  <li className="step-item">
                    <div className="step-number">2</div>
                    <div>Turn right at the CSE Department</div>
                  </li>
                  <li className="step-item">
                    <div className="step-number">3</div>
                    <div>Continue for 30 meters</div>
                  </li>
                  <li className="step-item">
                    <div className="step-number">4</div>
                    <div>Your destination ({destination}) will be on your right</div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* QR Code Scanning Modal */}
      {isScanning && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Scanning QR Code</h3>
            <div className="qr-scanner">
              <div className="scanner-animation">
                <QrCode className="qr-icon" />
                <div className="scanner-text">Scanning...</div>
              </div>
            </div>
            <button 
              onClick={() => setIsScanning(false)}
              className="primary-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-buttons">
          <button className="nav-button active">
            <Map className="icon-sm" />
            <span>Map</span>
          </button>
          <button className="nav-button">
            <Search className="icon-sm" />
            <span>Search</span>
          </button>
          <button className="nav-button">
            <Navigation className="icon-sm" />
            <span>Navigate</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default CampusNavigator;