document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
  });
});
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





