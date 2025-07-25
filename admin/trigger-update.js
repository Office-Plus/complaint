// Utility script to trigger update notification for testing
// Run this in browser console to simulate a new version

function triggerUpdate() {
    // Set a newer version in localStorage to trigger update
    localStorage.setItem('serverVersion', '1.0.2');
    
    // Clear the last checked version to force update check
    localStorage.removeItem('lastCheckedVersion');
    
    // Trigger the update check
    if (window.VersionManager) {
        VersionManager.checkForUpdates();
    } else {
        console.log('VersionManager not loaded yet. Please wait a moment and try again.');
    }
}

function resetVersion() {
    // Reset to current version
    localStorage.setItem('serverVersion', '1.0.1');
    localStorage.setItem('lastCheckedVersion', '1.0.1');
    console.log('Version reset to 1.0.1');
}

// Make functions globally available
window.triggerUpdate = triggerUpdate;
window.resetVersion = resetVersion;

console.log('Update trigger utilities loaded:');
console.log('- triggerUpdate() - Simulates a new version available');
console.log('- resetVersion() - Resets to current version'); 