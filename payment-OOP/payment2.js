"use strict";

/**
 * A function to create user objects which contains name and userId (which is a unique id).
 * @param {String} name The user's name.
 */
function user(name) {
    let userId = (Math.floor(Math.random() * 10000)).toString()
    let bankAccount = new bank(0, 0)

    /**
     * A method to inqure about the user's informations.
     * @returns {String} A message of the User's information (the name and id).
     */
    function userInfo() {
        return ` ${name} is the owner of the account with the id ${userId}`
    }

    return {
        userInfo, name, userId, bankAccount
    }
}


/**
 * A function to create a new product's object that have a name and price.
 * @param {String} name The name of the product.
 * @param {Number} price The price of the product.
 */
function product(name, price) {

    /**
     * A methhod to make a sale on a product (update its price).
     * @param {Number} percentage The percentage of the sale as a float number between 0 and 1
     * @returns {String} The new price of the product.
     */
    function sale(percentage) {
        if (typeof percentage != 'number') return 'Please enter a number!'

        if (percentage <= 1 && percentage >= 0) {
            price = price - price * percentage
            return `The new price of ${name} is $${price}`
        }
        else return 'Please enter a number between 0 and 1'
    }

    return {
        sale, name, price
    }
}


/**
 * A function to create bank objects which contains the bank-account id and its balance.
 * @param {Number} cashBalance The intial cash balance of the bank account.
 * @param {Number} creditBalance The intial credit balance of the bank account.
 */
function bank(cashBalance, creditBalance) {
    let accountId = ((Math.floor(Math.random() * 10000)).toString()).toString()

    /**
     * A method to enquire about the balance (cash and credit) of the account.
     * @returns {String} A message of the bank account's id and balances.
     */
    function bankStatus() {
        return `The account ${accountId} has $${cashBalance} cash balance, and $${creditBalance} credit balance`
    }

    /**
     * A method to diposit money in the bank account(cash or credit).
     * @param {Number} amount The amount of money to be deposited in the bank acount.
     * @param {String} accountType The type of the account (cash or credit).
     * @returns {String} A message of the added amount and the new balance of the bank account
     */
    function deposit(amount, accountType) {
        if (typeof (amount) != 'number') return 'Please enter a number!'

        if (accountType == 'cash' || accountType == 'Cash') {
            cashBalance += amount
            return `Successfull, $${amount} has been added to your cash account, the current cash balance is $${cashBalance}`
        }
        else if (accountType == 'credit' || accountType == 'Credit') {
            creditBalance += amount
            return `Successfull, $${amount} has been added to your cash account, the current credit balance is $${creditBalance}`
        }
        else return 'Please enter the type of the account ("cash" or "credit")'
    }

    /**
     * A method to withdraw money from the bank account.
     * @param {Number} amount The amount of money to be withdrowed from the bank acount.
     * @param {String} accountType The type of the account (cash or credit).
     * @returns {String} A message of the subtracted amount and the new balance of the bank account
     */
    function withdraw(amount, accountType) {
        if (typeof (amount) != 'number') return 'Please enter a number!'

        if (accountType == 'cash' || accountType == 'Cash') {
            if (cashBalance >= amount) {
                cashBalance -= amount
                return `Successfull, $${amount} has been subtracted from your cash account, the current cash balance is $${cashBalance}`
            }
            else return `You can't widraw $${amount}, your current cash balance is $${cashBalance}`
        }
        else if (accountType == 'credit' || accountType == 'Credit') {
            if (creditBalance >= amount) {
                creditBalance -= amount
                return `Successfull, $${amount} has been subtracted from  your cash account, the current credit balance is $${creditBalance}`
            }
            else return `You can't widraw $${amount}, your current credit balance is $${creditBalance}`
        }
        else return 'Please enter the type of the account ("cash" or "credit")'
    }

    /**
     * A method to buy a product (to subtract the price of the product from the bank account).
     * @param {product} theProduct An object of the product which consist of product name and price.
     * @param {String} accountType The type of the account (cash or credit).
     * @returns A message of the product's name and price and the new balance of the bank account.
     */
    function buy(theProduct, accountType) {
        if (!(theProduct.hasOwnProperty('name') && theProduct.hasOwnProperty('price'))) {
            return "Product not found, Please enter the product's object!"
        }

        if (accountType == 'cash' || accountType == 'Cash') {
            if (cashBalance >= theProduct.price) {
                cashBalance = cashBalance - theProduct.price
                return `Payment succeded, you bought a ${theProduct.name} for $${theProduct.price}, and your cash balance now is $${cashBalance}`
            }
            else return `The cash balance is $${cashBalance}, which is not sufficient to buy ${theProduct.name}, its price is $${theProduct.price}`
        }
        else if (accountType == 'credit' || accountType == 'Credit') {
            if (creditBalance >= theProduct.price) {
                creditBalance = creditBalance - theProduct.price
                return `Payment succeded, you bought a ${theProduct.name} for $${theProduct.price}, and your cash balance now is $${creditBalance}`
            }
            else return `The credit balance is $${creditBalance}, which is not sufficient to buy ${theProduct.name}, its price is $${theProduct.price}`
        }
    }

    return {
        buy, withdraw, deposit, bankStatus, cashBalance, creditBalance, accountId
    }
}



// Products instances
let phone = new product('Phone', 500)
let laptop = new product('LapTop', 1000)
let car = new product('Car', 12000)
let car2 = new product('Car2', 10000)

console.log(car2.sale(10))  // Please enter a number between 0 and 1
console.log(car2.sale(0.1)) // The new price of Car2 is $9000

console.log(phone) // Product {name: 'Phone', price: 500}
console.log(laptop) // Product {name: 'LapTop', price: 1000}
console.log(car) // Product {name: 'Car', price: 12000}
console.log(car2) // Product {name: 'Car2', price: 9000}


// Users instances
let mohammad = new user('Mohammad')
let jehad = new user('Jehad')
let emad = new user('Emad')

console.log(mohammad) // User {userId: '1', name: 'Mohammad', bankAccount: Bank}
console.log(mohammad.userInfo()) //  Mohammad is the owner of the account with the id 1
console.log(jehad) // User {userId: '2', name: 'Jehad', bankAccount: Bank}
console.log(jehad.userInfo()) // Jehad is the owner of the account with the id 2
console.log(emad) // User {userId: '3', name: 'Emad', bankAccount: Bank}
console.log(emad.userInfo()) //  Emad is the owner of the account with the id 3


// deposits
console.log(mohammad.bankAccount.deposit('50', 'cash')) // Please enter a number!
console.log(mohammad.bankAccount.deposit(50)) // Please enter the type of the account ("cash" or "credit")
console.log(mohammad.bankAccount.deposit(15000, 'cash')) // Successfull, $15000 has been added to your cash account, the current cash balance is $15000
console.log(mohammad.bankAccount.deposit(2000, 'credit')) // Successfull, $2000 has been added to your cash account, the current credit balance is $2000
console.log(jehad.bankAccount.deposit(1500, 'cash')) // Successfull, $1500 has been added to your cash account, the current cash balance is $1500
console.log(jehad.bankAccount.deposit(4000, 'credit')) // Successfull, $4000 has been added to your cash account, the current credit balance is $4000
console.log(emad.bankAccount.deposit(400, 'cash')) // Successfull, $400 has been added to your cash account, the current cash balance is $400
console.log(emad.bankAccount.deposit(6000, 'credit')) // Successfull, $6000 has been added to your cash account, the current credit balance is $6000

console.log(mohammad.bankAccount.bankStatus()) // The account 1 has $15000 cash balance, and $2000 credit balance
console.log(jehad.bankAccount.bankStatus()) // The account 2 has $1500 cash balance, and $4000 credit balance
console.log(emad.bankAccount.bankStatus()) // The account 3 has $400 cash balance, and $6000 credit balance


// withdraw
console.log(mohammad.bankAccount.withdraw('50', 'cash')) // Please enter a number!
console.log(mohammad.bankAccount.withdraw(50)) // Please enter the type of the account ("cash" or "credit")
console.log(mohammad.bankAccount.withdraw(50, 'cash')) // Successfull, $50 has been subtracted from your cash account, the current cash balance is $14950


// buy 
console.log(mohammad.bankAccount.buy('car', 'cash')) //Product not found, Please enter the product's object!
console.log(mohammad.bankAccount.buy(car, 'cash')) // Payment succeded, you bought a Car for $12000, and your cash balance now is $2950
console.log(mohammad.bankAccount.buy(car, 'cash')) // The cash balance is $2950, which is not sufficient to buy Car, its price is $12000
console.log(emad.bankAccount.buy(car, 'cash')) // The cash balance is $400, which is not sufficient to buy Car, its price is $12000
