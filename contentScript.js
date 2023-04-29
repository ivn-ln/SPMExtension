(() => {
    let login = ''

    let password = ''

    let currentWebsite = ''
    chrome.storage.local.get(["Login", "Password"], function(items){
        console.log("items", items) 
    })
    chrome.runtime.onMessage.addListener((obj, sender, response)=>{
        const{type, value, website}=obj
        if(type === "NEW"){
            currentWebsite = website
            console.log(currentWebsite)
        }
    })
    let inputs = document.querySelectorAll('input')
    let current_user = 'debug'
    let website
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
    chrome.storage.local.set({"Login": login, "Password": password})
}
