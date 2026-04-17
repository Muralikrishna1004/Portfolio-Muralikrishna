// Include Tailwind via CDN directly to interpret Tailwind classes immediately.
const tailwindScript = document.createElement('script');
tailwindScript.src = "https://cdn.tailwindcss.com";
document.head.appendChild(tailwindScript);

// Optional Configuration
tailwindScript.onload = () => {
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    muraliblue: '#3B82F6',
                    muralibg: '#050816',
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Current Year Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile Navbar toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    
    // Profile Picture 5-second in-box reveal logic
    const viewPicBtn = document.getElementById('view-pic-btn');
    const profileImgDisplay = document.getElementById('profile-img-display');
    let profileTimeout;
    
    if (viewPicBtn && profileImgDisplay) {
        viewPicBtn.addEventListener('click', () => {
            // Hide button smoothly
            viewPicBtn.style.opacity = '0';
            viewPicBtn.style.pointerEvents = 'none';
            viewPicBtn.classList.remove('hover:-translate-y-1');

            // Show image smoothly
            profileImgDisplay.classList.remove('opacity-0', 'scale-110', 'pointer-events-none');
            profileImgDisplay.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
            
            if (profileTimeout) clearTimeout(profileTimeout);

            // Hide after exactly 5 seconds
            profileTimeout = setTimeout(() => {
                // Hide image
                profileImgDisplay.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
                profileImgDisplay.classList.add('opacity-0', 'scale-110', 'pointer-events-none');
                
                // Show button
                viewPicBtn.style.opacity = '1';
                viewPicBtn.style.pointerEvents = 'auto';
                viewPicBtn.classList.add('hover:-translate-y-1');
            }, 5000);
        });
    }

    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Reveal elements on scroll
    const unobserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => unobserver.observe(el));

    // Typewriter effect logic specifically tailored to replicate exactly the screenshot's state
    const typewriterElement = document.getElementById('typewriter');
    const roleTexts = ["Python Full Stack Developer", "Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = roleTexts[roleIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typewriterElement.textContent = currentWord.substring(0, charIndex);
        
        let typeSpeed = isDeleting ? 30 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 1500; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roleTexts.length;
            typeSpeed = 500;
        }
        
        typewriterElement.classList.add('typing-cursor');
        setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 800);

    // Web3Forms Contact Form Logic (Converted from React)
    const contactForm = document.getElementById('contact-form');
    const formResult = document.getElementById('form-result');

    if(contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            formResult.textContent = "Sending...";
            formResult.className = "text-sm font-bold mt-2 text-center text-gray-500";

            const formData = new FormData(event.target);
            // Ensure access key is definitely set (overwrites if duped from HTML)
            formData.set("access_key", "3f0e8b19-08d5-401f-807f-e9685e960a8a");

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();
                
                if (data.success) {
                    formResult.textContent = "Success! Message Delivered.";
                    formResult.className = "text-sm font-bold mt-2 text-center text-green-500";
                    contactForm.reset();
                } else {
                    // Show exactly what the server says failed
                    formResult.textContent = "Error: " + data.message;
                    formResult.className = "text-sm font-bold mt-2 text-center text-red-500";
                }
            } catch (error) {
                formResult.textContent = "Error: Could not connect to mail server.";
                formResult.className = "text-sm font-bold mt-2 text-center text-red-500";
            }
        });
    }

    // --- Particles JS Configuration for Space/Parallax Effect ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 70,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#ffffff", "#3B82F6", "#8b5cf6"] // White and theme colored stars
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.8,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.3,
                        "sync": false
                    }
                },
                "size": {
                    "value": 6,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 2,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false // No lines between dots to match the screenshot
                },
                "move": {
                    "enable": true,
                    "speed": 0.6, // Slow drift
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "window", // Changed to window so parallax works immediately
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "parallax"
                    },
                    "onclick": {
                        "enable": false,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "parallax": {
                        "force": 40,
                        "smooth": 10
                    }
                }
            },
        });

        // Custom Fast Parallax Scroll Effect for Particles (Match Video)
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const deltaY = currentScrollY - lastScrollY;
            lastScrollY = currentScrollY;

            if (window.pJSDom && window.pJSDom.length > 0) {
                const pJS = window.pJSDom[0].pJS;
                pJS.particles.array.forEach(p => {
                    // Make the dots move in a slanting/circular pattern rapidly on scroll
                    // We modify both x and y to give it a curved or diagonal pass-by feel
                    p.y -= deltaY * 3.5; 
                    p.x -= deltaY * 1.5; 

                    // Ensure safe wrapping around the canvas
                    if (pJS.canvas.h > 0) {
                        p.y = (p.y % pJS.canvas.h + pJS.canvas.h) % pJS.canvas.h;
                    }
                    if (pJS.canvas.w > 0) {
                        p.x = (p.x % pJS.canvas.w + pJS.canvas.w) % pJS.canvas.w;
                    }
                });
            }
        });
    }
});
