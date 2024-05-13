function createFirefly() {
    const firefly = document.createElement('div');
    firefly.classList.add('firefly');
    firefly.style.left = `${Math.random() * window.innerWidth}px`;
    firefly.style.top = `${Math.random() * window.innerHeight}px`;
    document.getElementById('fireflies-container').appendChild(firefly);

    // Animate firefly movement
    animateFirefly(firefly);
}
function animateFirefly(firefly) {
    const animationDuration = Math.random() * 8000 + 16000; // Random duration between 3 and 11 seconds
    const startX = parseFloat(firefly.style.left);
    const startY = parseFloat(firefly.style.top);
    const endX = Math.random() * window.innerWidth;
    const endY = Math.random() * window.innerHeight;
    const startTime = Date.now();

    function update() {
        const timePassed = Date.now() - startTime;
        const progress = timePassed / animationDuration;

        if (progress > 1) {
            // firefly.remove(); // Remove firefly when animation is complete
            animateFirefly(firefly);
            return;
        }

        const currentX = startX + (endX - startX) * progress;
        const currentY = startY + (endY - startY) * progress;

        firefly.style.left = currentX + 'px';
        firefly.style.top = currentY + 'px';

        requestAnimationFrame(update);
    }

    update();
}

function createFireflies(num) {
    for (let i = 0; i < num; i++) {
        createFirefly();
    }
}

createFireflies(100); // Adjust the number of fireflies as desired
