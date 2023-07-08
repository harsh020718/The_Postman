console.log("this is my project Postman")
let parametersBox = document.getElementById('parametersBox')
parametersBox.style.display = 'none';
let jsonRadio = document.getElementById("jsonRadio")
let paramsRadio = document.getElementById("paramsRadio")
let requestJsonBox = document.getElementById('requestJsonBox')
let i = 0

paramsRadio.addEventListener('click', () => {
    parametersBox.style.display = 'block';
    requestJsonBox.style.display = "none";
})
jsonRadio.addEventListener('click', () => {
    parametersBox.style.display = 'none';
    requestJsonBox.style.display = "block";
})

let addParam = document.getElementById('addParam')
let paramsBox = document.getElementById('paramsBox')
function additionbox(string) {
    let div = document.createElement('div')
    div.innerHTML = string
    return div.firstElementChild
}



addParam.addEventListener('click', () => {



    string = `<div class="row">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${i + 2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${i + 2}" placeholder="Enter Parameter ${i + 2} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${i + 2}" placeholder="Enter Parameter ${i + 2} Value">
    </div>
    <button  class="btn btn-primary deleteParam" style="width: 45px;">-</button>
    </div>`
      
    let paramElement = additionbox(string);
    paramsBox.appendChild(paramElement);

   
    

    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {

            e.target.parentElement.remove();
        })
    }

    i++
})
let submit = document.getElementById('submit')
submit.addEventListener('click',()=>{
    let responsePrism = document.getElementById("responsePrism")
    responsePrism.innerHTML = "Your response will appear here..."
    let url = document.getElementById('url').value
    let requestType = document.querySelector("input[name='requestType']:checked").value
    let contentType = document.querySelector("input[name='ContentType']:checked").value
    
    console.log(url,requestType,typeof contentType)
    
    if(contentType== 'params'){
        data = {};
        for(j=0;j<i+1;j++){
            if(document.getElementById("parameterKey" + (j+1)) != undefined){
            let key = document.getElementById("parameterKey" + (j+1)).value;
            let value = document.getElementById("parameterValue" + (j+1)).value;
            
            
            data[key]=value;
            
        }
    }
    
    data = JSON.stringify(data);
}
else{
    data = document.getElementById("requestJsonText").value
    
}
if (requestType=='GET'){
    fetch(url,{ // url = randomuser.me/api
        method: 'GET',
    })
    .then(response=>response.text())
    .then((text)=>{
        document.getElementById("responsePrism").innerHTML = text
        Prism.highlightAll()
    })
}
else{
    fetch(url,{ 
        method: 'POST',
        body: data,
        headers: { //https://jsonplaceholder.typicode.com/posts
            "Content-type": "application/json; charset=UTF-8"
          }
    })
    .then(response=>response.text())
    .then((text)=>{
        document.getElementById("responsePrism").innerHTML = text
        Prism.highlightAll()
    })
}
})



