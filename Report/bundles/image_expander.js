// img expander - made by adam b 
// derived from previous git project used in h1k.sh, helios.ac and hisc.life

function initImageExpander() {
    const overlay = document.createElement('div');
    overlay.id = 'image-overlay';
    overlay.innerHTML = `
        <div class="overlay-backdrop"></div>
        <img class="overlay-image" src="" alt="">
    `;
    document.body.appendChild(overlay);

    const styles = document.createElement('style');
    styles.textContent = `
        #image-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 9999;
            justify-content: center;
            align-items: center;
        }
        #image-overlay.active {
            display: flex;
        }
        .overlay-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            cursor: pointer;
        }
        .overlay-image {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            object-fit: contain;
            border-radius: 8px;
        }
        #content img {
            cursor: zoom-in;
        }
    `;
    document.head.appendChild(styles);

    const overlayImg = overlay.querySelector('.overlay-image');
    const backdrop = overlay.querySelector('.overlay-backdrop');

    document.addEventListener('click', (e) => {
        if (e.target.matches('#content img')) {
            overlayImg.src = e.target.src;
            overlayImg.alt = e.target.alt;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    function closeOverlay() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    backdrop.addEventListener('click', closeOverlay);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeOverlay();
        }
    });
}

document.addEventListener('DOMContentLoaded', initImageExpander);
