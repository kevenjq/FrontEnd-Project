// File: js/geolocation.js (updated)
document.addEventListener('DOMContentLoaded', () => {
  const locationDisplay = document.getElementById('location-display');

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;

        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
          .then(res => res.json())
          .then(data => {
            const country = data.address.country || 'Unknown';
            locationDisplay.textContent = `Showing data for: ${country}`;
          })
          .catch(err => {
            locationDisplay.textContent = 'Unable to detect location';
            console.error(err);
          });
      }, err => {
        locationDisplay.textContent = 'Location permission denied';
        console.error(err);
      });
    } else {
      locationDisplay.textContent = 'Geolocation not supported';
    }
  };

  detectLocation();

  document.getElementById('change-location')?.addEventListener('click', () => {
    const newLocation = prompt('Enter country name:');
    if (newLocation) {
      locationDisplay.textContent = `Showing data for: ${newLocation}`;
    }
  });
});