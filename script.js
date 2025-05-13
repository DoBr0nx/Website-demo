// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create the Orion constellation
    createOrionConstellation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Create galaxy SVG elements
    createGalaxySVG();
    
    // Add shooting stars periodically
    setInterval(createShootingStar, 4000);
    
    // Add animation classes to dashboard elements
    addAnimationClasses();
    
    // Initialize interactive background stars
    createInteractiveBackgroundStars();
    
    // Add mouse move event for star interaction
    document.addEventListener('mousemove', handleMouseMove);
});

// Create constellations
function createOrionConstellation() {
    const orion = document.getElementById('orion-constellation');
    
    // Define multiple constellations
    const constellations = [
        // Orion constellation
        {
            name: 'Orion',
            stars: [
                { x: 20, y: 20, name: 'Betelgeuse', size: 2.5 },
                { x: 30, y: 40, name: 'Bellatrix', size: 2 },
                { x: 40, y: 25, name: 'Mintaka', size: 1.8 },
                { x: 50, y: 25, name: 'Alnilam', size: 2 },
                { x: 60, y: 25, name: 'Alnitak', size: 1.8 },
                { x: 70, y: 40, name: 'Saiph', size: 2 },
                { x: 80, y: 20, name: 'Rigel', size: 2.5 }
            ],
            connections: [
                [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
                [1, 3], [3, 5]
            ]
        },
        // Big Dipper (part of Ursa Major)
        {
            name: 'Big Dipper',
            stars: [
                { x: 15, y: 70, name: 'Alkaid', size: 2 },
                { x: 25, y: 75, name: 'Mizar', size: 2 },
                { x: 35, y: 78, name: 'Alioth', size: 2.2 },
                { x: 45, y: 80, name: 'Megrez', size: 1.8 },
                { x: 50, y: 70, name: 'Phecda', size: 2 },
                { x: 60, y: 65, name: 'Merak', size: 2 },
                { x: 70, y: 75, name: 'Dubhe', size: 2.2 }
            ],
            connections: [
                [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]
            ]
        },
        // Cassiopeia
        {
            name: 'Cassiopeia',
            stars: [
                { x: 85, y: 35, name: 'Segin', size: 1.8 },
                { x: 80, y: 45, name: 'Ruchbah', size: 2 },
                { x: 70, y: 50, name: 'Gamma Cas', size: 2.2 },
                { x: 60, y: 45, name: 'Schedar', size: 2 },
                { x: 55, y: 35, name: 'Caph', size: 1.8 }
            ],
            connections: [
                [0, 1], [1, 2], [2, 3], [3, 4]
            ]
        },
        // Lyra (small constellation)
        {
            name: 'Lyra',
            stars: [
                { x: 25, y: 15, name: 'Vega', size: 2.5 },
                { x: 30, y: 10, name: 'Epsilon Lyrae', size: 1.5 },
                { x: 35, y: 15, name: 'Zeta Lyrae', size: 1.8 },
                { x: 30, y: 20, name: 'Beta Lyrae', size: 2 },
                { x: 20, y: 20, name: 'Gamma Lyrae', size: 1.8 }
            ],
            connections: [
                [0, 1], [1, 2], [2, 3], [3, 4], [4, 0]
            ]
        },
        // Cygnus (Northern Cross)
        {
            name: 'Cygnus',
            stars: [
                { x: 90, y: 10, name: 'Deneb', size: 2.2 },
                { x: 85, y: 15, name: 'Epsilon Cygni', size: 1.5 },
                { x: 80, y: 20, name: 'Gamma Cygni', size: 2 },
                { x: 75, y: 25, name: 'Delta Cygni', size: 1.5 },
                { x: 70, y: 30, name: 'Albireo', size: 1.8 },
                { x: 75, y: 20, name: 'Zeta Cygni', size: 1.5 },
                { x: 85, y: 20, name: 'Eta Cygni', size: 1.5 }
            ],
            connections: [
                [0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [2, 6]
            ]
        }
    ];
    
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.classList.add('orion-svg');
    
    // Create all constellations
    constellations.forEach(constellation => {
        const constellationGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        constellationGroup.classList.add('constellation-group');
        constellationGroup.dataset.name = constellation.name;
        
        // Create connections first (so they appear behind stars)
        constellation.connections.forEach(connection => {
            const star1 = constellation.stars[connection[0]];
            const star2 = constellation.stars[connection[1]];
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', star1.x + '%');
            line.setAttribute('y1', star1.y + '%');
            line.setAttribute('x2', star2.x + '%');
            line.setAttribute('y2', star2.y + '%');
            line.setAttribute('stroke', 'rgba(255, 255, 255, 0.15)');
            line.setAttribute('stroke-width', '0.5');
            line.setAttribute('stroke-dasharray', '3,3');
            line.classList.add('constellation-line');
            line.dataset.constellation = constellation.name;
            
            // Add animation to the line
            const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            animate.setAttribute('attributeName', 'stroke-dashoffset');
            animate.setAttribute('from', '0');
            animate.setAttribute('to', '20');
            animate.setAttribute('dur', (3 + Math.random() * 2) + 's');
            animate.setAttribute('repeatCount', 'indefinite');
            
            line.appendChild(animate);
            constellationGroup.appendChild(line);
        });
        
        // Create stars
        constellation.stars.forEach(star => {
            // Create star circle
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', star.x + '%');
            circle.setAttribute('cy', star.y + '%');
            circle.setAttribute('r', star.size);
            circle.setAttribute('fill', 'white');
            circle.setAttribute('opacity', '0.7'); // Less bright
            circle.classList.add('constellation-star');
            circle.dataset.name = star.name;
            circle.dataset.constellation = constellation.name;
            
            // Add glow effect
            const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
            filter.setAttribute('id', `glow-${star.name}`);
            
            const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
            feGaussianBlur.setAttribute('stdDeviation', '1.5'); // Reduced glow
            feGaussianBlur.setAttribute('result', 'blur');
            
            const feComposite = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
            feComposite.setAttribute('in', 'SourceGraphic');
            feComposite.setAttribute('in2', 'blur');
            feComposite.setAttribute('operator', 'atop');
            
            filter.appendChild(feGaussianBlur);
            filter.appendChild(feComposite);
            
            svg.appendChild(filter);
            
            circle.setAttribute('filter', `url(#glow-${star.name})`);
            
            // Add pulsing animation
            const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            animate.setAttribute('attributeName', 'opacity');
            animate.setAttribute('values', '0.7;0.4;0.7'); // Less bright
            animate.setAttribute('dur', (3 + Math.random() * 2) + 's');
            animate.setAttribute('repeatCount', 'indefinite');
            
            circle.appendChild(animate);
            constellationGroup.appendChild(circle);
            
            // Add star name and constellation name (hidden by default, shown on hover)
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', (star.x + 1) + '%');
            text.setAttribute('y', (star.y - 1) + '%');
            text.setAttribute('fill', 'white');
            text.setAttribute('font-size', '8'); // Smaller text
            text.setAttribute('opacity', '0');
            text.textContent = `${star.name} (${constellation.name})`;
            text.classList.add('star-label');
            text.dataset.constellation = constellation.name;
            
            // Add hover effect
            circle.addEventListener('mouseover', () => {
                // Show star name
                text.setAttribute('opacity', '1');
                
                // Highlight the star
                circle.setAttribute('r', star.size * 1.5);
                
                // Highlight all stars in the same constellation
                const constellationStars = document.querySelectorAll(`.constellation-star[data-constellation="${constellation.name}"]`);
                constellationStars.forEach(constellationStar => {
                    if (constellationStar !== circle) {
                        constellationStar.setAttribute('opacity', '0.9');
                    }
                });
                
                // Highlight connected lines
                const lines = document.querySelectorAll(`.constellation-line[data-constellation="${constellation.name}"]`);
                lines.forEach(line => {
                    if ((line.getAttribute('x1') === star.x + '%' && line.getAttribute('y1') === star.y + '%') ||
                        (line.getAttribute('x2') === star.x + '%' && line.getAttribute('y2') === star.y + '%')) {
                        line.setAttribute('stroke', 'rgba(138, 43, 226, 0.6)');
                        line.setAttribute('stroke-width', '1.5');
                    } else {
                        // Highlight other lines in the constellation less intensely
                        line.setAttribute('stroke', 'rgba(138, 43, 226, 0.3)');
                        line.setAttribute('stroke-width', '1');
                    }
                });
                
                // Add constellation name
                const constellationLabel = document.getElementById(`constellation-label-${constellation.name}`);
                if (constellationLabel) {
                    constellationLabel.setAttribute('opacity', '0.8');
                }
            });
            
            circle.addEventListener('mouseout', () => {
                // Hide star name
                text.setAttribute('opacity', '0');
                
                // Reset star size
                circle.setAttribute('r', star.size);
                
                // Reset other stars in constellation
                const constellationStars = document.querySelectorAll(`.constellation-star[data-constellation="${constellation.name}"]`);
                constellationStars.forEach(constellationStar => {
                    if (constellationStar !== circle) {
                        constellationStar.setAttribute('opacity', '0.7');
                    }
                });
                
                // Reset lines
                const lines = document.querySelectorAll(`.constellation-line[data-constellation="${constellation.name}"]`);
                lines.forEach(line => {
                    line.setAttribute('stroke', 'rgba(255, 255, 255, 0.15)');
                    line.setAttribute('stroke-width', '0.5');
                });
                
                // Hide constellation name
                const constellationLabel = document.getElementById(`constellation-label-${constellation.name}`);
                if (constellationLabel) {
                    constellationLabel.setAttribute('opacity', '0');
                }
            });
            
            constellationGroup.appendChild(text);
        });
        
        // Add constellation name in the center
        const centroid = getCentroid(constellation.stars);
        const constellationLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        constellationLabel.setAttribute('id', `constellation-label-${constellation.name}`);
        constellationLabel.setAttribute('x', centroid.x + '%');
        constellationLabel.setAttribute('y', centroid.y + '%');
        constellationLabel.setAttribute('fill', 'rgba(255, 255, 255, 0.8)');
        constellationLabel.setAttribute('font-size', '12');
        constellationLabel.setAttribute('text-anchor', 'middle');
        constellationLabel.setAttribute('opacity', '0');
        constellationLabel.textContent = constellation.name;
        constellationGroup.appendChild(constellationLabel);
        
        svg.appendChild(constellationGroup);
    });
    
    orion.appendChild(svg);
}

// Helper function to calculate the centroid of a constellation
function getCentroid(stars) {
    let sumX = 0;
    let sumY = 0;
    
    stars.forEach(star => {
        sumX += parseFloat(star.x);
        sumY += parseFloat(star.y);
    });
    
    return {
        x: sumX / stars.length,
        y: sumY / stars.length
    };
}

// Create a shooting star effect
function createShootingStar() {
    const starsContainer = document.querySelector('.stars-container');
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');
    
    // Random position and angle
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const angle = Math.random() * 60 - 30 + 215; // Base angle 215 degrees with some variation
    
    shootingStar.style.top = `${startY}%`;
    shootingStar.style.left = `${startX}%`;
    shootingStar.style.transform = `rotate(${angle}deg)`;
    
    // Random size
    const size = Math.random() * 100 + 50;
    shootingStar.style.width = `${size}px`;
    
    // Random duration
    const duration = Math.random() * 3 + 2;
    shootingStar.style.animation = `shooting ${duration}s linear`;
    
    starsContainer.appendChild(shootingStar);
    
    // Remove the shooting star after animation completes
    setTimeout(() => {
        shootingStar.remove();
    }, duration * 1000);
}

// Initialize scroll animations
function initScrollAnimations() {
    // Add scroll-animation class to elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.services-grid > *, .portfolio-grid > *, .about-content, .about-image, .contact-form, .contact-info');
    
    animatedElements.forEach(element => {
        element.classList.add('scroll-animation');
    });
    
    // Check for elements in viewport on scroll
    window.addEventListener('scroll', checkScrollAnimations);
    
    // Initial check
    checkScrollAnimations();
}

// Check which elements are in viewport and animate them
function checkScrollAnimations() {
    const scrollAnimations = document.querySelectorAll('.scroll-animation');
    
    scrollAnimations.forEach(animation => {
        const elementTop = animation.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            animation.classList.add('active');
        }
    });
}

// Initialize header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Create galaxy SVG elements
function createGalaxySVG() {
    const galaxySvg = document.querySelector('.galaxy-svg');
    if (!galaxySvg) return;
    
    const starsGroup = galaxySvg.querySelector('.stars');
    const spiralArmsGroup = galaxySvg.querySelector('.spiral-arms');
    
    // Create random stars
    for (let i = 0; i < 100; i++) {
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        
        // Random position
        const r = Math.random() * 120;
        const angle = Math.random() * Math.PI * 2;
        const x = 150 + r * Math.cos(angle);
        const y = 150 + r * Math.sin(angle);
        
        // Random size
        const size = Math.random() * 1.5 + 0.5;
        
        star.setAttribute('cx', x);
        star.setAttribute('cy', y);
        star.setAttribute('r', size);
        star.setAttribute('fill', 'white');
        star.setAttribute('opacity', Math.random() * 0.8 + 0.2);
        
        // Add animation delay
        star.style.setProperty('--i', i);
        
        starsGroup.appendChild(star);
    }
    
    // Create spiral arms
    for (let arm = 0; arm < 2; arm++) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        let d = 'M150,150 ';
        
        // Create spiral arm path
        for (let i = 0; i < 100; i++) {
            const angle = (i / 15) * Math.PI + (arm * Math.PI);
            const r = i * 0.7;
            const x = 150 + r * Math.cos(angle);
            const y = 150 + r * Math.sin(angle);
            
            d += `L${x},${y} `;
        }
        
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'url(#galaxy-gradient)');
        path.setAttribute('stroke-width', '5');
        path.setAttribute('stroke-opacity', '0.3');
        
        spiralArmsGroup.appendChild(path);
    }
}

// Add animation classes to dashboard elements
function addAnimationClasses() {
    // Add animation delay to dashboard elements
    const dashboardRects = document.querySelectorAll('.dashboard-elements rect');
    dashboardRects.forEach((rect, index) => {
        rect.style.setProperty('--i', index);
    });
    
    // Add animation delay to data points
    const dataPoints = document.querySelectorAll('.data-points circle');
    dataPoints.forEach((circle, index) => {
        circle.style.setProperty('--i', index);
    });
}

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate success after 1.5 seconds
            setTimeout(() => {
                alert(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you soon.`);
                contactForm.reset();
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // AI Diagnostic form handling
    const diagnosticForm = document.getElementById('diagnostic-form');
    
    if (diagnosticForm) {
        diagnosticForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const businessName = document.getElementById('business-name').value;
            const businessUrl = document.getElementById('business-url').value;
            const businessEmail = document.getElementById('business-email').value;
            const socialMedia = document.getElementById('social-media').value;
            const industry = document.getElementById('business-industry').value;
            
            // Simple validation
            if (!businessName || !businessUrl || !businessEmail || !industry) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Simulate form submission and AI processing
            const submitButton = diagnosticForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing Your Business...';
            submitButton.disabled = true;
            
            // Show processing animation
            showDiagnosticProcessing();
            
            // Simulate AI analysis (takes 3 seconds)
            setTimeout(() => {
                // Hide processing animation
                hideDiagnosticProcessing();
                
                // Show success message
                showDiagnosticSuccess(businessName);
                
                // Reset form
                diagnosticForm.reset();
                submitButton.textContent = 'Generate My Free Diagnostic';
                submitButton.disabled = false;
            }, 3000);
        });
    }
});

// Show diagnostic processing animation
function showDiagnosticProcessing() {
    // Create processing overlay if it doesn't exist
    if (!document.getElementById('diagnostic-processing')) {
        const processingOverlay = document.createElement('div');
        processingOverlay.id = 'diagnostic-processing';
        processingOverlay.className = 'diagnostic-processing';
        processingOverlay.innerHTML = `
            <div class="processing-content">
                <div class="processing-animation">
                    <div class="galaxy-spinner">
                        <div class="ring"></div>
                        <div class="ring"></div>
                        <div class="dot"></div>
                    </div>
                </div>
                <h3>AI Analysis in Progress</h3>
                <div class="processing-steps">
                    <div class="step active" id="step-1">
                        <i class="fas fa-check-circle"></i>
                        <span>Collecting data</span>
                    </div>
                    <div class="step" id="step-2">
                        <i class="fas fa-circle"></i>
                        <span>Analyzing website</span>
                    </div>
                    <div class="step" id="step-3">
                        <i class="fas fa-circle"></i>
                        <span>Evaluating social media</span>
                    </div>
                    <div class="step" id="step-4">
                        <i class="fas fa-circle"></i>
                        <span>Generating insights</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add to form card
        const formCard = document.querySelector('.form-card');
        formCard.appendChild(processingOverlay);
        
        // Animate steps
        setTimeout(() => {
            document.getElementById('step-1').classList.add('completed');
            document.getElementById('step-2').classList.add('active');
        }, 500);
        
        setTimeout(() => {
            document.getElementById('step-2').classList.add('completed');
            document.getElementById('step-3').classList.add('active');
        }, 1200);
        
        setTimeout(() => {
            document.getElementById('step-3').classList.add('completed');
            document.getElementById('step-4').classList.add('active');
        }, 2000);
        
        setTimeout(() => {
            document.getElementById('step-4').classList.add('completed');
        }, 2800);
    }
}

// Hide diagnostic processing animation
function hideDiagnosticProcessing() {
    const processingOverlay = document.getElementById('diagnostic-processing');
    if (processingOverlay) {
        processingOverlay.classList.add('fade-out');
        setTimeout(() => {
            processingOverlay.remove();
        }, 500);
    }
}

// Generate diagnostic results
function showDiagnosticSuccess(businessName) {
    // Create diagnostic results container if it doesn't exist
    if (!document.getElementById('diagnostic-results')) {
        // Hide the form card
        const formCard = document.querySelector('.form-card');
        formCard.style.display = 'none';
        
        // Create results container
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'diagnostic-results';
        resultsContainer.className = 'diagnostic-results';
        
        // Generate random scores for demonstration
        const websiteScore = Math.floor(Math.random() * 41) + 60; // 60-100
        const seoScore = Math.floor(Math.random() * 31) + 50; // 50-80
        const socialScore = Math.floor(Math.random() * 51) + 30; // 30-80
        const aiReadinessScore = Math.floor(Math.random() * 61) + 20; // 20-80
        const overallScore = Math.floor((websiteScore + seoScore + socialScore + aiReadinessScore) / 4);
        
        // Generate recommendations based on scores
        const recommendations = [];
        
        if (websiteScore < 80) {
            recommendations.push('Improve website loading speed and mobile responsiveness');
        }
        
        if (seoScore < 70) {
            recommendations.push('Enhance SEO with better keyword targeting and content strategy');
        }
        
        if (socialScore < 60) {
            recommendations.push('Increase social media engagement and posting frequency');
        }
        
        if (aiReadinessScore < 70) {
            recommendations.push('Implement basic AI automation for customer service and data analysis');
        }
        
        // Always add these recommendations
        recommendations.push('Integrate AI-powered analytics to better understand customer behavior');
        recommendations.push('Consider implementing a chatbot to improve customer engagement');
        
        // Generate HTML for results
        resultsContainer.innerHTML = `
            <div class="results-header">
                <h2>AI Business Diagnostic Results</h2>
                <p>Analysis for: <strong>${businessName}</strong></p>
            </div>
            
            <div class="results-overview">
                <div class="overall-score">
                    <div class="score-circle">
                        <svg viewBox="0 0 36 36" class="circular-chart">
                            <path class="circle-bg" d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"/>
                            <path class="circle" stroke-dasharray="${overallScore}, 100" d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"/>
                            <text x="18" y="20.35" class="percentage">${overallScore}%</text>
                        </svg>
                    </div>
                    <h3>Overall Score</h3>
                </div>
                
                <div class="score-details">
                    <div class="score-item">
                        <div class="score-bar">
                            <div class="bar-fill" style="width: ${websiteScore}%"></div>
                        </div>
                        <div class="score-info">
                            <span class="score-label">Website Performance</span>
                            <span class="score-value">${websiteScore}%</span>
                        </div>
                    </div>
                    
                    <div class="score-item">
                        <div class="score-bar">
                            <div class="bar-fill" style="width: ${seoScore}%"></div>
                        </div>
                        <div class="score-info">
                            <span class="score-label">SEO Optimization</span>
                            <span class="score-value">${seoScore}%</span>
                        </div>
                    </div>
                    
                    <div class="score-item">
                        <div class="score-bar">
                            <div class="bar-fill" style="width: ${socialScore}%"></div>
                        </div>
                        <div class="score-info">
                            <span class="score-label">Social Media Presence</span>
                            <span class="score-value">${socialScore}%</span>
                        </div>
                    </div>
                    
                    <div class="score-item">
                        <div class="score-bar">
                            <div class="bar-fill" style="width: ${aiReadinessScore}%"></div>
                        </div>
                        <div class="score-info">
                            <span class="score-label">AI Readiness</span>
                            <span class="score-value">${aiReadinessScore}%</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="results-recommendations">
                <h3>Recommended Actions</h3>
                <ul class="recommendations-list">
                    ${recommendations.map(rec => `<li><i class="fas fa-check-circle"></i> ${rec}</li>`).join('')}
                </ul>
            </div>
            
            <div class="results-opportunities">
                <h3>AI Opportunities for Your Business</h3>
                <div class="opportunities-grid">
                    <div class="opportunity-card">
                        <i class="fas fa-robot"></i>
                        <h4>Process Automation</h4>
                        <p>Automate repetitive tasks to save time and reduce errors</p>
                    </div>
                    <div class="opportunity-card">
                        <i class="fas fa-chart-pie"></i>
                        <h4>Data Analysis</h4>
                        <p>Gain insights from your business data with AI-powered analytics</p>
                    </div>
                    <div class="opportunity-card">
                        <i class="fas fa-comments"></i>
                        <h4>Customer Engagement</h4>
                        <p>Enhance customer experience with AI chatbots and personalization</p>
                    </div>
                </div>
            </div>
            
            <div class="results-actions">
                <button class="btn primary contact-us-btn">Contact Us for Implementation</button>
                <button class="btn secondary start-new-btn">Start New Analysis</button>
            </div>
        `;
        
        // Add to diagnostic form container
        const diagnosticFormContainer = document.querySelector('.diagnostic-form-container');
        diagnosticFormContainer.appendChild(resultsContainer);
        
        // Add event listeners for buttons
        const contactUsBtn = resultsContainer.querySelector('.contact-us-btn');
        contactUsBtn.addEventListener('click', () => {
            // Scroll to contact section
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
        
        const startNewBtn = resultsContainer.querySelector('.start-new-btn');
        startNewBtn.addEventListener('click', () => {
            // Hide results and show form again
            resultsContainer.remove();
            formCard.style.display = 'block';
        });
        
        // Add animation classes to elements for staggered entrance
        const animatedElements = [
            resultsContainer.querySelector('.results-header'),
            resultsContainer.querySelector('.overall-score'),
            resultsContainer.querySelector('.score-details'),
            resultsContainer.querySelector('.results-recommendations'),
            resultsContainer.querySelector('.results-opportunities'),
            resultsContainer.querySelector('.results-actions')
        ];
        
        animatedElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('fade-in');
            }, index * 200);
        });
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a, .cta-buttons a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link is an anchor link
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Create interactive background stars
function createInteractiveBackgroundStars() {
    const starsContainer = document.querySelector('.stars-container');
    
    // Create a canvas for the interactive stars
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; // Allow clicks to pass through
    canvas.style.zIndex = '1'; // Ensure it's above the background but below content
    canvas.id = 'interactive-stars';
    
    starsContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Create stars
    const stars = [];
    const starCount = 400; // More stars but smaller
    
    for (let i = 0; i < starCount; i++) {
        const size = Math.random() * 1.5 + 0.5; // Smaller stars
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: size,
            originalRadius: size,
            color: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`, // Less bright stars
            speed: Math.random() * 0.05,
            originalX: Math.random() * canvas.width,
            originalY: Math.random() * canvas.height,
            pulseSpeed: Math.random() * 0.05, // Slower pulse
            pulseDirection: Math.random() > 0.5 ? 1 : -1,
            maxPulse: Math.random() * 0.3 + 0.1, // Less pulsing
            // Add trail effect properties
            trail: [],
            maxTrail: Math.floor(Math.random() * 3) + 2, // Shorter trails
            // Add color variation
            hue: Math.random() > 0.9 ? Math.floor(Math.random() * 60) + 240 : 0 // Fewer colored stars
        });
    }
    
    // Store mouse position
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let mouseTimeout;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        // Reset timeout
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });
    
    // Animation function
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Add a subtle glow effect
        if (isMouseMoving) {
            const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
            gradient.addColorStop(0, 'rgba(138, 43, 226, 0.2)');
            gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        stars.forEach(star => {
            // Calculate distance from mouse
            const dx = mouseX - star.x;
            const dy = mouseY - star.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Pulse effect
            star.radius += star.pulseSpeed * star.pulseDirection;
            if (star.radius > star.originalRadius * (1 + star.maxPulse) || 
                star.radius < star.originalRadius * (1 - star.maxPulse)) {
                star.pulseDirection *= -1;
            }
            
            // Mouse interaction - stronger effect
            if (isMouseMoving && distance < 300) {
                // Calculate direction vector
                const angle = Math.atan2(dy, dx);
                
                // Move star towards mouse (stronger effect when closer)
                const strength = (300 - distance) / 300 * 8; // Increased strength
                
                // Store previous position for trail
                if (star.trail.length >= star.maxTrail) {
                    star.trail.shift();
                }
                star.trail.push({x: star.x, y: star.y, radius: star.radius});
                
                // Move star towards mouse
                star.x += Math.cos(angle) * strength;
                star.y += Math.sin(angle) * strength;
                
                // Increase size based on proximity
                star.radius = star.originalRadius * (1 + strength / 3);
                
                // Add color variation based on proximity
                if (star.hue) {
                    star.color = `hsla(${star.hue}, 100%, 70%, ${0.7 + strength/10})`;
                } else {
                    star.color = `rgba(255, 255, 255, ${0.7 + strength/10})`;
                }
            } else {
                // Gradually return to original position when mouse is far
                star.x += (star.originalX - star.x) * 0.01;
                star.y += (star.originalY - star.y) * 0.01;
                
                // Reset color
                if (star.hue) {
                    star.color = `hsla(${star.hue}, 100%, 70%, 0.7)`;
                } else {
                    star.color = `rgba(255, 255, 255, 0.7)`;
                }
                
                // Clear trail when returning
                if (star.trail.length > 0) {
                    star.trail.shift();
                }
            }
            
            // Draw trail
            if (star.trail.length > 0 && isMouseMoving) {
                for (let i = 0; i < star.trail.length; i++) {
                    const trailPos = star.trail[i];
                    const alpha = i / star.trail.length * 0.5;
                    
                    ctx.beginPath();
                    ctx.arc(trailPos.x, trailPos.y, trailPos.radius * 0.8, 0, Math.PI * 2);
                    
                    if (star.hue) {
                        ctx.fillStyle = `hsla(${star.hue}, 100%, 70%, ${alpha})`;
                    } else {
                        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                    }
                    
                    ctx.fill();
                }
            }
            
            // Draw the star
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.fill();
            
            // Add glow effect - more subtle
            if (isMouseMoving && distance < 300) {
                const glowSize = star.radius * 1.5; // Smaller glow
                const gradient = ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, glowSize
                );
                
                if (star.hue) {
                    gradient.addColorStop(0, `hsla(${star.hue}, 100%, 70%, 0.5)`);
                    gradient.addColorStop(1, `hsla(${star.hue}, 100%, 70%, 0)`);
                } else {
                    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                }
                
                ctx.beginPath();
                ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Reposition stars
        stars.forEach(star => {
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
            star.originalX = star.x;
            star.originalY = star.y;
            star.trail = [];
        });
    });
    
    // Start animation
    animate();
    
    // Return stars array for mouse interaction
    return stars;
}

// Handle mouse movement for star interaction
function handleMouseMove(e) {
    // Get all constellation stars
    const stars = document.querySelectorAll('.constellation-star');
    
    // Get mouse position
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Add a visual cursor effect
    addCursorEffect(mouseX, mouseY);
    
    // Interactive effect for constellation stars
    stars.forEach(star => {
        const starX = parseFloat(star.getAttribute('cx')) / 100 * window.innerWidth;
        const starY = parseFloat(star.getAttribute('cy')) / 100 * window.innerHeight;
        
        const distance = Math.sqrt(Math.pow(mouseX - starX, 2) + Math.pow(mouseY - starY, 2));
        
        // If mouse is close to star - increased interaction distance
        if (distance < 200) { // Increased from 100 to 200
            const scale = 1 + (200 - distance) / 100 * 2; // Exaggerated scale effect
            const currentRadius = parseFloat(star.getAttribute('r'));
            const originalRadius = parseFloat(star.dataset.originalRadius || currentRadius);
            
            // Store original radius if not already stored
            if (!star.dataset.originalRadius) {
                star.dataset.originalRadius = currentRadius;
            }
            
            // Scale the star based on mouse proximity
            star.setAttribute('r', originalRadius * scale);
            
            // Add glow effect
            const starName = star.dataset.name;
            const filter = document.getElementById(`glow-${starName}`);
            if (filter) {
                const blur = filter.querySelector('feGaussianBlur');
                if (blur) {
                    blur.setAttribute('stdDeviation', 2 + (200 - distance) / 10); // Stronger glow
                }
            }
            
            // Make the star label visible
            const labels = document.querySelectorAll('.star-label');
            labels.forEach(label => {
                if (label.textContent === starName) {
                    label.setAttribute('opacity', '1');
                    label.setAttribute('font-size', '12'); // Larger font
                }
            });
            
            // Highlight connected lines
            const lines = document.querySelectorAll('.constellation-line');
            lines.forEach(line => {
                if ((line.getAttribute('x1') === star.getAttribute('cx') && line.getAttribute('y1') === star.getAttribute('cy')) ||
                    (line.getAttribute('x2') === star.getAttribute('cx') && line.getAttribute('y2') === star.getAttribute('cy'))) {
                    line.setAttribute('stroke', 'rgba(138, 43, 226, 0.8)');
                    line.setAttribute('stroke-width', '3'); // Thicker line
                    line.setAttribute('stroke-dasharray', '2,2'); // Different dash pattern
                }
            });
        } else {
            // Reset to original size if stored
            if (star.dataset.originalRadius) {
                star.setAttribute('r', star.dataset.originalRadius);
                
                // Reset glow
                const starName = star.dataset.name;
                const filter = document.getElementById(`glow-${starName}`);
                if (filter) {
                    const blur = filter.querySelector('feGaussianBlur');
                    if (blur) {
                        blur.setAttribute('stdDeviation', '2');
                    }
                }
                
                // Hide the star label
                const labels = document.querySelectorAll('.star-label');
                labels.forEach(label => {
                    if (label.textContent === starName) {
                        label.setAttribute('opacity', '0');
                        label.setAttribute('font-size', '10');
                    }
                });
            }
        }
    });
}

// Add a visual cursor effect
function addCursorEffect(x, y) {
    // Check if cursor effect already exists
    let cursorEffect = document.getElementById('cursor-effect');
    
    // Create if it doesn't exist
    if (!cursorEffect) {
        cursorEffect = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        cursorEffect.setAttribute('id', 'cursor-effect');
        cursorEffect.setAttribute('fill', 'none');
        cursorEffect.setAttribute('stroke', 'rgba(138, 43, 226, 0.6)');
        cursorEffect.setAttribute('stroke-width', '2');
        cursorEffect.setAttribute('r', '0');
        cursorEffect.setAttribute('cx', x);
        cursorEffect.setAttribute('cy', y);
        
        // Add animation
        const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate.setAttribute('attributeName', 'r');
        animate.setAttribute('from', '0');
        animate.setAttribute('to', '50');
        animate.setAttribute('dur', '1s');
        animate.setAttribute('repeatCount', 'indefinite');
        
        const animateOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateOpacity.setAttribute('attributeName', 'stroke-opacity');
        animateOpacity.setAttribute('from', '0.6');
        animateOpacity.setAttribute('to', '0');
        animateOpacity.setAttribute('dur', '1s');
        animateOpacity.setAttribute('repeatCount', 'indefinite');
        
        cursorEffect.appendChild(animate);
        cursorEffect.appendChild(animateOpacity);
        
        // Add to the SVG
        const svg = document.querySelector('.orion-svg');
        if (svg) {
            svg.appendChild(cursorEffect);
        }
    }
    
    // Update position
    cursorEffect.setAttribute('cx', x);
    cursorEffect.setAttribute('cy', y);
}
