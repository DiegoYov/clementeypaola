// Tailwind configuration
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#763524", // Brown
                "accent": "#849B43", // Green
                "text-main": "#763524",
                "text-muted": "#8c5b4d",
            },
            fontFamily: {
                "display": ["Manrope", "sans-serif"],
                "serif": ['Cormorant Garamond', 'serif'],
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        },
    },
};

// Audio control
document.addEventListener('DOMContentLoaded', function () {
    const bgMusic = document.getElementById('bgMusic');
    const muteButton = document.getElementById('muteButton');
    const volumeIcon = document.getElementById('volumeIcon');
    let isMuted = false;

    // Function to handle audio play with user interaction
    function startAudio() {
        // Try to play the audio
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Autoplay was prevented, show play button
                muteButton.classList.remove('hidden');
                volumeIcon.textContent = 'volume_off';
            });
        }
    }

    // Handle mute/unmute
    muteButton.addEventListener('click', function (event) {
        // Prevent this click from triggering the document-level click listener
        event.stopPropagation();

        if (bgMusic.paused) {
            // If audio is paused, play it
            bgMusic.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            volumeIcon.textContent = 'volume_up';
        } else {
            // If audio is playing, pause it
            bgMusic.pause();
            volumeIcon.textContent = 'volume_off';
        }
    });

    // Set and lock volume to 50%
    function setVolumeTo50() {
        bgMusic.volume = 0.5;
    }

    // Set initial volume and prevent volume changes
    setVolumeTo50();

    // Prevent volume changes through browser controls or other means
    bgMusic.addEventListener('volumechange', function () {
        if (this.volume !== 0.5) {
            setVolumeTo50();
        }
    });

    // Try to start audio on page load (may be blocked by browser autoplay policies)
    startAudio();

    // Also try to start audio on first user interaction
    document.addEventListener('click', function initAudio() {
        setVolumeTo50();
        startAudio();
        // Remove this event listener after first interaction
        document.removeEventListener('click', initAudio);
    }, { once: true });

    // Hide swipe up indicator after 10 seconds
    const swipeUpIndicator = document.getElementById('swipeUpIndicator');
    if (swipeUpIndicator) {
        setTimeout(() => {
            swipeUpIndicator.style.opacity = '0';
            // Remove from DOM after fade out completes
            setTimeout(() => {
                swipeUpIndicator.style.display = 'none';
            }, 500); // Match this with the CSS transition duration
        }, 10000); // 10 seconds
    }
});