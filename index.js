tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "cielo-claro": "#F8E6A2",
        "melocoton-calido": "#E8CF6A",
        "rosa-globo": "#EAC5B0",
        "crema-nube": "#F8E6A2",
        "marron-suave": "#1E3923",
        "marron-texto": "#8B4530",
        "verde-menta": "#8CA25B",
        "amarillo-luz": "#E8CF6A"
      },
      fontFamily: {
        "display": ["Playfair Display", "serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'fade-out': 'fadeOut 0.5s ease-out',
        'pulse-soft': 'pulse 2s ease-in-out infinite',
      }
    },
  },
}

// Verificar si hay un nombre guardado en localStorage
const savedName = localStorage.getItem('userName');
const nameFormContainer = document.getElementById('nameFormContainer');
const cardContainer = document.getElementById('cardContainer');
const mainTitle = document.getElementById('mainTitle');
const subtitle = document.getElementById('subtitle');
const nameForm = document.getElementById('nameForm');
const userNameInput = document.getElementById('userName');

// Variable para controlar el timeout del typewriter
let typeWriterTimeout = null;

// Función de efecto typewriter (tecleando letra por letra) - retorna una promesa
function typeWriter(element, text, speed = 100) {
  return new Promise((resolve) => {
    // Limpiar cualquier animación anterior
    if (typeWriterTimeout) {
      clearTimeout(typeWriterTimeout);
    }
    
    element.textContent = '';
    let i = 0;
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        typeWriterTimeout = setTimeout(type, speed);
      } else {
        typeWriterTimeout = null;
        resolve(); // Resolver la promesa cuando termine
      }
    }
    
    type();
  });
}

// Función para actualizar la UI cuando hay un nombre guardado
async function showCardWithName(name) {
  // Limpiar cualquier animación anterior
  if (typeWriterTimeout) {
    clearTimeout(typeWriterTimeout);
    typeWriterTimeout = null;
  }
  
  // Ocultar formulario y mostrar carta
  nameFormContainer.style.display = 'none';
  cardContainer.classList.remove('hidden');
  cardContainer.style.animation = 'slideUp 0.8s ease-out';
  
  // Actualizar el título con animación fadeOut primero
  mainTitle.style.animation = 'fadeOut 0.5s ease-out';
  
  setTimeout(async () => {
    // Aplicar efecto typewriter al nuevo texto del título
    const newText = `${name}, Tienes una invitación muy especial`;
    mainTitle.style.animation = 'none';
    
    // Esperar a que termine la animación del título
    await typeWriter(mainTitle, newText, 60);
    
    // Después de que termine el título, animar el texto de instrucción
    const cardInstruction = document.getElementById('cardInstruction');
    if (cardInstruction) {
      await typeWriter(cardInstruction, 'Haz clic en la carta y acompáñanos', 50);
    }
  }, 500);
}

// Si ya hay un nombre guardado, mostrar la carta directamente
if (savedName) {
  nameFormContainer.style.display = 'none';
  mainTitle.textContent = `${savedName}, Tienes una invitación muy especial`;
  const cardInstruction = document.getElementById('cardInstruction');
  if (cardInstruction) {
    cardInstruction.textContent = 'Haz clic en la carta y acompáñanos';
  }
  cardContainer.classList.remove('hidden');
} else {
  // Si no hay nombre, ocultar la carta
  cardContainer.classList.add('hidden');
}

// Variable para prevenir múltiples envíos
let isProcessing = false;

// Manejar el envío del formulario
nameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Prevenir múltiples envíos
  if (isProcessing) return;
  
  const name = userNameInput.value.trim();
  
  if (name) {
    isProcessing = true;
    
    // Guardar el nombre en localStorage
    localStorage.setItem('userName', name);
    
    // Animación de confeti desde los bordes
    triggerConfetti();
    
    // Animar la transición
    nameFormContainer.style.animation = 'fadeOut 0.5s ease-out';
    
    setTimeout(() => {
      showCardWithName(name);
      isProcessing = false;
    }, 500);
  }
});

// Permitir enviar con Enter
userNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    nameForm.dispatchEvent(new Event('submit'));
  }
});

// Función para resetear el nombre
function resetName() {
  localStorage.removeItem('userName');
  // Restablecer UI al estado inicial
  mainTitle.textContent = 'Tienes una invitación muy especial';
  nameFormContainer.style.display = 'block';
  nameFormContainer.style.animation = 'slideUp 0.8s ease-out';
  cardContainer.classList.add('hidden');
  userNameInput.value = '';
}

// Función para activar confeti desde los costados (una sola vez)
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

// Botón de resetear
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetName);