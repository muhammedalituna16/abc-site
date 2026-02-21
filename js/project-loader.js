document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const appKey = urlParams.get('app');

    if (!appKey || !projectsData[appKey]) {
        window.location.href = "../index.html";
        return;
    }

    const data = projectsData[appKey];

    // Meta ve Tema Ayarları
    document.title = `${data.title} - Lorenta Labs`;
    const root = document.documentElement;
    root.style.setProperty('--primary-color', data.themeColor || '#f9d720');
    root.style.setProperty('--bg-main', data.bgColor || '#ffffff');
    root.style.setProperty('--bg-secondary', data.secondaryBg || '#f9fafb');
    root.style.setProperty('--text-primary', data.textColor || '#111111');
    root.style.setProperty('--font-main', data.fontFamily || "'Lato', sans-serif");
    
    // Yazı rengini tüm sayfaya zorla uygula
    document.body.style.color = data.textColor || '#111111';

    // 1 & 2 - NameLogo ve Tagline
    const titleContainer = document.getElementById('p-title');
    if (data.nameLogo) {
        titleContainer.innerHTML = `<img src="${data.nameLogo}" alt="${data.title}" class="mx-auto h-64 md:h-[350px] w-auto object-contain">`;
    } else {
        titleContainer.innerText = data.title || "";
    }

    // Hakkında Başlığı, Açıklama ve Logo
    const aboutTitle = document.getElementById('p-about-title');
    if (aboutTitle) aboutTitle.innerText = `About ${data.title}`;

    document.getElementById('p-description').innerText = data.description || "";
    const mainLogo = document.getElementById('p-logo');
    if (mainLogo) mainLogo.src = data.logo || "";
    
    // Store Butonları
    const playBtn = document.getElementById('p-playstore');
    const appBtn = document.getElementById('p-appstore');
    if (data.playStore && data.playStore !== "#") { 
        playBtn.href = data.playStore; 
        playBtn.style.display = "block"; 
    } else { 
        playBtn.style.display = "none"; 
    }
    if (data.appStore && data.appStore !== "#") { 
        appBtn.href = data.appStore; 
        appBtn.style.display = "block"; 
    } else { 
        appBtn.style.display = "none"; 
    }

    // 5 - Features
    const featuresContainer = document.getElementById('p-features');
    if (featuresContainer) {
        featuresContainer.innerHTML = (data.features || []).map(f => `
            <div class="feature-card p-8 rounded-xl border border-gray-500/10 shadow-sm transition-all" style="background-color: var(--bg-main)">
                <h3 class="text-xl font-bold mb-2 text-center" style="color: var(--primary-color)">${f.title}</h3>
                <p class="opacity-80 text-center">${f.desc}</p>
            </div>
        `).join('');
    }

    // Galeri
    const galleryContainer = document.getElementById('p-gallery');
    if (data.screenshots && data.screenshots.length > 0) {
        galleryContainer.innerHTML = data.screenshots.map(src => `
            <div class="gallery-item overflow-hidden rounded-[30px] shadow-lg transition-transform hover:scale-105 border border-white/5">
                <img src="${src}" alt="Screenshot" class="w-full h-auto" loading="lazy">
            </div>
        `).join('');
    } else {
        const gallerySection = document.querySelector('.gallery-section');
        if (gallerySection) gallerySection.style.display = "none";
    }
});