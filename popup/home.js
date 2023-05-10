const loginButton = document.getElementById('login')

const loginField = document.getElementsByClassName('home-username-input')[0]

chrome.storage.local.get('logged', (items)=>{
    if(items['logged']){
        window.location.href = "passwords.html";
    }
})

loginButton.disabled = true

loginButton.classList.add('disabled')

console.log(loginButton.classList)

loginButton.addEventListener('click', login)
loginField.addEventListener('input', on_input)


function login(){
    username = loginField.value
    chrome.storage.local.set({'logged': username})
    window.location.href = "passwords.html";
}

function on_input(input){
    if(input.currentTarget.value!=""){
        loginButton.classList.remove('disabled')
        loginButton.disabled = false
    }
    else{
        loginButton.classList.add('disabled')
        loginButton.disabled = true
    }
}