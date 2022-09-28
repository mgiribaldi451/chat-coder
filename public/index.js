

let socket = io.connect(); 
socket.on('messages', function(data) { 
  // console.log(data);
  render(data);
});

socket.on('product', function(data) { 
    // console.log(data);
    renderProd(data);
  });


function render(data) { 
    let date = new Date,
    dformat = [date.getMonth()+1,
               date.getDate(),
               date.getFullYear()].join('/')+' '+
              [date.getHours(),
               date.getMinutes(),
               date.getSeconds()].join(':');
    let html = data.map(function(elem, index){ 
      return(`<div>
            <span style="color: brown">${dformat}</span>  
            <span style="font-weight: bold; color: blue;">${elem.author}</span>: 
            
            <span style="font-style: italic; color: green;">${elem.text}</span> </div>`) 
    }).join(" "); 
    document.getElementById('messages').innerHTML = html; 
    
    
}

function addMessage(e) { 
  if(isValidEmail(document.getElementById('username').value)){

  
  let mensaje = { 
      author: document.getElementById('username').value, 
      text: document.getElementById('texto').value,
      
    }; 
    socket.emit('new-message', mensaje); // new-message es el nombre del evento (recordatorio)

    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    return false;
  }
  else{
    return alert("Mail mal ingresado")
  }
}



function isValidEmail(mail) { 
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail); 
}