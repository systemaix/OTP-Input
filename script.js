const inputs = document.querySelectorAll('.otp-field input');
const btn = document.getElementById('verifyBtn');

inputs.forEach((input, index) => {
    // 1. Handle Typing
    input.addEventListener('input', (e) => {
        // If a number was typed, move to next
        if (input.value.length > 1) {
            input.value = input.value.slice(0, 1); // Limit to 1 char
        }
        
        if (input.value.length === 1) {
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        }
        checkFilled();
    });

    // 2. Handle Backspace
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            if (input.value === '') {
                if (index > 0) {
                    inputs[index - 1].focus();
                }
            } else {
                input.value = ''; // Clear current before moving back
            }
            checkFilled();
        }
    });

    // 3. Handle Paste (The Magic)
    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        
        // Loop through the inputs and fill them
        inputs.forEach((item, i) => {
            if(i >= index && text[i - index]) {
                item.focus();
                item.value = text[i - index];
                checkFilled();
            }
        });
    });
});

// 4. Enable Button if all filled
function checkFilled() {
    let count = 0;
    inputs.forEach(input => {
        if(input.value !== '') {
            count++;
            input.classList.add('filled');
        } else {
            input.classList.remove('filled');
        }
    });

    if (count === inputs.length) {
        btn.classList.add('active');
        btn.removeAttribute('disabled');
    } else {
        btn.classList.remove('active');
        btn.setAttribute('disabled', 'true');
    }
}
