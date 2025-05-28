// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('hcv-theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    if (isDark) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
        localStorage.setItem('hcv-theme', 'dark');
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
        localStorage.setItem('hcv-theme', 'light');
    }
});

// Initialize empty bookmarks and progress in local storage if not exists
if (!localStorage.getItem('hcv-bookmarks')) {
    localStorage.setItem('hcv-bookmarks', JSON.stringify([]));
}

if (!localStorage.getItem('hcv-progress')) {
    localStorage.setItem('hcv-progress', JSON.stringify({}));
}
