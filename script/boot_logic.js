// boot_logic.js
document.addEventListener('DOMContentLoaded', function () {
    const modelViewer = document.querySelector('model-viewer');
    
    modelViewer.addEventListener('ar-button-press', () => {
      const iosSrc = modelViewer.getAttribute('ios-src');
      if (iosSrc && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
        window.location.href = iosSrc; // Forza l'apertura del file .usdz su dispositivi Apple
      }
    });
  });
  