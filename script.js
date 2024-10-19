document.addEventListener('DOMContentLoaded', load);

async function handleSubmit(e) {
    e.preventDefault();
    try {
        const expenseDetails = {
            item: document.getElementById('item').value,
            price: document.getElementById("price").value,
            category: document.getElementById("category").value,
        };
        if (expenseDetails.item && expenseDetails.price && expenseDetails.category) {
            let res = await axios.post("https://crudcrud.com/api/eb227b30160946c18a684f968e5dd402/eTracker", expenseDetails);
            const userId = res.data._id;
            localStorage.setItem(userId, JSON.stringify(expenseDetails));
            await displayData(userId, expenseDetails);
            totalExpense();
        } else {
            console.log('fill the details');
        }
        clearInputs();
    } catch (err) {
        console.error('something wrong while posting Data', err);
    }
}

function clearInputs() {
    document.getElementById('item').value = '';
    document.getElementById('price').value = '';
    document.getElementById('category').value = '';
}

async function displayData(userId, expenseDetails) {
    try {
        const list = document.createElement('li');
        list.className = "bg-blue-300 shadow-2xl rounded-lg p-5  flex-col sm:flex-row sm:justify-between items-center mb-2";
        list.innerHTML = `
            <span style="font-size: 24px;">️🛍️:${expenseDetails.item}</span>
            <span style="font-size: 20px;">₹: ${expenseDetails.price}</span><br>
            ${expenseDetails.category} 
            <button type="button" class="del bg-red-500 rounded-lg float-right p-2  ml-1">X</button>
            <button type="button" class="edit text-white bg-green-300 p-2 rounded-lg float-right">✎</button>
        `;
        document.getElementById('ul1').appendChild(list);

        list.querySelector('.edit').addEventListener('click', () => editFunction(userId, expenseDetails, list));
        list.querySelector('.del').addEventListener('click', () => deleteFunction(userId, list));
    } catch (err) {
        console.log('something wrong in display Data', err);
    }
}

async function deleteFunction(userId, list) {
    try {
        await axios.delete(`https://crudcrud.com/api/eb227b30160946c18a684f968e5dd402/eTracker/${userId}`);

        list.remove();
        localStorage.removeItem(userId);
        totalExpense();
    } catch (err) {
        console.log('something wrong while delete', err);
    }
}

async function editFunction(userId, expenseDetails, list) {
    document.getElementById("item").value = expenseDetails.item;
    document.getElementById('price').value = expenseDetails.price;
    document.getElementById('category').value = expenseDetails.category;

    const submitBtn = document.getElementById("submit");
    submitBtn.removeEventListener('click', handleSubmit);
    submitBtn.addEventListener("click", async function editExpenseDetails(e) {
        e.preventDefault();
        try {
            const editExpenseDetails = {
                item: document.getElementById("item").value,
                price: document.getElementById("price").value,
                category: document.getElementById("category").value,
            };
            if (editExpenseDetails.item && editExpenseDetails.price && editExpenseDetails.category) {
                let res = await axios.put(`https://crudcrud.com/api/eb227b30160946c18a684f968e5dd402/eTracker/${userId}`, editExpenseDetails);
                list.innerHTML = `
                    <span style="font-size: 24px;">️🛍️:${editExpenseDetails.item}</span>
                    <span style="font-size: 20px;">₹: ${editExpenseDetails.price}</span><br>
                    ${editExpenseDetails.category} 
                    <button type="button" class="del bg-red-500 rounded-lg float-right p-2  ml-1">X</button>
                    <button type="button" class="edit text-white bg-green-300  rounded-lg float-right p-2">✎</button>
                `;
                localStorage.setItem(userId, JSON.stringify(editExpenseDetails));
                list.querySelector('.edit').addEventListener('click', () => editFunction(userId, editExpenseDetails, list));
                list.querySelector('.del').addEventListener('click', () => deleteFunction(userId, list));
                submitBtn.removeEventListener('click', editExpenseDetails);
                submitBtn.addEventListener("click", handleSubmit);
                totalExpense();
            } else {
                console.log("error in edit");
            }
        } catch (err) {
            console.log(err);
        }
    });
}

async function load() {
    try {
        let res = await axios.get("https://crudcrud.com/api/eb227b30160946c18a684f968e5dd402/eTracker");
        let reload = res.data;
        for (let i of reload) {
            await displayData(i._id, i);
        }
        totalExpense();
    } catch (err) {
        console.error('Something error while reload', err);
    }
}

async function totalExpense() {
    try {
        let res = await axios.get("https://crudcrud.com/api/eb227b30160946c18a684f968e5dd402/eTracker");
        let total = res.data;
        const count = total.reduce((a, b) => a + parseFloat(b.price), 0);
        document.getElementById('total').innerHTML = `Total : ₹${count}`;
    } catch (err) {
        console.log('error in update total', err);
    }
}
