const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm_password');
const validationMessage = document.getElementById('validationMessage');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('registerForm');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

password.addEventListener('input', () => {
    const value = password.value;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    
    let score = 0;

    if(!value) {
        // Reset if empty
        strengthBar.className = '';
        strengthText.textContent = '';
        return;
    }
/*
// 1. Check length criteria
if (value.length  6) score++;

//2. Check for mixed character types 
if (/[a-zA-Z]/.test(value) && /[0-9]/.test(value)) score++;

//3. Check for special characters
if (/[^a-zA-Z0-9]/.test(value)) score++;
*/
// Map calculated score to styling buckets
if ( value.length < 6) {
    strengthBar.className = 'weak';
    strengthText.textContent = 'Strength:Weak';
    strengthText.style.color = 'red';
} else if (value.length < 10) {
    strengthBar.className = 'medium';
    strengthText.textContent = 'Strength:Medium';
    strengthText.style.color = 'orange';
} else if (hasUpper && hasLower && hasNumber) {
    strengthBar.className = 'strong';
    strengthText.textContent = 'Strength:Strong';
    strengthText.style.color = 'green';
} else{
    strengthBar.className = 'medium';
    strengthText.textContent = 'Strength:Medium';
    strengthText.style.color = 'orange';
}
});

function validatePasswords() {
    const passValue = password.value;
    const confirmPassValue = confirmPassword.value;

    if (confirmPassValue === '') {
        validationMessage.textContent = ' Please confirm your password.';
        confirmPassword.className = '';
        // submitBtn.disabled = false;
        return;
    }

    if (passValue === confirmPassValue) {
        validationMessage.textContent = ' Passwords match.';
        validationMessage.style.display = 'none';
        validationMessage.className = 'message valid';
        confirmPassword.className = 'valid-input';
        // submitBtn.disabled = false;
    } else {
        validationMessage.textContent = ' Passwords do not match.';
        validationMessage.style.display = 'block';
        validationMessage.className = 'message invalid';
        confirmPassword.className = 'invalid-input';
        // submitBtn.disabled = true;
    }
}

password.addEventListener('input', validatePasswords);
confirmPassword.addEventListener('input', validatePasswords);

form.addEventListener('submit', function(event) {
    if (password.value !== confirmPassword.value) {
        event.preventDefault();
        alert('Please ensure both passwords match.');
    }
}
);              