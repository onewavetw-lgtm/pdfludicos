document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. --- COUNTDOWN TIMER (01:59:00) ---
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        let timeLeft = 7140; // 1 hour 59 minutes default

        // Persistent timer using localStorage
        const savedTime = localStorage.getItem('kit_maes_countdown_val');
        const savedStamp = localStorage.getItem('kit_maes_countdown_stamp');

        if (savedTime && savedStamp) {
            const now = Math.floor(Date.now() / 1000);
            const passed = now - parseInt(savedStamp);
            const remaining = parseInt(savedTime) - passed;

            if (remaining > 0) {
                timeLeft = remaining;
            } else {
                timeLeft = 120; // If expired, reset to 2 minutes
            }
        }

        function updateTimer() {
            const hours = Math.floor(timeLeft / 3600);
            const mins = Math.floor((timeLeft % 3600) / 60);
            const secs = timeLeft % 60;

            if (hours > 0) {
                countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            } else {
                countdownElement.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            }

            if (timeLeft > 0) {
                timeLeft--;
                localStorage.setItem('kit_maes_countdown_val', timeLeft);
                localStorage.setItem('kit_maes_countdown_stamp', Math.floor(Date.now() / 1000));
            } else {
                timeLeft = 300; // Reset to 5m when finished
            }
        }

        setInterval(updateTimer, 1000);
        updateTimer();
    }

    // 3. --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                const offset = 80; // height of the urgency bar
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. --- VSL INTERACTION (Real Player Embedded) ---


    // 5. --- FAKE SALES POPUP ---
    const popup = document.getElementById('sales-popup');
    const popupName = document.getElementById('popup-name');

    const names = [
        "Prof. Maria S.", "Teacher João P.", "Prof. Ana C.", "Teacher Carlos M.", "Prof. Juliana T.",
        "Teacher Roberto F.", "Prof. Fernanda G.", "Teacher Lucas B.", "Prof. Amanda R.", "Teacher Thiago L."
    ];

    function showRandomSale() {
        if (!popup) return;

        // Randomly select a name
        const randomName = names[Math.floor(Math.random() * names.length)];
        popupName.textContent = randomName;

        // Show popup
        popup.classList.add('show');

        // Hide after 5 seconds
        setTimeout(() => {
            popup.classList.remove('show');
        }, 5000);

        // Next sale in 15 to 35 seconds
        const nextTime = Math.floor(Math.random() * (35000 - 15000 + 1) + 15000);
        setTimeout(showRandomSale, nextTime);
    }

    // Start popup logic after 10 seconds of page load
    setTimeout(showRandomSale, 10000);
});
