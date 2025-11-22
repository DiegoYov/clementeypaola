function animateName(element) {
  const name = element.textContent;
  element.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    if (i < name.length) {
      element.textContent += name[i];
      i++;
    } else {
      clearInterval(interval);
    }
  }, 200);
}

function typeText(element) {
  const fullText = element.textContent;
  element.innerHTML = '';
  let i = 0;
  const interval = setInterval(() => {
    if (i < fullText.length) {
      if (fullText[i] === '\n') {
        element.innerHTML += '<br>';
      } else {
        element.innerHTML += fullText[i];
      }
      i++;
    } else {
      clearInterval(interval);
    }
  }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const openBtn = document.getElementById('open-invitation');
  const closeBtn = document.querySelector('.close');
  const saveBtn = document.getElementById('save-info');
  const nameInput = document.getElementById('name-input');
  const relationInputs = document.querySelectorAll('input[name="relation"]');
  const userInfo = document.getElementById('user-info');
  const displayName = document.getElementById('display-name');

  let savedName = localStorage.getItem('userName');
  let savedRelation = localStorage.getItem('relation');

  if (savedName) {
    displayName.textContent = savedName;
    userInfo.style.display = 'block';
  } else {
    userInfo.style.display = 'none';
  }

  openBtn.addEventListener('click', () => {
    if (!savedName || !savedRelation) {
      modal.style.display = 'block';
    } else {
      window.location.href = 'invitacion.html';
    }
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  saveBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    let relation = '';
    relationInputs.forEach(radio => {
      if (radio.checked) relation = radio.value;
    });
    if (name && relation) {
      localStorage.setItem('userName', name);
      localStorage.setItem('relation', relation);
      savedName = name;
      savedRelation = relation;
      displayName.textContent = name;
      userInfo.style.display = 'block';
      animateName(displayName);
      modal.style.display = 'none';
    } else {
      alert('Por favor ingresa tu nombre y selecciona una relación.');
    }
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// Countdown mejorado
const eventDate = new Date("Dec 20, 2025 18:00:00").getTime();
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const countdownContainer = document.querySelector(".countdown-container");

function updateCountdown() {
  const now = new Date().getTime();
  const diff = eventDate - now;

  if (diff < 0) {
    // El evento ya pasó
    countdownContainer.innerHTML = '<div class="countdown-ended">🎉 ¡Hoy es el gran día!</div>';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Actualizar cada elemento con formato de dos dígitos
  daysElement.textContent = days.toString().padStart(2, '0');
  hoursElement.textContent = hours.toString().padStart(2, '0');
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Ejecutar inmediatamente y luego cada segundo
updateCountdown();
setInterval(updateCountdown, 1000);

// Personalize with name on page load
document.addEventListener('DOMContentLoaded', () => {
  const name = localStorage.getItem('userName');
  const relation = localStorage.getItem('relation');

  if (name && relation) {
    const textPersonalizado = document.querySelector('.text-personalizado');
    if (textPersonalizado) {
      textPersonalizado.textContent = `Querido/a ${name}, como ${relation} de Clemente López y Paola Ayure, eres parte de este momento tan especial. Acompáñanos en su Aniversario #10 y vivamos juntos una noche de celebración, amor y recuerdos inolvidables.`;
    }
  }

  if (name) {
    const question = document.getElementById('personalized-question');
    if (question) {
      question.textContent = `¿${name}, contamos contigo?`;
    }
  }

  if (name) {
    const celebracionH2 = document.querySelector('#celebracion .welcome-text');
    if (celebracionH2) {
      celebracionH2.textContent = `¡Únete a la celebración ${name}!`;
    }
  }

  if (name) {
    const esperamosH2 = document.querySelector('#esperamos h2');
    if (esperamosH2) {
      esperamosH2.textContent = `¡${name}, te esperamos con mucho cariño!`;
    }
  }

  if (name) {
    const invitationText = document.getElementById('invitation-text');
    if (invitationText) {
      invitationText.textContent = `Con la misma alegría del primer día... ${name}, te invitamos a celebrar con nosotros la renovación de nuestros votos en nuestro décimo aniversario.`;
    }
  }

  if (name) {
    const confirmationText = document.getElementById('confirmation-text');
    if (confirmationText) {
      confirmationText.textContent = `${name}, tu presencia es el regalo más grande, te agradecemos confirmar tu asistencia en el siguiente botón.`;
    }
  }
});

// Audio control for invitacion.html
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-audio');
  const muteBtn = document.getElementById('mute-btn');

  if (audio && muteBtn) {
    audio.volume = 0.2; // Set initial volume to 20%

    let isMuted = false;

    muteBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      audio.muted = isMuted;
      const icon = muteBtn.querySelector('i');
      icon.className = isMuted ? 'bi bi-volume-mute' : 'bi bi-volume-up';
    });
  }
});



// Lógica para el indicador de swipe
document.addEventListener('DOMContentLoaded', () => {
  const swipeIndicator = document.getElementById('swipe-indicator');
  const speechBubble = document.querySelector('.speech-bubble');
  const snapContainer = document.querySelector('.snap-container');
  const esperamosSection = document.getElementById('esperamos');

  function hideSwipeIndicator() {
    swipeIndicator.style.display = 'none';
  }

  // Ocultar después de 1 minuto
  setTimeout(hideSwipeIndicator, 1 * 60 * 1000);

  // Ocultar cuando llegue a la sección "Te esperamos"
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        hideSwipeIndicator();
      }
    });
  }, { threshold: 0.1 });

  if (esperamosSection) {
    observer.observe(esperamosSection);
  }

  if (speechBubble && snapContainer) {
    const hideIndicatorOnFirstScroll = () => {
      // Oculta solo el globo de texto tan pronto como el usuario se desplaza un poco
      if (snapContainer.scrollTop > 20) {
        speechBubble.classList.add('hidden');
        // Elimina el listener para que no se ejecute más
        snapContainer.removeEventListener('scroll', hideIndicatorOnFirstScroll);
      }
    };

    snapContainer.addEventListener('scroll', hideIndicatorOnFirstScroll);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const confirmBtn = document.getElementById('confirm-btn');
  const confirmModal = document.getElementById('confirmModal');

  confirmBtn.addEventListener('click', () => {
    confirmModal.style.display = 'block';
  });

  window.addEventListener('click', (e) => {
    if (e.target === confirmModal) {
      confirmModal.style.display = 'none';
    }
  });
});

function closeModal() {
  document.getElementById('confirmModal').style.display = 'none';
}

function closeWelcomeModal() {
  document.getElementById('welcomeModal').style.display = 'none';
}

// Show welcome modal on page load
document.addEventListener('DOMContentLoaded', () => {
  const welcomeModal = document.getElementById('welcomeModal');
  welcomeModal.style.display = 'block';
  const typingText = document.getElementById('typing-text');
  if (typingText) {
    typeText(typingText);
  }
});

// Scroll-triggered animations
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, 100);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});

// Image fade-in animation on scroll reveal
document.addEventListener('DOMContentLoaded', () => {
  const scrollContainer = document.querySelector('.h-screen.overflow-y-scroll');

  // Select all images in the page
  const images = document.querySelectorAll('img');

  // Create an Intersection Observer to detect when images enter the viewport
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add the fade-in class when image enters viewport
        entry.target.classList.add('fade-in-scroll');
        // Stop observing this image after animation is triggered
        imageObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    root: scrollContainer
  });

  // Observe all images
  images.forEach(img => {
    imageObserver.observe(img);
  });
});

// ===== Modal de Confirmación de Asistencia =====
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('confirmationModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const confirmationForm = document.getElementById('confirmationForm');
  const modalGreeting = document.getElementById('modalGreeting');
  const fullNameInput = document.getElementById('fullName');
  const guestCountDisplay = document.getElementById('guestCount');
  const incrementBtn = document.getElementById('incrementGuests');
  const decrementBtn = document.getElementById('decrementGuests');

  let guestCount = 0;
  const MAX_GUESTS = 4;
  let modalOpened = false; // Flag para saber si el modal ya se abrió

  // Obtener nombre del localStorage
  const savedName = localStorage.getItem('userName');

  // Función para abrir el modal
  function openModal() {
    modalOpened = true;
    modal.classList.remove('hidden');

    // Personalizar el saludo con el nombre guardado
    if (savedName) {
      modalGreeting.textContent = `${savedName}, ¿Contamos contigo?`;
      fullNameInput.value = savedName;
    } else {
      modalGreeting.textContent = '¿Contamos contigo?';
    }
  }

  // Función para cerrar el modal
  function closeModal() {
    modal.classList.add('hidden');
    // Resetear formulario
    guestCount = 0;
    guestCountDisplay.textContent = guestCount;
  }

  // Abrir modal al hacer click en el botón
  if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
  }

  // Cerrar modal con el botón X
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Cerrar modal con el botón "Ya confirmé"
  const alreadyConfirmedBtn = document.getElementById('alreadyConfirmedBtn');
  if (alreadyConfirmedBtn) {
    alreadyConfirmedBtn.addEventListener('click', closeModal);
  }

  // Cerrar modal al hacer click fuera de él
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Incrementar contador de acompañantes
  incrementBtn.addEventListener('click', () => {
    if (guestCount < MAX_GUESTS) {
      guestCount++;
      guestCountDisplay.textContent = guestCount;
    }
  });

  // Decrementar contador de acompañantes
  decrementBtn.addEventListener('click', () => {
    if (guestCount > 0) {
      guestCount--;
      guestCountDisplay.textContent = guestCount;
    }
  });

  // Función de confetti (igual que en index.js)
  function triggerConfetti() {
    const colors = ['#EAC5B0', '#F8E6A2', '#E8CF6A', '#E8CF6A', '#8CA25B'];

    // Confeti desde la izquierda
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.5 },
      colors: colors,
      gravity: 0.8,
      drift: 0.3
    });

    // Confeti desde la derecha
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.5 },
      colors: colors,
      gravity: 0.8,
      drift: -0.3
    });
  }

  // Manejar envío del formulario
  confirmationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = fullNameInput.value.trim();
    const responseType = e.submitter.getAttribute('data-response');

    if (fullName) {
      // Actualizar campos ocultos antes de enviar a FormSubmit
      document.getElementById('guestCountInput').value = guestCount;
      document.getElementById('responseTypeInput').value = responseType === 'confirm' ? 'Confirmo asistencia' : 'Probablemente asistiré';
      document.getElementById('timestampInput').value = new Date().toLocaleString('es-CO', {
        timeZone: 'America/Bogota',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // Guardar datos en localStorage
      const confirmationData = {
        fullName: fullName,
        guests: guestCount,
        response: responseType,
        timestamp: new Date().toISOString()
      };

      localStorage.setItem('attendanceConfirmation', JSON.stringify(confirmationData));

      // Lanzar confetti
      triggerConfetti();

      // Mostrar mensaje de éxito y enviar formulario
      setTimeout(() => {
        alert(`¡Gracias ${fullName}! Tu confirmación ha sido registrada y enviada.`);
        // Enviar el formulario a FormSubmit
        confirmationForm.submit();
      }, 1000);
    }
  });

  // Abrir modal automáticamente después de 40 segundos si no se ha abierto ya
  setTimeout(() => {
    if (!modalOpened) {
      openModal();
    }
  }, 40000); // 40 segundos
});

