document.addEventListener('DOMContentLoaded',load)


async function handleSubmit(e) {
    //prevent Default
    e.preventDefault();

    try{

        //take Details
        const expenseDetails={
            item:document.getElementById('item').value,
            price:document.getElementById("price").value,
            category:document.getElementById("category").value,
        }

        //check all the fields are filled

        if(expenseDetails.item && expenseDetails.price && expenseDetails.category){

            //post data on api

            let res=await axios.post("https://crudcrud.com/api/fb990756475e4ecc9097eee9d5187f4b/eTracker",expenseDetails)
            console.log(res.data)

            //set userId
            const userId=res.data._id 

            //post on localStorage
            localStorage.setItem(userId,JSON.stringify(expenseDetails))

            //displayData mainFunction
            await displayData(userId,expenseDetails)

            //count total
            totalExpense()
            


        }
        else{
            console.log('fill the details')
        }
        //clear the input field
        document.getElementById('item').value='';
        document.getElementById('price').value='';
        document.getElementById('category').value='';
    }
    catch(err){
        console.error('something wrong while posting Data',err)
    }
    
}
async function displayData(userId,expenseDetails){

    try{

        //get data from axios 
        let res= await axios.get("https://crudcrud.com/api/fb990756475e4ecc9097eee9d5187f4b/eTracker")
        console.log(res.data)

        //create list to display data
        const list=document.createElement('li')
        list.className="bg-blue-300 shadow-lg rounded-lg p-6 mb-2"
        list.innerHTML=`
                    <span style="font-size: 24px;">🛍️: ${expenseDetails.item}</span>
                    <span style="font-size: 20px;">₹: ${expenseDetails.price}</span><br>
                    ${expenseDetails.category} <button type="button" class="del bg-red-500 rounded-lg float-right p-2  ml-1">X</button>
                    <button type="button" class="edit text-white bg-green-300 p-2 rounded-lg float-right">✎</button>
        `

        //append list in ul
        const userList=document.getElementById('ul1')
        userList.appendChild(list)

        //add edit and delete button function
        const editBtn=list.querySelector('.edit')
        editBtn.addEventListener('click', function(){
            editFunction(userId,expenseDetails,list)
        })

        const delBtn=list.querySelector(".del")
        delBtn.addEventListener('click',function(){
            deleteFunction(userId,list)
        })

    }
    catch(err){
        console.log('something wrong in display Data',err)
    }

}
async function deleteFunction(userId,list) {
    try{
        let res=await axios.delete(`https://crudcrud.com/api/fb990756475e4ecc9097eee9d5187f4b/eTracker/${userId}`)
        console.log(res.data)
        list.remove()
        localStorage.removeItem(userId)
        totalExpense()
    }
    catch(err){
        console.log('something wrong while delete',err)
    }
    
}

async function editFunction(userId,expenseDetails,list) {
    try{
        document.getElementById("item").value=expenseDetails.item;
        document.getElementById('price').value=expenseDetails.price;
        document.getElementById('category').value=expenseDetails.category;

        const submitBtn=document.getElementById("submit")
        submitBtn.removeEventListener('click',handleSubmit)

        submitBtn.addEventListener("click",async function editExpenseDetails(e) {
            e.preventDefault()
            const editExpenseDetails={
                item: document.getElementById("item").value,
                price: document.getElementById("price").value,
                category: document.getElementById("category").value,
            }
            if(editExpenseDetails.item && editExpenseDetails.price && editExpenseDetails.category) {

                let res=await axios.put(`https://crudcrud.com/api/fb990756475e4ecc9097eee9d5187f4b/eTracker/${userId}`,editExpenseDetails)
                console.log(res.data)

                list.innerHTML=`
                    <span style="font-size: 24px;">🛍️: ${editExpenseDetails.item}</span>
                    <span style="font-size: 20px;">₹: ${editExpenseDetails.price}</span><br>
                    ${editExpenseDetails.category} <button type="button" class="del bg-red-500 rounded-lg float-right p-2  ml-1">X</button>
                    <button type="button" class="edit text-white bg-green-300 p-2 rounded-lg float-right">✎</button>
        `

                localStorage.setItem(userId,JSON.stringify(editExpenseDetails))

                const editBtn=list.querySelector(".edit")
                editBtn.addEventListener('click',async function(){
                    editFunction(editExpenseDetails,userId,list)
                })

                const delBtn=list.querySelector(".del")
                delBtn.addEventListener("click",async function(){
                    deleteFunction(list,userId)
                })

                submitBtn.removeEventListener('click',editExpenseDetails)

                submitBtn.addEventListener("click",handleSubmit)

                totalExpense()

            }
            else{
                console.log("error in edit")
            }
            
            
        })
        
    }
    catch(err){
        console.log(err)
    }

}
    

async function load(){
    try{
        let res=await axios.get("https://crudcrud.com/api/fb990756475e4ecc9097eee9d5187f4b/eTracker")
        let reload=res.data
        for(let i of reload){
            await(displayData(i._id,i))
        }
        totalExpense()
    }
    
    catch(err){
        console.error('Something error while reload',err)
    }
}

async function totalExpense() {
    try{
        let res=await axios.get("https://crudcrud.com/api/fb990756475e4ecc9097eee9d5187f4b/eTracker")
        let total=res.data
        const count=total.reduce((a,b)=>{
            return a+parseFloat(b.price)
        },0)

        console.log(`₹${count}`)
        document.getElementById('total').innerHTML=`Total : ₹${count}`
        
    }
    catch(err){
        console.log('error in update total',err)
    }
    
}
