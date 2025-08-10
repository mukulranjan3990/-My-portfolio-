// document.querySelectorAll(".main-nav a").forEach((link) => {
//   link.addEventListener("click", function (e) {
//     e.preventDefault();
//     const targetId = this.getAttribute("href");
//     document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
//   });
// });
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.querySelector('input[name="name"]').value.trim();
    const email = this.querySelector('input[name="email"]').value.trim();
    const mobile = this.querySelector('input[name="mobile"]').value.trim();
    const message = this.querySelector('textarea[name="message"]').value.trim();

    const nameRegex = /^[A-Za-z\s]+$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const mobileRegex = /^[6-9]\d{9}$/;

    if (!nameRegex.test(name)) {
      alert("Please enter a valid name (letters and spaces only).");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!mobileRegex.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (message.length === 0) {
      alert("Please enter your message.");
      return;
    }

    alert("Sorry, there was a problem sending your message.");
  });

const slides = document.querySelectorAll(".slide");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); // Reset animation when not visible
      }
    });
  },
  {
    threshold: 0.2,
  }
);

slides.forEach((slide) => {
  observer.observe(slide);
});






function createSkillElement(skillName, subjKnowledgeText, skillsText, experienceText) {
  const skillstyle = document.createElement("div");
  skillstyle.classList.add("skillstyle");

  // Skill name
  const skillname = document.createElement("h3");
  skillname.textContent = skillName;
  skillname.style.textAlign = "center";
  skillname.style.color = "rgb(169, 222, 12)";
  skillname.classList.add("htag");
  skillstyle.appendChild(skillname);

  // Helper to create a bar
  function createBar(label, percent) {
    const container = document.createElement("div");
    container.style.margin = "8px 0";

    const labelEl = document.createElement("span");
    labelEl.textContent = label + ": ";
    labelEl.classList.add("htag");

    const bar = document.createElement("div");
    bar.classList.add("skillpercent");

    const marker = document.createElement("div");
    marker.classList.add("marker");
    marker.style.width = percent;
    marker.style.fontWeight = "bold";
    marker.textContent = percent;

    bar.appendChild(marker);
    container.appendChild(labelEl);
    container.appendChild(bar);
    return container;
  }
  const button= document.createElement("button");
  button.classList.add("show-projects");
  const buttonText = document.createElement("span");
  buttonText.classList.add("button-text");
  buttonText.textContent = "View Works";
  button.appendChild(buttonText);

  skillstyle.appendChild(createBar("Subject Knowledge", subjKnowledgeText));
  skillstyle.appendChild(createBar("Skills", skillsText));
  skillstyle.appendChild(createBar("Experience", experienceText));
  skillstyle.appendChild(button);

  return skillstyle;
}






const skillsContainer = document.getElementById("skills-container");





const skillData = {
  javascript: ["JavaScript", "80%", "89%", "86%"],
  typescript: ["TypeScript", "70%", "65%", "60%"],
  nodejs: ["Node.js", "75%", "70%", "65%"],
  nextjs: ["Next.js", "70%", "65%", "60%"],
  reactjs: ["React.js", "80%", "85%", "82%"],
  python: ["Python", "65%", "60%", "55%"],
  cpp: ["C++", "88%", "90%", "87%"],
  c: ["C", "70%", "65%", "60%"],
  java: ["Java ", "75%", "70%", "65%"],
  mongodb: ["MongoDB", "60%", "65%", "60%"],
  mysql: ["MySQL", "15%", "10%", "5%"],
  html: ["HTML", "85%", "89%", "85%"],
  css: ["CSS", "80%", "90%", "85%"],
  tailwindcss: ["Tailwind CSS", "0%", "0%", "0%"],
  bootstrap: ["Bootstrap", "75%", "70%", "65%"],
  git: ["Git", "80%", "89%", "84%"],
  github: ["GitHub", "82%", "87%", "85%"]
};


skillsContainer.appendChild(
    createSkillElement("HTML", "85%", "89%", "85%")
);

Object.keys(skillData).forEach((skillId) => {
  const skillEl = document.getElementById(skillId);
 
  if (skillEl) {
    skillEl.addEventListener("click", function () {
      // Remove previous skill element if exists
      const prevSkill = skillsContainer.querySelector(".skillstyle");
      if (prevSkill) {
        skillsContainer.removeChild(prevSkill);
      }
      // Append new skill element
      const [name, subj, skill, experience] = skillData[skillId];
      skillsContainer.appendChild(createSkillElement(name, subj, skill, experience));
    });
  }
});


// feed back page show dynamic on the home page

// write the code for that feedback is stored on the localstorage so you get that feedback from that and 
// for your knowledge you learn from the app.js how it stored on that and then you write the code to display 
// that feed back on the page index.html as this script.js is linked with that okay

// Get feedback from localStorage
let existingFeedbacks = JSON.parse(localStorage.getItem('portfolioFeedbacks') || '[]');
// Display feedbacks dynamically on the homepage with ratings and details
const feedbackContainer = document.getElementById("feedback-list");

// Helper to escape HTML
function escapeHtml(text) {
  if (!text) return "";
  return text.replace(/[&<>"']/g, function (m) {
    return (
      {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[m] || m
    );
  });
}

// Helper to capitalize first letter
function capitalizeFirst(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

// Create feedback HTML
function createFeedbackHTML(feedback, index) {
  const overallRating = feedback.overallRating || feedback.rating || 0;
  const isHighRated = overallRating >= 4;
  const stars =
    "★".repeat(Math.floor(overallRating)) +
    "☆".repeat(5 - Math.floor(overallRating));

  // Service qualities display with circular progress
  const serviceQualitiesHTML = feedback.serviceRatings
    ? `<div class="service-qualities-display">
        ${Object.entries(feedback.serviceRatings)
          .map(
            ([service, rating]) => `
          <div class="service-quality-item">
            <div class="service-quality-circle" data-service="${service}">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="30" stroke="#e5e7eb" stroke-width="8" fill="none"/>
                <circle cx="40" cy="40" r="30" stroke="#10b981" stroke-width="8" fill="none" 
                        style="stroke-linecap: round; transition: stroke-dashoffset 0.5s ease-in-out; transform: rotate(-90deg); transform-origin: 40px 40px;"/>
              </svg>
              <div class="service-quality-value">${rating.toFixed(1)}</div>
            </div>
            <div class="service-quality-label">${capitalizeFirst(service)}</div>
          </div>`
          )
          .join("")}
       </div>`
    : "";

  const contentSections = [];
  if (feedback.liked) {
    contentSections.push(`
      <div class="feedback-section">
        <div class="feedback-section-title">What they liked:</div>
        <div>${escapeHtml(feedback.liked)}</div>
      </div>
    `);
  }
  if (feedback.improvements) {
    contentSections.push(`
      <div class="feedback-section">
        <div class="feedback-section-title">Areas for improvement:</div>
        <div>${escapeHtml(feedback.improvements)}</div>
      </div>
    `);
  }
  if (feedback.comments) {
    contentSections.push(`
      <div class="feedback-section">
        <div class="feedback-section-title">Additional comments:</div>
        <div>${escapeHtml(feedback.comments)}</div>
      </div>
    `);
  }

  return `
    <div class="feedback-item ${isHighRated ? "high-rated" : ""}" id="feedback-${index}">
      <div class="feedback-header">
        <div class="feedback-author">${escapeHtml(feedback.name)}</div>
        <div class="feedback-rating">
          <span class="feedback-stars">${stars}</span>
          <span>${overallRating.toFixed(1)}</span>
        </div>
      </div>
      <div class="feedback-recommend">
        <span class="recommend-badge ${feedback.recommend}">
          ${
            feedback.recommend === "yes"
              ? "Would recommend"
              : feedback.recommend === "maybe"
              ? "Might recommend"
              : "Would not recommend"
          }
        </span>
      </div>
      ${serviceQualitiesHTML}
      <div class="feedback-content">
        ${contentSections.join("")}
      </div>
    </div>
  `;
}

// Initialize circular progress for displayed feedbacks
function initializeFeedbackProgress(feedbacks) {
  feedbacks.forEach((feedback, index) => {
    if (feedback.serviceRatings) {
      Object.entries(feedback.serviceRatings).forEach(([service, rating]) => {
        const progressElement = document.querySelector(
          `#feedback-${index} [data-service="${service}"] circle:last-child`
        );
        if (progressElement && rating > 0) {
          const circumference = 2 * Math.PI * 30; // r = 30
          const percentage = (rating / 5) * 100;
          const offset = circumference - (percentage / 100) * circumference;

          progressElement.style.strokeDasharray = `${circumference} ${circumference}`;
          progressElement.style.strokeDashoffset = circumference;

          setTimeout(() => {
            progressElement.style.strokeDashoffset = offset;
          }, 100 * Object.keys(feedback.serviceRatings).indexOf(service));
        }
      });
    }
  });
}

// Render feedbacks sorted by rating and timestamp
function renderFeedbacks(feedbacks) {
  feedbackContainer.innerHTML = ""; // Clear previous feedbacks
  if (!feedbacks.length) {
    feedbackContainer.innerHTML =
      '<div class="no-feedback">No feedback submitted yet.</div>';
    return;
  }
  // Sort by overall rating (highest first), then by timestamp (newest first)
  feedbacks.sort((a, b) => {
    const ratingA = a.overallRating || a.rating || 0;
    const ratingB = b.overallRating || b.rating || 0;
    if (ratingB !== ratingA) {
      return ratingB - ratingA;
    }
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
  feedbackContainer.innerHTML = feedbacks
    .map((fb, idx) => createFeedbackHTML(fb, idx))
    .join("");
  initializeFeedbackProgress(feedbacks);
}

renderFeedbacks(existingFeedbacks);






