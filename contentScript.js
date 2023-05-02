let currentUser = 'debug1';
let login = '';
let password = '';
let currentWebsite = '';

class passwordDataStructure{
    constructor(id, login, password){
        this.id = id
        this.login = login
        this.password = password
    }
    returnJSON(){
        let JSONout = {}
        JSONout['id'] = this.id
        JSONout['login'] = this.login
        JSONout['password'] = this.password
        return JSONout
    }
}

(() => {
    //chrome.storage.local.clear()
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const{type, tabURL}=obj
        if(type === "NEW"){
            currentWebsite = tabURL
            console.log("Tab's url is ", currentWebsite)
        }
    })
    chrome.storage.local.get(null, function(items){
        console.log("Stored passwords", items)
    })
    let inputs = document.querySelectorAll('input')
    const input = document.createElement("input")
    const text = document.createElement("span")
    text.innerHTML = "Save in spm"
    const pointers = ['user', 'email', 'login', 'username']
    inputs.forEach(element => {
        if(element.type=='tel' || element.type=='password' || element.type=='email'|| element.type=='text'){
            if(element.type=='text' && !(pointers.includes(element.name) || pointers.includes(element.id))){
                console.log("not included: ", element.name)
                return
            }
            console.log(element.name)
            element.addEventListener('input', on_input)
            let parent = element.parentElement
            input.type = "checkbox"
            input.innerHTML = "SPMSave"
            parent.insertBefore(input, element.nextSibling)
            parent.insertBefore(text, input.nextSibling)
        }
    })
})()


function submit(){
    if(['', null, undefined].includes(currentWebsite)){
        console.log('error, invalid website address')
        return
    }
    chrome.storage.local.get(currentUser, function(items){
        let userFound = false
        if(Object.keys(items).length === 0){
            console.log('User not found')
            userFound = false
        }else{
            userFound = true
        }
        let currentPassStructure = (new passwordDataStructure(0, login, password)).returnJSON()
        let currentService = currentWebsite
        let currentUserStruct = {}
        let currentServiceStruct = {}
        if(!userFound){
            currentServiceStruct[currentService] = currentPassStructure
            currentUserStruct[currentUser] = currentServiceStruct
        }else{
            currentServiceStruct = Object.fromEntries(Object.entries(items[currentUser]))
            currentServiceStruct[currentService] = currentPassStructure
            currentUserStruct = items
            currentUserStruct[currentUser] = currentServiceStruct
        }
        let writeJSON = currentUserStruct
        chrome.storage.local.set(writeJSON)
    })
    //login = ''
    //password = ''
    //currentWebsite = ''
}

function on_input(input){
    let inputed_value = input.currentTarget.value
    if(input.currentTarget.type=='password'){
        password = inputed_value
        console.log('password: ', password)
    }
    else{
        login = inputed_value
        console.log('login: ', login)
    }
    submit()
}


