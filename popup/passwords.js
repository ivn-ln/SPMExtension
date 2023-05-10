const logoutButton = document.getElementsByClassName('button passwords-log-out')[0]

let username

chrome.storage.local.get(null, (items)=>{
    username = items['logged']
    document.getElementsByClassName('passwords-name-label')[0].innerHTML = "You're logged in as " + username 
    for(let i in Object.entries(items)){
        if(items[i]=='logged'  || items[i]==username){
            continue
        }
        let services = Object.entries(items[username])
        for(let j in services){
            let serviceButton = document.getElementsByClassName('app-component-container')[0].cloneNode(true)
            serviceButton.setAttribute('style', '')
            serviceButton.classList.add('service-'+j)
            const button = serviceButton.getElementsByClassName('DefaultText')[0]
            const close = serviceButton.getElementsByClassName('button')[0]
            button.addEventListener('click', openService)
            close.addEventListener('click', closeService)
            let service_name = services[j][0]
            close.id = service_name
            button.id = service_name
            serviceButton.getElementsByClassName('app-component-text')[0].innerHTML = service_name
            let nameLabel = document.getElementsByClassName('passwords-control-elements')[0]
            nameLabel.parentElement.insertBefore(serviceButton, nameLabel)
            nameLabel.appendChild(document.createElement('br'))
        }
        return
    }
})

logoutButton.addEventListener('click', logout)

function download(text, name, type) {
  const a = document.createElement('a');
  let file = new Blob([text], {type: Array});
  a.href = URL.createObjectURL(file);
  a.download = name+type;
  a.click()
}

function openService(input){
    const id = input.currentTarget.id
    console.log(input.currentTarget)
    chrome.storage.local.get(null, (items)=>{
        const password = items[username][id]
        const password_str = (Object.entries(password)[1] + ';'  + Object.entries(password)[02]+ ';').replaceAll(',', ':')
        console.log(Object.entries(password))
        download(password_str, id, '.spm')
    })
}

function closeService(input){
    const id = input.currentTarget.id
    console.log(input.currentTarget)
    input.currentTarget.parentElement.parentElement.parentElement.removeChild(input.currentTarget.parentElement.parentElement)
    chrome.storage.local.get(null, (items)=>{
        delete items[username][id]
        console.log(items)
        chrome.storage.local.set(items)
    })
}

function logout(){
    chrome.storage.local.set({'logged': false})
    window.location.href = "index.html";
}