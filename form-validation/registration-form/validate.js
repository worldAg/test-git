const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show input success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
  //console.log(input.value);

  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`); // ${input.id}의 첫 글자를 대문자로 표현하기 위해 함수 사용
    } else {
      showSuccess(input);
    }
  });

}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// Check passwords math
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Get fieldname
function getFieldName(input) {
  //return input.id.toUpperCase(); // 전체 대문자
  return input.id.charAt(0).toUpperCase() + input.id.slice(1); // 첫 글자(0) 대문자로 + 나머지 문자들(1 ~)
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  // 공백
  checkRequired([username, email, password, password2]);

  // 길이
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);

  // 이메일 형식
  checkEmail(email);

  // 비밀번호 확인
  checkPasswordsMatch(password, password2);

});