
// NAVBAR SCROLL
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// SMOOTH SCROLL
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ACTIVE LINK
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#00d9ff';
    }
  });
});

// INTERSECTION OBSERVER FOR ANIMATIONS
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// ANIMATE SECTIONS
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'all 0.8s ease-out';
  observer.observe(section);
});

// ANIMATE SKILLS
document.querySelectorAll('.skill').forEach((skill, index) => {
  skill.style.opacity = '0';
  skill.style.transform = 'translateY(20px)';
  skill.style.transition = `all 0.5s ease-out ${index * 0.05}s`;
  observer.observe(skill);
});

// ANIMATE PROJECTS
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
  observer.observe(card);
});

// ANIMATE EDUCATION
document.querySelectorAll('#education li').forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-30px)';
  item.style.transition = `all 0.6s ease-out ${index * 0.15}s`;
  observer.observe(item);
});

// FORM SUBMISSION
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputs = form.querySelectorAll('input[required], textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = '#ff4d6d';
      } else {
        input.style.borderColor = '';
      }
    });
    
    if (isValid) {
      showNotification('Message envoyé avec succès! ✓', 'success');
      form.reset();
    } else {
      showNotification('Veuillez remplir tous les champs requis', 'error');
    }
  });
}

// NOTIFICATION
function showNotification(message, type) {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// NOTIFICATION STYLES
const style = document.createElement('style');
style.textContent = `
  .notification {
    position: fixed;
    top: 100px;
    right: -300px;
    padding: 1.2rem 2rem;
    background: #00d9ff;
    color: #0d1117;
    font-weight: 600;
    font-size: 0.9rem;
    z-index: 10000;
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease-out;
  }
  
  .notification.show {
    right: 20px;
  }
  
  .notification.error {
    background: #ff4d6d;
    color: white;
  }
`;
document.head.appendChild(style);

// CURSOR EFFECT (optional)
if (window.innerWidth > 1024) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    border: 2px solid #00d9ff;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s;
    opacity: 0.5;
  `;
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 5 + 'px';
    cursor.style.top = e.clientY - 5 + 'px';
  });
  
  document.querySelectorAll('a, button, .skill, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '30px';
      cursor.style.height = '30px';
      cursor.style.left = parseInt(cursor.style.left) - 10 + 'px';
      cursor.style.top = parseInt(cursor.style.top) - 10 + 'px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
    });
  });
}

// CONSOLE
console.log('%c🚀 Chaimaa Portfolio', 'color: #00d9ff; font-size: 24px; font-weight: bold;');
console.log('%cDesign by Chaimaa Benradouan', 'color: #00ffaa; font-size: 12px;');
