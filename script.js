document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const proposalScreen = document.getElementById('proposal-screen');
    const successScreen = document.getElementById('success-screen');

    // "No" button runaway logic
    noBtn.addEventListener('mouseover', moveButton);
    // For mobile support (though mouseover is mainly desktop, touchstart can trigger jump)
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent clicking
        moveButton();
    });

    function moveButton() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate allowed area (keep minimal padding)
        const padding = 20;
        const maxLeft = viewportWidth - btnRect.width - padding;
        const maxTop = viewportHeight - btnRect.height - padding;

        const newLeft = Math.floor(Math.random() * (maxLeft - padding)) + padding;
        const newTop = Math.floor(Math.random() * (maxTop - padding)) + padding;

        noBtn.style.position = 'fixed'; // Switch to fixed to move freely relative to viewport
        noBtn.style.left = `${newLeft}px`;
        noBtn.style.top = `${newTop}px`;

        showRandomMessage();
    }

    function showRandomMessage() {
        const messages = [
            "are manjao naa🥺",
            "are please na yaar😣(momo khilaunga)",
            "kyu aisa krre ho? 😢",
            "maan jao na cutie 🥰(pasta khilaunga)",
            "kitna bhav khaogi? 🙄",
            "please? 🥺👉👈(savana dilaunga)"
        ];

        const message = messages[Math.floor(Math.random() * messages.length)];

        // Remove existing message if any
        const existingMsg = document.querySelector('.no-interaction-msg');
        if (existingMsg) {
            existingMsg.remove();
        }

        const msgEl = document.createElement('div');
        msgEl.textContent = message;
        msgEl.className = 'no-interaction-msg';

        // Style it to appear near the random position, or fixed center/toast
        // Let's make it fixed centered or near the button. 
        // A toast style at the top or bottom might be better to not be covered by the button jumping around.
        // Let's go with a floating message near the cursor or center. Center is safest.

        Object.assign(msgEl.style, {
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '10px 20px',
            borderRadius: '20px',
            boxShadow: '0 4px 15px rgba(14, 165, 233, 0.2)',
            color: '#0ea5e9',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            zIndex: '1000',
            pointerEvents: 'none',
            animation: 'fadeInOut 2s ease-in-out forwards'
        });

        document.body.appendChild(msgEl);

        setTimeout(() => {
            if (msgEl.parentNode) msgEl.parentNode.removeChild(msgEl);
        }, 2000);
    }

    // Add CSS for the message animation if not present
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -40%); }
            20% { opacity: 1; transform: translate(-50%, -50%); }
            80% { opacity: 1; transform: translate(-50%, -50%); }
            100% { opacity: 0; transform: translate(-50%, -60%); }
        }
    `;
    document.head.appendChild(style);

    const slide1 = document.getElementById('slide-1');
    const slide2 = document.getElementById('slide-2');
    const next1Btn = document.getElementById('next-1-btn');
    const next2Btn = document.getElementById('next-2-btn');

    // "Yes" button click logic -> Show Slide 1
    yesBtn.addEventListener('click', () => {
        proposalScreen.style.display = 'none';
        slide1.classList.remove('hidden');
        slide1.style.display = 'block';
    });

    // Slide 1 Next -> Show Slide 2
    next1Btn.addEventListener('click', () => {
        slide1.style.display = 'none';
        slide2.classList.remove('hidden');
        slide2.style.display = 'block';
    });

    // Slide 2 Next -> Show Success
    next2Btn.addEventListener('click', () => {
        slide2.style.display = 'none';
        fireConfetti();
        successScreen.classList.remove('hidden');
        successScreen.style.display = 'block';
    });

    function fireConfetti() {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            colors: ['#0ea5e9', '#7dd3fc', '#ffffff']
        };

        function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    }
    // Decoration Logic
    function createSparkles() {
        const container = document.querySelector('.sparkles-container');
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDelay = `${Math.random() * 3}s`;
            container.appendChild(sparkle);
        }
    }

    function createClouds() {
        const container = document.querySelector('.cloud-container');
        for (let i = 0; i < 5; i++) {
            const cloud = document.createElement('div');
            cloud.classList.add('cloud');

            // Random size variation
            const width = 100 + Math.random() * 100;
            const height = width * 0.6;
            cloud.style.width = `${width}px`;
            cloud.style.height = `${height}px`;

            // Random position and delay
            cloud.style.top = `${Math.random() * 80}%`;
            cloud.style.animationDuration = `${15 + Math.random() * 20}s`;
            cloud.style.animationDelay = `${Math.random() * -20}s`; // Start mid-animation

            container.appendChild(cloud);
        }
    }

    createSparkles();
    createClouds();
});
