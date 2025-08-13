// ---- Mascot init (runs after nav is in DOM) ----
          const HELP_LINK_ID = 'help-link';
          const MASCOT_ID = 'mascot';
          const MASCOT_IMG_ID = 'mascot-img';
          const MASCOT_CLOSE_ID = 'mascot-close';
    
          // You said you renamed the file to protracty.png and it’s in the site root:
          const MASCOT_SRC = '/protracty.png';
    
          let mascotReady = false;
          let processedURL = null;
    
          async function loadAndKeyWhite(src) {
            const img = new Image();
            img.src = src;               // same-origin (GitHub Pages)
            await img.decode();
    
            const c = document.createElement('canvas');
            c.width = img.width; c.height = img.height;
            const ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0);
    
            const data = ctx.getImageData(0, 0, c.width, c.height);
            const d = data.data;
            for (let i = 0; i < d.length; i += 4) {
              const r = d[i], g = d[i+1], b = d[i+2];
              if (r > 245 && g > 245 && b > 245) d[i+3] = 0; // key out near-white
            }
            ctx.putImageData(data, 0, 0);
            return c.toDataURL('image/png');
          }
    
          async function showMascot() {
            const wrap = document.getElementById(MASCOT_ID);
            const imgEl = document.getElementById(MASCOT_IMG_ID);
    
            if (!mascotReady) {
              try {
                processedURL = await loadAndKeyWhite(MASCOT_SRC);
                imgEl.src = processedURL;
                mascotReady = true;
              } catch (e) {
                console.error('Mascot load failed:', e);
                imgEl.src = MASCOT_SRC; // fallback (with white background)
              }
            }
            wrap.hidden = false;
          }
    
          function hideMascot() {
            const wrap = document.getElementById(MASCOT_ID);
            if (wrap) wrap.hidden = true;
          }
    
          const helpLink = document.getElementById(HELP_LINK_ID);
          const closeBtn = document.getElementById(MASCOT_CLOSE_ID);
          console.log('Help link found?', !!helpLink, 'Mascot found?', !!document.getElementById(MASCOT_ID), 'MASCOT_SRC:', MASCOT_SRC);
    
          if (helpLink) helpLink.addEventListener('click', (e) => { e.preventDefault(); showMascot(); });
          if (closeBtn) closeBtn.addEventListener('click', hideMascot);
