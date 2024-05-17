
document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');
    const expenseNameInput = document.getElementById('expenseName');
    const expenseAmountInput = document.getElementById('expenseAmount');
    const expenseList = document.getElementById('expenseList');
    const totalExpensesDisplay = document.getElementById('totalExpenses');

    let expenses = [];

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const expenseName = expenseNameInput.value;
        const expenseAmount = parseFloat(expenseAmountInput.value);

        if (expenseName && expenseAmount) {
            const expense = {
                name: expenseName,
                amount: expenseAmount
            };

            expenses.push(expense);
            addExpenseToList(expense);
            updateTotalExpenses();
            saveExpensesToLocalStorage();
            expenseNameInput.value = '';
            expenseAmountInput.value = '';
        }
    });

    function addExpenseToList(expense) {
        const listItem = document.createElement('div');
        listItem.classList.add('alert', 'alert-secondary', 'mb-2');
        listItem.textContent = `${expense.name} - $${expense.amount}`;
        expenseList.appendChild(listItem);
    }

    function updateTotalExpenses() {
        const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
        totalExpensesDisplay.textContent = total.toFixed(2);
    }

    function saveExpensesToLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function loadExpensesFromLocalStorage() {
        const storedExpenses = localStorage.getItem('expenses');
        if (storedExpenses) {
            expenses = JSON.parse(storedExpenses);
            expenses.forEach(addExpenseToList);
            updateTotalExpenses();
        }
    }

    loadExpensesFromLocalStorage();
});