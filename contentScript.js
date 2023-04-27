let login = '';

let password = '';

(() =>{
    let inputs = document.querySelectorAll('input')
    const img = document.createElement("img")
    inputs.forEach(element => {
        if(element.type=='tel' || element.type=='password' || element.type=='email'|| (element.type=='text' && (element.name.includes('email') || element.id.includes('email') || element.id.includes('login') || element.name.includes('login')))){
            let type = 'login'
            if(element.type=='password'){
                type = 'pass'
            }
            element.addEventListener('input', on_input, element.value, type, self)
            let parent = element.parentElement
            img.alt = "lock"
            element.appendChild(img)
            parent.insertBefore(img, element)
        }
    });
})();

function on_input(input, type, element){
    switch (input.inputType){
        case 'insertText':
            if(type=='pass'){
                password+=input.data
            }
            else{
                login+=input.data
            }
            break
        case 'deleteContentBackward':
            if(type=='pass'){
                password = password.substring(0, password.length-1)
            }
            else{
                login = login.substring(0, login.length-1)
            }
            break
    }
    console.log("Login: " + login)
    console.log("Pass: " + password)
}
