class FeedbackForm {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 3;
    this.formData = {};
    this.serviceRatings = {
      Communication: 0,
       Quality: 0,
       Professionalism: 0,
       Creativity: 0,
       Timeliness: 0
    };
    
    this.initializeElements();
    this.bindEvents();
    this.loadFeedbacks();
    this.updateNavigationButtons();
    this.initializeServiceRatings();
  }

  initializeElements() {
    this.form = document.getElementById('feedbackForm');
    this.backBtn = document.getElementById('backBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.submitBtn = document.getElementById('submitBtn');
    this.successMessage = document.getElementById('successMessage');
    this.newFeedbackBtn = document.getElementById('newFeedbackBtn');
    this.feedbackList = document.getElementById('feedbackList');
    
    // Step indicators
    this.stepIndicators = document.querySelectorAll('.step-indicator');
    this.formSteps = document.querySelectorAll('.form-step');
    
    // Star rating
    this.stars = document.querySelectorAll('.star');
    this.ratingInput = document.getElementById('rating');
    
    // Service sliders
    this.serviceSliders = document.querySelectorAll('.service-slider');
  }

  bindEvents() {
    // Navigation buttons
    this.backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.goToStep(this.currentStep - 1);
    });
    
    this.nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleNext();
    });
    
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleSubmit(e);
    });
    
    this.newFeedbackBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.resetForm();
    });

    // Step indicator navigation
    this.stepIndicators.forEach((indicator, index) => {
      indicator.addEventListener('click', (e) => {
        e.preventDefault();
        const stepNumber = index + 1;
        if (stepNumber <= this.currentStep) {
          this.goToStep(stepNumber);
        }
      });
    });

    // Star rating
    this.stars.forEach(star => {
      star.addEventListener('click', (e) => {
        e.preventDefault();
        this.setRating(e);
      });
      star.addEventListener('mouseover', (e) => this.highlightStars(e));
    });

    const starRating = document.querySelector('.star-rating');
    if (starRating) {
      starRating.addEventListener('mouseleave', () => {
        this.resetStarHighlight();
      });
    }

    // Service sliders
    this.serviceSliders.forEach(slider => {
      slider.addEventListener('input', (e) => {
        this.updateServiceRating(e);
      });
    });

    // Prevent form submission on Enter key
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  initializeServiceRatings() {
    // Initialize all circular progress bars
    this.serviceSliders.forEach(slider => {
      const service = slider.dataset.service;
      const progressElement = document.querySelector(`[data-service="${service}"] .progress-ring__circle`);
      const valueElement = document.querySelector(`[data-service="${service}"] .progress-value`);
      const sliderValueElement = slider.parentNode.querySelector('.slider-value');
      
      if (progressElement) {
        const circumference = 2 * Math.PI * 34; // r = 34
        progressElement.style.strokeDasharray = `${circumference} ${circumference}`;
        progressElement.style.strokeDashoffset = circumference;
      }
      
      if (valueElement) {
        valueElement.textContent = '0.0';
      }
      
      if (sliderValueElement) {
        sliderValueElement.textContent = '0.0 / 5.0';
      }
    });
  }

  updateServiceRating(e) {
    const slider = e.target;
    const service = slider.dataset.service;
    const value = parseFloat(slider.value);
    
    // Update internal rating
    this.serviceRatings[service] = value;
    
    // Update circular progress
    this.updateCircularProgress(service, value);
    
    // Update slider value display
    const sliderValueElement = slider.parentNode.querySelector('.slider-value');
    if (sliderValueElement) {
      sliderValueElement.textContent = `${value.toFixed(1)} / 5.0`;
    }
  }

  updateCircularProgress(service, value) {
    const progressElement = document.querySelector(`[data-service="${service}"] .progress-ring__circle`);
    const valueElement = document.querySelector(`[data-service="${service}"] .progress-value`);
    
    if (progressElement && valueElement) {
      const circumference = 2 * Math.PI * 34; // r = 34
      const percentage = (value / 5) * 100;
      const offset = circumference - (percentage / 100) * circumference;
      
      progressElement.style.strokeDashoffset = offset;
      valueElement.textContent = value.toFixed(1);
    }
  }

  goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > this.totalSteps) return;

    // Remove active class from all steps
    this.formSteps.forEach(step => step.classList.remove('active'));
    this.stepIndicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active class to current step
    this.currentStep = stepNumber;
    this.formSteps[this.currentStep - 1].classList.add('active');
    this.stepIndicators[this.currentStep - 1].classList.add('active');

    // Update navigation buttons
    this.updateNavigationButtons();
    
    // Clear any existing error messages
    this.clearErrorMessages();
  }

  updateNavigationButtons() {
    // Back button
    if (this.currentStep === 1) {
      this.backBtn.style.display = 'none';
    } else {
      this.backBtn.style.display = 'inline-flex';
    }

    // Next/Submit buttons
    if (this.currentStep === this.totalSteps) {
      this.nextBtn.style.display = 'none';
      this.submitBtn.style.display = 'inline-flex';
    } else {
      this.nextBtn.style.display = 'inline-flex';
      this.submitBtn.style.display = 'none';
    }
  }

  handleNext() {
    if (this.validateCurrentStep()) {
      this.collectCurrentStepData();
      this.goToStep(this.currentStep + 1);
    }
  }

  validateCurrentStep() {
    const currentStepElement = this.formSteps[this.currentStep - 1];
    let isValid = true;
    let errorMessage = '';

    // Clear previous error states
    this.clearErrorMessages();
    currentStepElement.querySelectorAll('.form-control').forEach(input => {
      input.classList.remove('error');
    });

    switch (this.currentStep) {
      case 1:
        // Validate name and email
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        
        if (!name.value.trim()) {
          name.classList.add('error');
          errorMessage = 'Please enter your name';
          isValid = false;
        }
        
        if (!email.value.trim()) {
          email.classList.add('error');
          errorMessage = 'Please enter your email';
          isValid = false;
        } else if (!this.isValidEmail(email.value)) {
          email.classList.add('error');
          errorMessage = 'Please enter a valid email address';
          isValid = false;
        }
        break;

      case 2:
        // Validate rating
        if (!this.ratingInput.value) {
          errorMessage = 'Please select an overall rating';
          isValid = false;
        }
        
        // Validate recommendation
        const recommendInputs = document.querySelectorAll('input[name="recommend"]');
        const recommendSelected = Array.from(recommendInputs).some(input => input.checked);
        
        if (!recommendSelected) {
          errorMessage = 'Please select if you would recommend us';
          isValid = false;
        }
        break;

      case 3:
        // Step 3 has no required fields
        isValid = true;
        break;
    }

    if (!isValid && errorMessage) {
      this.showError(errorMessage);
    }

    return isValid;
  }

  collectCurrentStepData() {
    switch (this.currentStep) {
      case 1:
        this.formData.name = document.getElementById('name').value.trim();
        this.formData.email = document.getElementById('email').value.trim();
        break;

      case 2:
        this.formData.rating = parseInt(this.ratingInput.value);
        this.formData.serviceRatings = { ...this.serviceRatings };
        
        // Collect recommendation
        const recommendInput = document.querySelector('input[name="recommend"]:checked');
        this.formData.recommend = recommendInput ? recommendInput.value : '';
        break;

      case 3:
        this.formData.liked = document.getElementById('liked').value.trim();
        this.formData.improvements = document.getElementById('improvements').value.trim();
        this.formData.comments = document.getElementById('comments').value.trim();
        this.formData.displayPermission = document.getElementById('displayPermission').checked;
        break;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (this.validateCurrentStep()) {
      this.collectCurrentStepData();
      this.saveFeedback();
      this.showSuccessMessage();
      this.loadFeedbacks();
    }
  }

  saveFeedback() {
    // Add timestamp and ID
    this.formData.id = Date.now();
    this.formData.timestamp = new Date().toISOString();
    
    // Calculate overall rating from service ratings if not provided
    if (!this.formData.rating) {
      const serviceValues = Object.values(this.formData.serviceRatings);
      const average = serviceValues.reduce((sum, val) => sum + val, 0) / serviceValues.length;
      this.formData.overallRating = Math.round(average * 10) / 10;
    } else {
      this.formData.overallRating = this.formData.rating;
    }
    
    // Get existing feedbacks
    const existingFeedbacks = JSON.parse(localStorage.getItem('portfolioFeedbacks') || '[]');
    
    // Add new feedback
    existingFeedbacks.push(this.formData);
    
    // Save to localStorage
    localStorage.setItem('portfolioFeedbacks', JSON.stringify(existingFeedbacks));
  }

  showSuccessMessage() {
    this.form.style.display = 'none';
    this.successMessage.classList.remove('hidden');
  }

  resetForm() {
    // Reset form data
    this.formData = {};
    this.serviceRatings = {
      Communication: 0,
       Quality: 0,
       Professionalism: 0,
       Creativity: 0,
       Timeliness: 0
    };
    this.currentStep = 1;
    
    // Reset form fields
    this.form.reset();
    this.ratingInput.value = '';
    this.resetStars();
    
    // Reset service sliders and progress
    this.serviceSliders.forEach(slider => {
      slider.value = 0;
      const service = slider.dataset.service;
      this.updateCircularProgress(service, 0);
      const sliderValueElement = slider.parentNode.querySelector('.slider-value');
      if (sliderValueElement) {
        sliderValueElement.textContent = '0.0 / 5.0';
      }
    });
    
    // Reset UI
    this.goToStep(1);
    this.form.style.display = 'block';
    this.successMessage.classList.add('hidden');
    
    // Remove error states
    document.querySelectorAll('.form-control.error').forEach(input => {
      input.classList.remove('error');
    });
    
    this.clearErrorMessages();
  }

  setRating(e) {
    const rating = parseInt(e.target.getAttribute('data-rating'));
    this.ratingInput.value = rating;
    this.updateStars(rating);
  }

  highlightStars(e) {
    const rating = parseInt(e.target.getAttribute('data-rating'));
    this.updateStars(rating, true);
  }

  resetStarHighlight() {
    const currentRating = parseInt(this.ratingInput.value) || 0;
    this.updateStars(currentRating);
  }

  updateStars(rating, isHover = false) {
    this.stars.forEach((star, index) => {
      const starRating = index + 1;
      if (starRating <= rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  resetStars() {
    this.stars.forEach(star => {
      star.classList.remove('active');
    });
  }

  loadFeedbacks() {
    const feedbacks = JSON.parse(localStorage.getItem('portfolioFeedbacks') || '[]');
    
    // Sort by overall rating (highest first), then by timestamp (newest first)
    feedbacks.sort((a, b) => {
      const ratingA = a.overallRating || a.rating || 0;
      const ratingB = b.overallRating || b.rating || 0;
      if (ratingB !== ratingA) {
        return ratingB - ratingA;
      }
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    
    this.displayFeedbacks(feedbacks);
  }

  displayFeedbacks(feedbacks) {
    if (feedbacks.length === 0) {
      this.feedbackList.innerHTML = '<div class="no-feedback">No feedback submitted yet.</div>';
      return;
    }

    const feedbackHTML = feedbacks.map(feedback => this.createFeedbackHTML(feedback)).join('');
    this.feedbackList.innerHTML = feedbackHTML;
    
    // Initialize circular progress for displayed feedbacks
    this.initializeFeedbackProgress(feedbacks);
  }

  initializeFeedbackProgress(feedbacks) {
    feedbacks.forEach((feedback, index) => {
      if (feedback.serviceRatings) {
        Object.entries(feedback.serviceRatings).forEach(([service, rating]) => {
          const progressElement = document.querySelector(`#feedback-${index} [data-service="${service}"] circle:last-child`);
          if (progressElement && rating > 0) {
            const circumference = 2 * Math.PI * 30; // r = 30 for display
            const percentage = (rating / 5) * 100;
            const offset = circumference - (percentage / 100) * circumference;
            
            progressElement.style.strokeDasharray = `${circumference} ${circumference}`;
            progressElement.style.strokeDashoffset = circumference;
            
            // Animate the progress
            setTimeout(() => {
              progressElement.style.strokeDashoffset = offset;
            }, 100 * Object.keys(feedback.serviceRatings).indexOf(service));
          }
        });
      }
    });
  }

  createFeedbackHTML(feedback) {
    const overallRating = feedback.overallRating || feedback.rating || 0;
    const isHighRated = overallRating >= 4;
    const stars = '★'.repeat(Math.floor(overallRating)) + '☆'.repeat(5 - Math.floor(overallRating));
    
    // Create service qualities display with circular progress
    const serviceQualitiesHTML = feedback.serviceRatings 
      ? `<div class="service-qualities-display">
          ${Object.entries(feedback.serviceRatings).map(([service, rating]) => 
            `<div class="service-quality-item">
              <div class="service-quality-circle" data-service="${service}">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="30" stroke="#e5e7eb" stroke-width="8" fill="none"/>
                  <circle cx="40" cy="40" r="30" stroke="#10b981" stroke-width="8" fill="none" 
                          style="stroke-linecap: round; transition: stroke-dashoffset 0.5s ease-in-out; transform: rotate(-90deg); transform-origin: 40px 40px;"/>
                </svg>
                <div class="service-quality-value">${rating.toFixed(1)}</div>
              </div>
              <div class="service-quality-label">${this.capitalizeFirst(service)}</div>
            </div>`
          ).join('')}
         </div>`
      : '';

    const contentSections = [];
    
    if (feedback.liked) {
      contentSections.push(`
        <div class="feedback-section">
          <div class="feedback-section-title">What they liked:</div>
          <div>${this.escapeHtml(feedback.liked)}</div>
        </div>
      `);
    }
    
    if (feedback.improvements) {
      contentSections.push(`
        <div class="feedback-section">
          <div class="feedback-section-title">Areas for improvement:</div>
          <div>${this.escapeHtml(feedback.improvements)}</div>
        </div>
      `);
    }
    
    if (feedback.comments) {
      contentSections.push(`
        <div class="feedback-section">
          <div class="feedback-section-title">Additional comments:</div>
          <div>${this.escapeHtml(feedback.comments)}</div>
        </div>
      `);
    }

    return `
      <div class="feedback-item ${isHighRated ? 'high-rated' : ''}" id="feedback-${feedback.id || Date.now()}">
        <div class="feedback-header">
          <div class="feedback-author">${this.escapeHtml(feedback.name)}</div>
          <div class="feedback-rating">
            <span class="feedback-stars">${stars}</span>
            <span>${overallRating.toFixed(1)}</span>
          </div>
        </div>
        
        <div class="feedback-recommend">
          <span class="recommend-badge ${feedback.recommend}">
            ${feedback.recommend === 'yes' ? 'Would recommend' : 
              feedback.recommend === 'maybe' ? 'Might recommend' : 
              'Would not recommend'}
          </span>
        </div>
        
        ${serviceQualitiesHTML}
        
        <div class="feedback-content">
          ${contentSections.join('')}
        </div>
      </div>
    `;
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showError(message) {
    this.clearErrorMessages();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    const currentStepElement = this.formSteps[this.currentStep - 1];
    currentStepElement.insertBefore(errorDiv, currentStepElement.firstChild);

    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }

  clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
  }
}

// Initialize the feedback form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add sample feedback if none exists
  const existingFeedbacks = JSON.parse(localStorage.getItem('portfolioFeedbacks') || '[]');
  if (existingFeedbacks.length === 0) {
    const sampleFeedback = {
      id: Date.now(),
      name: "John Doe",
      email: "john@example.com",
      rating: 5,
      overallRating: 4.5,
      serviceRatings: {
       Communication: 4.0,
       Quality: 4.6,
       Professionalism: 4.8,
       Creativity: 4.3,
       Timeliness: 4.5
      },
      recommend: "yes",
      liked: "Great work overall, very professional!",
      improvements: "",
      comments: "Keep up the excellent work!",
      displayPermission: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('portfolioFeedbacks', JSON.stringify([sampleFeedback]));
  }
  
  new FeedbackForm();
});





