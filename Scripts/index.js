// Create the account object with all required properties and methods
const account = {
    accountName: "",
    balance: 1000,
    isLoggedIn: false,

    // Function to display the balance
    getBalance: function() {
        return `Your current balance is: $${this.balance.toFixed(2)}`;
    },

    // Function to deposit money
    deposit: function(amount) {
        // Use accountError to validate the deposit
        const error = this.accountError(amount, 'deposit');
        if (error) {
            return error;
        }

        this.balance += amount;
        updateDisplay();
        return `Successfully deposited $${amount.toFixed(2)}. New balance: $${this.balance.toFixed(2)}`;
    },

    // Function to withdraw money
    withdrawal: function(amount) {
        // Use accountError to validate the withdrawal
        const error = this.accountError(amount, 'withdrawal');
        if (error) {
            return error;
        }

        // Check if sufficient funds
        if (amount > this.balance) {
            return "Error: Insufficient funds for this withdrawal.";
        }

        this.balance -= amount;
        updateDisplay();
        return `Successfully withdrew $${amount.toFixed(2)}. New balance: $${this.balance.toFixed(2)}`;
    },

    // Function to display account holder name
    getAccountName: function() {
        return `Account Holder: ${this.accountName}`;
    },

    // Function to handle errors - validates input for deposits and withdrawals
    accountError: function(amount, operation) {
        // Check if amount is not a number
        if (isNaN(amount) || amount === null || amount === "") {
            return `Error: Please enter a valid number for ${operation}.`;
        }

        // Check if amount is negative or zero
        if (amount <= 0) {
            return `Error: ${operation} amount must be greater than zero.`;
        }

        // No error found
        return null;
    },

    // EXTRA: Function to exit the account
    exitAccount: function() {
        this.isLoggedIn = false;
        
        // Show exit message
        showMessage("Thank you for using our ATM. Logging out...", "info");
        
        // Hide ATM interface and show login screen after delay
        setTimeout(() => {
            document.getElementById('atmInterface').style.display = 'none';
            document.getElementById('loginScreen').style.display = 'block';
            
            // Clear the message box
            const messageBox = document.getElementById('messageBox');
            messageBox.classList.remove('show');
        }, 1500);

        return "Exiting account...";
    },

    // Function to login to the account
    login: function(name) {
        // Validate name input
        if (!name || name.trim() === "") {
            return false;
        }

        this.accountName = name.trim();
        this.isLoggedIn = true;
        return true;
    }
};

// Update the display with current account information
function updateDisplay() {
    document.getElementById('balance').textContent = `$${account.balance.toFixed(2)}`;
    document.getElementById('accountName').textContent = `Welcome, ${account.accountName}!`;
}

// Show message to user
function showMessage(message, type) {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.className = `message ${type} show`;
    
    // Hide message after 4 seconds
    setTimeout(() => {
        messageBox.classList.remove('show');
    }, 4000);
}

// Function to prompt user for account name and login
function enterBankAccount() {
    const name = prompt("Please enter your name to access your bank account:");
    
    if (account.login(name)) {
        // Successfully logged in
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('atmInterface').style.display = 'block';
        updateDisplay();
        showMessage(`Welcome back, ${account.accountName}! Your account has been accessed.`, "success");
    } else {
        // Failed to login
        alert("Invalid name. Please enter a valid name to access your account.");
    }
}

// ATM function - handles user interface and menu choices
function atm() {
    const message = parseFloat(
        prompt(
            "Select a choice:\n1.) See balance\n2.) Make a deposit\n3.) Make a withdrawal\n4.) Get account name\n5.) Exit"
        )
    );

    switch (message) {
        case 1:
            showMessage(account.getBalance(), "info");
            break;
        case 2:
            const depositAmount = parseFloat(prompt("Enter deposit amount:"));
            showMessage(account.deposit(depositAmount), 
                account.accountError(depositAmount, 'deposit') ? "error" : "success");
            break;
        case 3:
            const withdrawAmount = parseFloat(prompt("Enter withdrawal amount:"));
            const withdrawResult = account.withdrawal(withdrawAmount);
            showMessage(withdrawResult, 
                withdrawResult.includes("Error") ? "error" : "success");
            break;
        case 4:
            showMessage(account.getAccountName(), "info");
            break;
        case 5:
            showMessage(account.exitAccount(), "info");
            break;
        default:
            showMessage("Error: Invalid choice. Please select 1-5.", "error");
    }
}

// Handle button clicks (alternative to prompt-based interface)
function handleChoice(choice) {
    switch (choice) {
        case 1:
            showMessage(account.getBalance(), "info");
            break;
        case 2:
            const depositAmount = parseFloat(prompt("Enter deposit amount:"));
            showMessage(account.deposit(depositAmount), 
                account.accountError(depositAmount, 'deposit') ? "error" : "success");
            break;
        case 3:
            const withdrawAmount = parseFloat(prompt("Enter withdrawal amount:"));
            const withdrawResult = account.withdrawal(withdrawAmount);
            showMessage(withdrawResult, 
                withdrawResult.includes("Error") ? "error" : "success");
            break;
        case 4:
            showMessage(account.getAccountName(), "info");
            break;
        case 5:
            showMessage(account.exitAccount(), "info");
            break;
    }
}

// Initialize on page load - show login screen
window.onload = function() {
    document.getElementById('loginScreen').style.display = 'block';
    document.getElementById('atmInterface').style.display = 'none';
};