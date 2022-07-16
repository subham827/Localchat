const socket = io('http://localhost:8000');
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
const superr = document.getElementById("superr");
let superb = document.getElementsByClassName("super");
function getNewColor() {
    let symbols,color;
    symbols= "0123456789ABCDEF";
    color= "#";
    for(let i=0;i<6;i++){
        color = color +symbols[Math.floor(Math.random() * 16)]
    }
    for (let index = 0; index < superb.length; index++) {
        const element = superb[index];
        element.style.color = color;
        
    }
}
const append = (supeer,message,position)=>{
    let messageElement = document.createElement('div');
    
    // messageElement.classList.add()
   messageElement.innerHTML= `<div class="message ${position}">
                          <div class="super">${supeer}</div> ${message}
                          </div>`
    // messageElement.classList.add('message');
    // messageElement.classList.add(position);
    // messageElement.classList.add('super');
   
    
    
    
    messageContainer.append(messageElement);
    // getNewColor();


}
const aptpend = (supeer,message,position)=>{
    let messageElement = document.createElement('div');
    
    // messageElement.classList.add()
   messageElement.innerHTML= `<div class="message ${position}">
                          <div class="supe">${supeer}</div> ${message}
                          </div>`
    // messageElement.classList.add('message');
    // messageElement.classList.add(position);
    // messageElement.classList.add('super');
   
    
    
    
    messageContainer.append(messageElement);
    // getNewColor();


}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You`, `: ${message}`, 'right');
    socket.emit('send', message);
    getNewColor();
    messageInput.value = '';
})
const name = prompt("enter your name to join");
console.log(name);
socket.emit('new-user-joined', name)
socket.on('user-joined', name=>{
    
    append('',`${name}  joined the chat`, 'bottom')

})
socket.on('recieve', data=>{

    // getNewColor();
aptpend(`${data.name}`, ` : ${data.message}`, 'left')
})
socket.on('leave', name=>{
    append(`${name}`, `left the chat`, 'left')
})
