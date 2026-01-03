// ===================================
// PARTICLE ANIMATION
// ===================================
const canvas = document.getElementById("particles")
const ctx = canvas.getContext("2d")

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
resizeCanvas()
window.addEventListener("resize", resizeCanvas)

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 2 + 1
    this.speedX = Math.random() * 1 - 0.5
    this.speedY = Math.random() * 1 - 0.5
    this.opacity = Math.random() * 0.5 + 0.2
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    // Wrap around screen
    if (this.x > canvas.width) this.x = 0
    if (this.x < 0) this.x = canvas.width
    if (this.y > canvas.height) this.y = 0
    if (this.y < 0) this.y = canvas.height
  }

  draw() {
    ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

// Create particles
const particlesArray = []
const particleCount = 100

for (let i = 0; i < particleCount; i++) {
  particlesArray.push(new Particle())
}

// Animation loop
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update()
    particlesArray[i].draw()

    // Draw lines between nearby particles
    for (let j = i + 1; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x
      const dy = particlesArray[i].y - particlesArray[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 150) {
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 150)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
        ctx.stroke()
      }
    }
  }

  requestAnimationFrame(animateParticles)
}

animateParticles()

// ===================================
// SMOOTH SCROLL
// ===================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for scroll animations
document.querySelectorAll(".pixel-card, .cert-card, .timeline-item").forEach((el) => {
  observer.observe(el)
})

// ===================================
// NAVBAR BACKGROUND ON SCROLL
// ===================================
let lastScroll = 0
const nav = document.querySelector(".nav")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    nav.style.background = "rgba(10, 14, 39, 0.95)"
    nav.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.3)"
  } else {
    nav.style.background = "rgba(10, 14, 39, 0.8)"
    nav.style.boxShadow = "none"
  }

  lastScroll = currentScroll
})

// ===================================
// RETRO GAME SOUND EFFECTS (Visual only)
// ===================================
document.querySelectorAll(".pixel-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.animationPlayState = "paused"
  })

  card.addEventListener("mouseleave", () => {
    card.style.animationPlayState = "running"
  })
})

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log("%c👋 Hey there!", "font-size: 20px; font-weight: bold; color: #00d4ff;")
console.log(
  "%cLooking for a Product Support & Development Leader who delivers measurable impact?",
  "font-size: 14px; color: #ff3366;",
)
console.log("%cLet's talk: iwinosa.ozigbo04@gmail.com", "font-size: 14px; color: #ffd700;")
