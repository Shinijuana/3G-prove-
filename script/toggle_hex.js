// toggle_hex.js

// Funzione di toggle: se il pulsante cliccato è già attivo, lo deseleziona e nasconde la sezione.
function toggleSection(sectionId, btn) {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      document.getElementById(sectionId).classList.remove("active");
    } else {
      const sections = document.querySelectorAll('.content-section');
      sections.forEach(section => section.classList.remove('active'));
      
      const buttons = document.querySelectorAll('.hex-button');
      buttons.forEach(button => button.classList.remove('active'));
      
      btn.classList.add("active");
      document.getElementById(sectionId).classList.add("active");
    }
  }
  