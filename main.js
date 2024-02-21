let bookfrom=document.querySelector('#book-form')
let tbody=document.querySelector('#book-list')

window.addEventListener("DOMContentLoaded",()=>{
    
    let data= JSON.parse(localStorage.getItem('details'))
    if(data != null)
    data.forEach(item => addBooktoList(item.title,item.author,item.isbn));
})


bookfrom.addEventListener('submit',e=>{
    e.preventDefault()
    let title=document.querySelector('#title').value
let author=document.querySelector('#author').value
let isbn=document.querySelector('#isbn').value


if(title==""||author==""||isbn==""){
    alert('plese enter the field')
    document.getElementById("title").focus()
    
}
    else{

   addBooktoList(title,author,isbn)
   clearALLField()
   showAlert("book added successfully","success")
savetolocalStorage(title,author,isbn)



 }

   
})


tbody.addEventListener("click",function(x){
    if(x.target.classList.contains('delete')){
        tbody.removeChild(x.target.parentElement.parentElement)
        showAlert("Book delete successfully","danger")
        removeBookfromlocalStorage(x.target.parentElement.previousElementSibling.textContent)

        
    }

    })



    showAlert=(msg,status)=>{
        let div=document.createElement('div')
div.className="alert alert-"+status
div.innerHTML=msg
let container=document.querySelector('.container')
let bookfrom=document.querySelector("#book-form")
container.insertBefore(div,bookfrom)

setTimeout(()=>{
    document.querySelector('.alert').remove()

},2000)

    }
    function clearALLField(){
        document.querySelector('#title').value=""
document.querySelector('#author').value=""
document.querySelector('#isbn').value=""

    }

    function savetolocalStorage(title,author,isbn){
        let details=[];
        if(localStorage.getItem('details')!==null){
            details=JSON.parse(localStorage.getItem('details'))


        }
        console.log(details, "Hello")

        details.push({title,author,isbn})
        localStorage.setItem("details",JSON.stringify(details))
    }
    function addBooktoList(title,author,isbn){
        let tbody=document.querySelector('#book-list')
        let tr =document.createElement('tr')
        tr.innerHTML=`

<td>${title}</td>
<td>${author}</td>
<td>${isbn}</td>
<td><button class='btn btn-danger float-right delete'>X</button></td>

`
tbody.appendChild(tr)
    }

    function removeBookfromlocalStorage(isbn){
      
      let data=JSON.parse(localStorage.getItem("details")) 
      let newData=data.filter(item=>item.isbn!==isbn)
      localStorage.setItem("details",JSON.stringify(newData))
       

    }
    

    
