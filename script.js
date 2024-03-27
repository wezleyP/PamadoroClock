const startButton = document.getElementById('btn1');
const shownDiv = document.querySelector('.shownDiv');
const hiddenDiv = document.querySelector('.hiddenDiv');
const footerText = document.querySelector('.footerText');
const input = document.getElementById('input');
input.onfocus = () => input.value = '';

if (Notification.permission === 'denied' || Notification.permission === 'default') {
  shownDiv.classList.add('hidden');
  hiddenDiv.classList.remove('hidden');
  hiddenDiv.innerHTML = `
    <div>
      You must enable notifications to use this app. 
        <br> 
      Click the lock icon or 
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
      </svg> 
      icon in the address bar to enable notifications.
    </div>
  `;
}

if (Notification.permission === 'granted') {
  shownDiv.classList.remove('hidden');
  hiddenDiv.classList.add('hidden');
} else if (Notification.permission !== 'denied') {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification granted');
    }
  });
}

// cleans input string and replaces any +, - or space characters with ''
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}
//checks if input is invalid returns true if it is
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}
// use Notification API to show desktop notification
function showNotification() {
  const notification = new Notification('Pommy', {
    body: `Your ${input.value} minute(s) are up! Go take a break.`,
  });
  notification.onclick = () => {
    window.focus();
    notification.close();
  };
}
// Starts the timer
function startPommy() { 
  const currVal = cleanInputString(input.value);
  const invalidInputMatch = isInvalidInput(currVal);

  if (invalidInputMatch || currVal > 120 || currVal < 1) {
    alert(`Try a different Number!`);
    isError = true;
    return null;
  }
  shownDiv.classList.add('hidden');
  hiddenDiv.classList.remove('hidden');
    setTimeout(() => {
      showNotification();
      shownDiv.classList.remove('hidden');
      hiddenDiv.classList.add('hidden');
      input.value = '';
  }, currVal * 60000);
}

// Event listener
startButton.addEventListener('click', startPommy);