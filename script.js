// Wait until the page is fully loaded before running any code
document.addEventListener("DOMContentLoaded", () => {

  // Welcome message 
  const welcomeMessageEl = document.getElementById("welcome-message");
  if (welcomeMessageEl) {
    // Function to update the welcome message with current date and time
    function updateWelcomeMessage() {
      const now = new Date();
      welcomeMessageEl.textContent = `Welcome to California! Today is ${now.toDateString()}, ${now.toLocaleTimeString()}`;
    }
    // Call it immediately and then update every second
    setInterval(updateWelcomeMessage, 1000);
    updateWelcomeMessage();
  }

  // Hero section background rotation 
 // Hero section background rotation 
const hero = document.querySelector(".hero");
if (hero) {
  const heroImages = ["hero1.jpg", "pic.png", "hero3.jpg"]; // Background images
  let heroIndex = 0; // Start with first image

  // Function to update hero background
  function updateHeroBackground() {
    hero.style.background = `
      linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
      url('${heroImages[heroIndex]}') center/cover no-repeat
    `;
  }

  updateHeroBackground(); // Show initial background

  // Automatic hero background change every 7 seconds
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    updateHeroBackground();
  }, 7000); // 7000ms = 7 seconds

  // Next / Previous buttons for hero images
  const heroNext = document.querySelector(".hero-next");
  const heroPrev = document.querySelector(".hero-prev");

  if (heroNext && heroPrev) {
    heroNext.addEventListener("click", () => {
      heroIndex = (heroIndex + 1) % heroImages.length;
      updateHeroBackground();
    });
    heroPrev.addEventListener("click", () => {
      heroIndex = (heroIndex - 1 + heroImages.length) % heroImages.length;
      updateHeroBackground();
    });
  }
}

  // Color change button 
  const colorBtn = document.getElementById("colorBtn");
  if (colorBtn) {
    // When clicked, change page background to a random color
    colorBtn.addEventListener("click", () => {
      const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      document.body.style.backgroundColor = randomColor;
    });
  }

  // History, attractions, and fun facts
  const historyEl = document.getElementById("history");
  const attractionsEl = document.getElementById("attractions");
  const funFactBox = document.getElementById("funFact");
  const toggleBtn = document.getElementById("toggleBtn");

  if(historyEl && attractionsEl && funFactBox && toggleBtn) {
    // Some content for history and attractions
    const destination = {
      history: `
        <p>California's history is rich and diverse, shaped by Native American civilizations, Spanish colonization, and the Gold Rush era. The state has grown into a cultural melting pot where traditions, music, and art reflect a wide variety of influences.</p>
        <p class="extra">The arts scene is vibrant, with world-renowned museums, theaters, and festivals celebrating creativity. Cultural diversity is seen in food, languages, and annual events, offering visitors an authentic and immersive experience.</p>
        <blockquote class="extra">Did you know? California is home to more than 200 museums dedicated to art, history, and science.</blockquote>
      `,
      attractions: `
        <p>From the Golden Gate Bridge to Disneyland, California offers attractions for all tastes. Nature lovers can explore Yosemite National Park, Joshua Tree, or the coastal beauty of Big Sur. Each location offers unique experiences and breathtaking views.</p>
        <p>City attractions are equally impressive, with vibrant nightlife, shopping districts, and historical landmarks. Visitors can enjoy scenic drives, cultural tours, and a mix of entertainment options across the state.</p>
        <blockquote>Fun fact: California's coastline stretches over 840 miles, offering endless beaches and scenic ocean views.</blockquote>
      `
    };

    // Fun facts array to show random fact
    const funFacts = [
      "California produces over 90% of the United States' wine.",
      "The Hollywood Sign originally read 'Hollywoodland'.",
      "Death Valley is the hottest place on Earth, recorded at 134°F.",
      "California has the largest economy of any U.S. state.",
      "Lake Tahoe is the largest alpine lake in North America."
    ];

    // Add content to page
    historyEl.innerHTML = destination.history;
    attractionsEl.innerHTML = destination.attractions;

    // Show one random fun fact
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    funFactBox.textContent = funFacts[randomIndex];
    funFactBox.style.display = "block";

    // Extra paragraphs are hidden initially
    const extras = document.querySelectorAll(".extra");
    extras.forEach(el => el.style.display = "none");

    // Show More / Show Less toggle
    toggleBtn.addEventListener("click", () => {
      extras.forEach(el => {
        el.style.display = (el.style.display === "none") ? "block" : "none";
      });
      toggleBtn.textContent = toggleBtn.textContent === "Show More" ? "Show Less" : "Show More";
    });
  }

  //  Gallery
  const galleryContainer = document.getElementById("gallery");
  if(galleryContainer) {
    const galleryImages = [
      {src: "fransisco.jpg", caption: "Golden Gate Bridge, San Francisco", category: "city"},
      {src: "c1.jpg", caption: "Gallfonia city", category: "city"},
      {src: "c2.jpg", caption: "Gallfonia city", category: "city"},
      {src: "c3.webp", caption: "Gallfonia city", category: "city"},
      {src: "pic.png", caption: "Yosemite National Park", category: "mountain"},
      {src: "m1.jpg", caption: "Yosemite National Park", category: "mountain"},
      {src: "m2.jpg", caption: "Yosemite National Park", category: "mountain"},
      {src: "hollywood.jpg", caption: "Hollywood Sign, Los Angeles", category: "city"},
      {src: "hh.jpg", caption: "Santa Monica Beach", category: "beach"},
      {src: "b1.jpg", caption: "Santa Monica Beach", category: "beach"},
      {src: "b2.jpg", caption: "Santa Monica Beach", category: "beach"},
      {src: "Rad.jpeg", caption: "Napa Valley Vineyards", category: "mountain"}
    ];

    // Function to display gallery images (filtered by category)
    function displayImages(filter = "all") {
      galleryContainer.innerHTML = ""; // Clear current images
      galleryImages.forEach(img => {
        if(filter === "all" || img.category === filter) {
          const div = document.createElement("div");
          div.className = "gallery-item";
          div.innerHTML = `
            <img src="${img.src}" alt="${img.caption}" onclick="openLightbox('${img.src}')">
            <div class="caption">${img.caption}</div>
          `;
          galleryContainer.appendChild(div);
        }
      });
    }

    displayImages(); // Show all images initially

    // Set up filter buttons
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category");
        displayImages(category);
      });
    });

    // Lightbox open/close functions
    window.openLightbox = function(src) {
      document.getElementById("lightbox-img").src = src;
      document.getElementById("lightbox").style.display = "flex";
    }

    window.closeLightbox = function() {
      document.getElementById("lightbox").style.display = "none";
    }
  }

  // Weather
  const weatherEl = document.getElementById("weather");
  if(weatherEl) {
    const apiKey = "701ac9a86d3d412bb32155940252709"; 
    const citySelect = document.getElementById("citySelect");

    // Fetch weather from API
    async function getWeather(city = "Los Angeles") {
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
      try {
        const response = await fetch(url);
        const data = await response.json();

        if(data.error){
          weatherEl.innerHTML = `<p style="color:red;">Error: ${data.error.message}</p>`;
          return;
        }
        displayWeather(data);
      } catch(error) {
        weatherEl.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        console.error(error);
      }
    }

    // Display weather info
    function displayWeather(data) {
      weatherEl.innerHTML = `
        <div class="weather-card">
          <img src="${data.current.condition.icon.startsWith('//') ? 'https:' + data.current.condition.icon : data.current.condition.icon}" alt="${data.current.condition.text}">
          <div>
            <p><strong>City:</strong> ${data.location.name}</p>
            <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
            <p><strong>Condition:</strong> ${data.current.condition.text}</p>
            <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            <p><strong>Wind:</strong> ${data.current.wind_kph} km/h</p>
            <p><strong>Local Time:</strong> ${data.location.localtime}</p>
          </div>
        </div>
      `;
    }

    // Load initial weather and update when city changes
    if(citySelect){
      getWeather(citySelect.value); 
      citySelect.addEventListener("change", (e) => {
        getWeather(e.target.value);
      });
    }
  }

});

// Responsive Menu Toggle
const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


