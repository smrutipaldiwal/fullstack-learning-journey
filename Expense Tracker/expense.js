const expenseForm = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");

// Load expenses on page load
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);

    if(!description || amount <= 0) {
        alert("Please enter valid expense details.");
        return;
    }

    const expense = {
        id: Date.now(),
        description: description,
        amount: amount
    };

    expenses.push(expense);
    saveExpenses();
    renderExpenses();
    descriptionInput.value = "";
    amountInput.value = "";

    console.log(expenses);
});

// Save after every change
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses() {
    expenseList.innerHTML = "";

    // "No Expenses Added Yet" msg
    if (expenses.length === 0) {
        expenseList.innerHTML = "<li class='empty-message'> No expenses added yet. </li>";
        totalAmount.textContent = 0;
        return;
    }

    // Display every expense added in new row
    expenses.forEach(expense => {
        const li = document.createElement("li");
    //toLocaleString() - Format Amounts Nicely
    li.innerHTML = `<span>${expense.description}</span>
                    <div>
                        <span>₹${expense.amount.toLocaleString()}</span>
                        <button onclick="deleteExpense(${expense.id})"> ❌ </button>
                    </div>`;
    expenseList.appendChild(li);
    });

    // Calculate total expenses
    const total = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);
    totalAmount.textContent = total.toLocaleString();
}

// Delete expenses
window.deleteExpense = function(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveExpenses();
    renderExpenses();
};
// Render saved expenses immediately
renderExpenses();