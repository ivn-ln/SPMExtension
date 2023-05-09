let currentUser = '';
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

(async () => {
    window.webkitRequestFileSystem(window.PERSISTENT, 1024 * 1024, function (filesystem) {      
        console.log(filesystem);                
        console.log(filesystem.root);
    }, function (e) { console.log("Could not request File System"); });
    await chrome.storage.local.get('logged', function(items){
        if(!items['logged']){
            return
        }
        console.log(items['logged'])
        currentUser = items['logged']
        main()
    })
})()

function main(){
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
            input.type = "button"
            input.value = "Save in SPM"
            input.class = "SPMSaveButton"
            input.style = "color: #ffffff;height: 35px; font-family: math;border-width: 3px; padding-bottom: 8px;background-color: #4e4e4e; margin-top:5px; border-color: #000000;border-radius: 4px; cursor: pointer; margin-left: 0px;margin-bottom: 5px;"
            input.addEventListener('click', submit)
            parent.insertBefore(input, element.nextSibling)
        }
    })
}

function submit(){
    console.log('submitting')
    if(['', null, undefined].includes(currentWebsite)){
        console.log('error, invalid website address')
        return
    }
    chrome.storage.local.get(currentUser, (items)=>{
        let userFound = false
        if(Object.keys(items).length === 0){
            console.log('User not found')
            userFound = false
        }else{
            userFound = true
        }
        let currentPassStructure = (new passwordDataStructure(0, login, password)).returnJSON()
        let regex = /\/\/([^\/,\s]+\.[^\/,\s]+?)(?=\/|,|\s|$|\?|#)/g;
        let currentService = regex.exec(currentWebsite)[1]
        console.log('Current website: ', currentService)
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
        console.log('Submission success')
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
}


