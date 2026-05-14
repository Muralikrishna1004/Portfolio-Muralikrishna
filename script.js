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

    // --- Three.js 3D Parallax Background ---
    let scene, camera, renderer, meshGroup, particleSystem;
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let targetScrollY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    function initThreeJS() {
        const container = document.getElementById('canvas-container');
        if (!container) return;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.z = 1000;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        meshGroup = new THREE.Group();
        scene.add(meshGroup);

        // Particles Geometry
        const particlesCount = 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);

        const colorOptions = [
            new THREE.Color('#3B82F6'),
            new THREE.Color('#60A5FA'),
            new THREE.Color('#ffffff')
        ];

        for (let i = 0; i < particlesCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 2500;
            positions[i + 1] = (Math.random() - 0.5) * 2500;
            positions[i + 2] = (Math.random() - 0.5) * 2500;

            const clr = colorOptions[Math.floor(Math.random() * colorOptions.length)];
            colors[i] = clr.r;
            colors[i + 1] = clr.g;
            colors[i + 2] = clr.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 4,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        particleSystem = new THREE.Points(geometry, material);
        meshGroup.add(particleSystem);

        // Add a subtle wireframe mesh for more 3D depth
        const meshGeometry = new THREE.IcosahedronGeometry(700, 2);
        const meshMaterial = new THREE.MeshBasicMaterial({
            color: 0x3B82F6,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        const mesh = new THREE.Mesh(meshGeometry, meshMaterial);
        meshGroup.add(mesh);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onWindowResize);
        window.addEventListener('scroll', onScroll);

        animate();
    }

    function onMouseMove(event) {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    }

    function onScroll() {
        targetScrollY = window.scrollY;
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        const time = Date.now() * 0.0005;
        
        targetX = mouseX * 0.001; 
        targetY = mouseY * 0.001;

        if (meshGroup) {
            // Constant base rotation (Automatic movement)
            meshGroup.rotation.y += 0.0015;
            meshGroup.rotation.x += 0.001;
            
            // Mouse movement lerp (Interactive movement)
            meshGroup.rotation.x += (targetY - meshGroup.rotation.x) * 0.05;
            meshGroup.rotation.y += (targetX - meshGroup.rotation.y) * 0.05;

            // Scroll movement lerp (Parallax)
            const scrollParallax = targetScrollY * 0.3;
            meshGroup.position.y += (scrollParallax - meshGroup.position.y) * 0.05;

            // Automatic "Floating" oscillation
            meshGroup.position.x = Math.sin(time * 0.5) * 50;
            meshGroup.position.z = Math.cos(time * 0.3) * 30;

            if (particleSystem) {
                // Individual particle drift effect
                particleSystem.rotation.z = Math.sin(time * 0.2) * 0.1;
                
                // Pulsating effect for the particles
                const scale = 1 + Math.sin(time) * 0.05;
                particleSystem.scale.set(scale, scale, scale);
            }
        }

        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    initThreeJS();

    // Hide Preloader on Window Load
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 700);
        }
    });

    // --- Custom Cursor Logic ---
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursor-dot');
    
    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            // Cursor dot follows immediately
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Outer cursor follows with slight delay (handled by CSS transition or JS lerp)
            // Here we use requestAnimationFrame for smoother following if needed, 
            // but simple CSS transition on transform/left/top also works.
            cursor.style.left = `${posX}px`;
            cursor.style.top = `${posY}px`;
        });

        // Expand cursor on hoverable elements
        const hoverables = document.querySelectorAll('a, button, .skill-item, .vertical-timeline-element-content');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
    }

    // --- Scroll Progress Logic ---
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }
    });

    // --- Skill Bars Animation ---
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-progress');
                    bar.style.width = targetWidth;
                });
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
});

