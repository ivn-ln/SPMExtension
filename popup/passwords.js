const logoutButton = document.getElementById('logout')

let username

chrome.storage.local.get('logged', (items)=>{
    console.log(items)
    username = items['logged']
    document.getElementsByClassName('passwords-name-label')[0].innerHTML = "You're logged in as " + username 
})

logoutButton.addEventListener('click', logout)

function logout(){
    chrome.storage.local.set({'logged': false})
    window.location.href = "index.html";
}