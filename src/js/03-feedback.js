import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const saveFeedbackToLocalStorage = throttle(() => {
  const feedbackState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackState));
}, 500);

const loadFeedbackFromLocalStorage = () => {
  const savedFeedback = localStorage.getItem('feedback-form-state');

  if (savedFeedback) {
    const feedbackState = JSON.parse(savedFeedback);
    emailInput.value = feedbackState.email;
    messageInput.value = feedbackState.message;
  }
};

const clearFeedbackAndLocalStorage = () => {
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
};

form.addEventListener('input', event => {
  if (event.target === emailInput || event.target === messageInput) {
    saveFeedbackToLocalStorage();
  }
});

window.addEventListener('load', loadFeedbackFromLocalStorage);

form.addEventListener('submit', event => {
  event.preventDefault();
  const feedbackData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(feedbackData);
  clearFeedbackAndLocalStorage();
});
