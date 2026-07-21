/**
 * voice.js - Always-Listening Voice Assistant for GPS Emergency Tracker
 */

const EMERGENCY_KEYWORDS = [
  'help me', 'sos', 'send sos', 'emergency', 
  "i'm in danger", 'i am in danger', 'save me', 
  'call police', 'accident', 'attack', 'i need help'
];

window.isVoiceAssistantActive = false;
let recognition = null;

function speakFeedback(message) {
  if (!window.speechSynthesis) return;
  const utt = new SpeechSynthesisUtterance(message);
  utt.lang = 'en-US';
  
  // Prefer English voices
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Samantha'))) 
                    || voices.find(v => v.lang.startsWith('en'));
  if (preferred) utt.voice = preferred;
  
  window.speechSynthesis.speak(utt);
}

function updateVoiceUI(status, isRecording) {
  const statusEl = document.getElementById('voice-status');
  if (statusEl) {
    statusEl.textContent = status;
    statusEl.style.display = status ? 'block' : 'none';
  }
  
  const btn = document.getElementById('voice-btn-icon');
  if (btn) {
    if (isRecording) {
      btn.style.background = 'linear-gradient(135deg,#ef4444,#dc2626)'; // Red
      btn.style.boxShadow = '0 0 20px rgba(239,68,68,0.5)';
      btn.style.animation = 'pulse-ring 1.5s infinite alternate';
    } else {
      btn.style.background = 'linear-gradient(135deg,#6366f1,#8b5cf6)'; // Indigo
      btn.style.boxShadow = '0 0 20px rgba(99,102,241,0.4)';
      btn.style.animation = 'none';
    }
  }
}

function initVoiceAssistant() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    if (typeof showToast === 'function') {
      showToast("Not Supported", "Your browser does not support Voice Recognition. Please try Chrome or Edge.", "danger");
    }
    return false;
  }

  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  // We use continuous=false and manually restart it on end, 
  // to prevent memory leaks and massive result arrays.
  recognition.continuous = false; 

  recognition.onstart = function() {
    if (window.isVoiceAssistantActive) {
      updateVoiceUI("Listening continuously...", true);
    }
  };

  recognition.onresult = function(event) {
    if (!window.isVoiceAssistantActive) return;
    
    const transcript = event.results[0][0].transcript.toLowerCase();
    console.log("Voice Assistant heard:", transcript);
    
    // Check if transcript contains any emergency keyword
    const isEmergency = EMERGENCY_KEYWORDS.some(keyword => transcript.includes(keyword));
    
    if (isEmergency) {
      // Turn off listening to prevent loops or multiple triggers
      window.isVoiceAssistantActive = false;
      recognition.stop();
      updateVoiceUI("Emergency Detected!", false);
      
      speakFeedback("Emergency detected. Sending your location to your emergency contacts.");
      
      // Trigger the existing SOS logic bypassing the confirm dialog
      if (typeof window.triggerSOS === 'function') {
        window.triggerSOS(true);
      }
    } 
    // If NO emergency keyword is detected, do absolutely nothing. 
    // We ignore background noise so the user isn't spammed.
  };

  recognition.onerror = function(event) {
    if (event.error === 'not-allowed') {
      window.isVoiceAssistantActive = false;
      updateVoiceUI("", false);
      if (typeof showToast === 'function') showToast("Microphone Blocked", "Please allow microphone access.", "danger");
    }
    // Note: 'no-speech' is ignored, it will just restart onend
  };

  recognition.onend = function() {
    // If the assistant is still supposed to be active, instantly restart it
    if (window.isVoiceAssistantActive) {
      try {
        recognition.start();
      } catch(e) {
        console.error("Failed to auto-restart voice assistant:", e);
      }
    }
  };
  
  return true;
}

window.toggleVoiceAssistant = function() {
  if (!recognition) {
    const success = initVoiceAssistant();
    if (!success) return;
  }

  if (window.isVoiceAssistantActive) {
    // User wants to turn it OFF
    window.isVoiceAssistantActive = false;
    recognition.stop();
    updateVoiceUI("Voice Assistant Off", false);
    setTimeout(() => updateVoiceUI("", false), 2000);
    if (typeof showToast === 'function') showToast("Voice Assistant Stopped", "Microphone is no longer listening.", "info");
  } else {
    // User wants to turn it ON
    window.isVoiceAssistantActive = true;
    try {
      recognition.start();
      if (typeof showToast === 'function') showToast("Voice Assistant Active", "Always-listening mode enabled. Say 'Help me' anytime.", "success");
    } catch(e) {
      console.error(e);
    }
  }
};
