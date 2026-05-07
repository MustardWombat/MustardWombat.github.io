/**
 * Page transition curtain.
 *
 * OUT (index → project):
 *   Curtain wipes in, then a fixed setTimeout navigates after the animation
 *   has fully settled — avoids the choppy animationend race with page unload.
 *
 * IN (project page load):
 *   Curtain starts covering the screen and wipes back out to reveal the page.
 */

(function () {
    // Must match CSS animation-duration values below
    var CURTAIN_IN_MS  = 800;
    var CURTAIN_OUT_MS = 800;

    function getCurtain() {
        var el = document.getElementById('page-curtain');
        if (!el) {
            el = document.createElement('div');
            el.id = 'page-curtain';
            document.body.appendChild(el);
        }
        return el;
    }

    // ── outgoing (index page) ─────────────────────────────────────────────────
    document.querySelectorAll('.ps-item').forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            var url = null;
            var onclickAttr = item.getAttribute('onclick') || '';
            var match = onclickAttr.match(/window\.location\.href=['"]([^'"]+)['"]/);
            if (match) url = match[1];
            if (!url) return;

            var isFlipped = item.classList.contains('ps-flip');
            var curtain = getCurtain();

            // Reset, set direction, trigger
            curtain.removeAttribute('class');
            void curtain.offsetWidth; // force reflow so animation restarts cleanly
            curtain.classList.add(isFlipped ? 'from-right' : 'from-left');
            curtain.classList.add('entering');

            sessionStorage.setItem('pageTransition', '1');

            // Navigate only after curtain has fully covered the screen
            setTimeout(function () {
                window.location.href = url;
            }, CURTAIN_IN_MS);
        });
    });

    // ── incoming (project pages) ─────────────────────────────────────────────
    // The curtain was already injected by the inline <body> script before first
    // paint — so it's been covering the screen from the very first frame.
    // Here we just trigger the reveal animation.
    if (sessionStorage.getItem('pageTransition')) {
        sessionStorage.removeItem('pageTransition');

        var curtain = document.getElementById('page-curtain');
        if (!curtain) { curtain = getCurtain(); curtain.className = 'covering'; }

        // Small delay so the page content beneath has rendered before we reveal
        setTimeout(function () {
            curtain.classList.remove('covering');
            curtain.classList.add('exiting');

            // Clean up after exit animation
            curtain.addEventListener('animationend', function handler() {
                curtain.removeEventListener('animationend', handler);
                curtain.remove();
            });
            // Fallback
            setTimeout(function () {
                if (curtain.parentNode) curtain.remove();
            }, CURTAIN_OUT_MS + 300);
        }, 100);
    }
})();
