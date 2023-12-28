// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import * as bootstrap from "bootstrap"
import "./components"

// Register the serviceWorker script at /serviceworker.js from our server if supported
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/serviceworker.js')
    .then(function(reg) {
      console.log('Service worker change, registered the service worker');
    });
} else {
  console.error('Service worker is not supported in this browser');
}