document.addEventListener('DOMContentLoaded',loaded)
//handle form submit
async function handleSubmit(e){
    e.preventDefault();
    try{

        const uniqueId = Date.now()
        //expense details
        const userDetails={
            item:document.getElementById("item").value,
            price:parseInt(document.getElementById("price").value),
            category:document.getElementById('category').value
        }

        //inspecting all fields have input
        if(userDetails.item && userDetails.price && userDetails.category){

            //post data on api
            let res=await axios.post("https://crudcrud.com/api/d6141f82003340499d4db7e0a581122b/eTracker",userDetails)
            console.log(res.data)
            const userId=res.data._id
            
            

            //store in localStorage
            
            localStorage.setItem(uniqueId,JSON.stringify(userDetails))
            displayData(userDetails,uniqueId)
            totalAmount()


        }
        else{
            console.log('Fill all the input field')
        }
        // Clear input fields after submission
        document.getElementById("item").value = ""; 
        document.getElementById("price").value = "";
        document.getElementById("category").value = "";

    }
    catch(err){
        console.log("something wrong while post data",err)
    }
    
}
async function displayData(userDetails,uniqueId){

    try{
        //get data from api
        
        let res= await axios.get("https://crudcrud.com/api/d6141f82003340499d4db7e0a581122b/eTracker")
        console.log(res.data)
        

        let list=document.createElement("li")
        list.className="bg-indigo-300 shadow-lg mb-2 p-4 rounded-lg text-center overflow-hidden"
        list.innerHTML=`${userDetails.item}, ₹: ${userDetails.price}, Category : ${userDetails.category}
        <button type="button" class="del bg-red-500 rounded-lg float-right p-2  ml-1">X</button>
        <button type="button" class="edit text-white bg-green-300 p-2 rounded-lg float-right">✎</button>
        `
        const userLi=document.getElementById("ul1")
        userLi.appendChild(list)
        

        const delBtn=list.querySelector(".del")
        delBtn.addEventListener('click',function(){
            deleteFunction(uniqueId,list)
        })

        const editBtn=list.querySelector('.edit')
        editBtn.addEventListener('click', function(){
            editFunction(userDetails,uniqueId,list)
        })
        
    }
    catch(err){
        console.error("something wrong in display data",err)
    }
}

async function deleteFunction(uniqueId,list) {
    try{
        localStorage.removeItem(uniqueId)
        list.remove()
        totalAmount()

    }
    catch(err){
        console.log(err)
    }

}

async function editFunction(userDetails,uniqueId,list) {
    try{
        document.getElementById('item').value=userDetails.item;
        document.getElementById("price").value=userDetails.price;
        document.getElementById('category').value=userDetails.category;

        let currentId=uniqueId
    
        //localStorage.removeItem(uniqueId)
    
        const submitBtn=document.getElementById('submit')
        submitBtn.removeEventListener('click',handleSubmit)
    
        submitBtn.addEventListener("click",async function editExpense(e) {
            e.preventDefault()
    
            const editedDetails={
                item:document.getElementById("item").value,
                price:parseInt(document.getElementById("price").value),
                category:document.getElementById("category").value,
            }
            localStorage.setItem(currentId,JSON.stringify(editedDetails))
            totalAmount()
    
            list.innerHTML=list.innerHTML=`${editedDetails.item}, ₹: ${editedDetails.price}, Category : ${editedDetails.category}
            <button type="button" class="del bg-red-500 rounded-lg float-right p-2  ml-1">X</button>
            <button type="button" class="edit text-white bg-green-300 p-2 rounded-lg float-right">✎</button>
            `
            const delBtn=list.querySelector(".del")
            delBtn.addEventListener('click',function(){
                deleteFunction(currentId,list)
            })
    
            const editBtn=list.querySelector('.edit')
            editBtn.addEventListener('click', function(){
                editFunction(userDetails,currentId,list)
            })
            // Clear input fields after submission
            document.getElementById("item").value = ""; 
            document.getElementById("price").value = "";
            document.getElementById("category").value = "";
    
            submitBtn.removeEventListener('click',editedDetails)
    
            submitBtn.addEventListener("click",handleSubmit)
    
        })
    }
    catch(err){
        console.log(err)
    }



}


async function loaded() {
    try{
        for(let i=0;i<localStorage.length;i++){
            const data=localStorage.key(i)
            const detail=JSON.parse(localStorage.getItem(data))
            await  displayData(detail,data)
        
        }
        totalAmount()

    }
    catch(err){
        console.log('error in function load',err)
    }
    
    
}
async function totalAmount(){
    try{
        let total=0
        for(let i=0;i<localStorage.length;i++){
            const data=localStorage.key(i)
            const details=JSON.parse(localStorage.getItem(data))
            total += parseInt(details.price)
        }
        document.getElementById('total').innerHTML= `Total: ₹${total}`
    }
    catch(err){
        console.log(err)
    }
}
