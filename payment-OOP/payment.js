"use strict";

/**
 * A class to create user objects which contains name and userId (which is a unique id).
 * @param {String} name The user's name.
 */
export class User {
    static id = 1

    constructor(name) {
        this.userId = User.id.toString()
        this.name = name
        this.bankAccount = new Bank(0, 0)
        User.id++
    }

    /**
     * A method to inqure about the user's informations.
     * @returns {String} A message of the User's information (the name and id).
     */
    get userInfo() {
        return ` ${this.name} is the owner of the account with the id ${this.userId}`
    }
}


/**
 * A class to create a new product's object that have a name and price.
 * @param {String} name The name of the product.
 * @param {Number} price The price of the product.
 */
export class Product {
    constructor(name, price) {
        this.name = name
        this.price = price
    }

    /**
     * A methhod to make a sale on a product (update its price).
     * @param {Number} percentage The percentage of the sale as a float number between 0 and 1
     * @returns {String} The new price of the product.
     */
    sale(percentage) {
        if (typeof percentage != 'number') return 'Please enter a number!'

        if (percentage <= 1 && percentage >= 0) {
            this.price = this.price - this.price * percentage
            return `The new price of ${this.name} is $${this.price}`
        }
        else return 'Please enter a number between 0 and 1'
    }
}


/**
 * A class to create bank objects which contains the bank-account id and its balance.
 * @param {Number} cashBalance The intial cash balance of the bank account.
 * @param {Number} creditBalance The intial credit balance of the bank account.
 */
export class Bank {
    static id = 1

    constructor(cashBalance, creditBalance) {
        this.accountId = Bank.id.toString()
        this.cashBalance = cashBalance
        this.creditBalance = creditBalance
        Bank.id++
    }

    /**
     * A method to enquire about the balance (cash and credit) of the account.
     * @returns {String} A message of the bank account's id and balances.
     */
    bankStatus() {
        return `The account ${this.accountId} has $${this.cashBalance} cash balance, and $${this.creditBalance} credit balance`
    }

    /**
     * A method to diposit money in the bank account(cash or credit).
     * @param {Number} amount The amount of money to be deposited in the bank acount.
     * @param {String} accountType The type of the account (cash or credit).
     * @returns {String} A message of the added amount and the new balance of the bank account
     */
    deposit(amount, accountType) {
        if (typeof (amount) != 'number') return 'Please enter a number!'
        if (accountType == null) return 'Please enter the type of the account ("cash" or "credit")'

        if (accountType.toLowerCase() == 'cash') {
            this.cashBalance += amount
            return `Successfull, $${amount} has been added to your cash account, the current cash balance is $${this.cashBalance}`
        }
        else if (accountType.toLowerCase() == 'credit') {
            this.creditBalance += amount
            return `Successfull, $${amount} has been added to your cash account, the current credit balance is $${this.creditBalance}`
        }
        else return 'Please enter a correct type of the account ("cash" or "credit")'
    }

    /**
     * A method to withdraw money from the bank account.
     * @param {Number} amount The amount of money to be withdrowed from the bank acount.
     * @param {String} accountType The type of the account (cash or credit).
     * @returns {String} A message of the subtracted amount and the new balance of the bank account
     */
    withdraw(amount, accountType) {
        if (typeof (amount) != 'number') return 'Please enter a number!'
        if (accountType == null) return 'Please enter the type of the account ("cash" or "credit")'

        if (accountType.toLowerCase() == 'cash') {
            if (this.cashBalance >= amount) {
                this.cashBalance -= amount
                return `Successfull, $${amount} has been subtracted from your cash account, the current cash balance is $${this.cashBalance}`
            }
            else return `You can't widraw $${amount}, your current cash balance is $${this.cashBalance}`
        }
        else if (accountType.toLowerCase() == 'credit') {
            if (this.creditBalance >= amount) {
                this.creditBalance -= amount
                return `Successfull, $${amount} has been subtracted from your credit account, the current credit balance is $${this.creditBalance}`
            }
            else return `You can't widraw $${amount}, your current credit balance is $${this.creditBalance}`
        }
        else return 'Please enter a correct type of the account ("cash" or "credit")'
    }

    /**
     * A method to purchase a product (to subtract the price of the product from the bank account).
     * @param {Product} product An object of the product which consist of product name and price.
     * @param {String} accountType The type of the account (cash or credit).
     * @returns A message of the product's name and price and the new balance of the bank account.
     */
    purchase(product, accountType) {
        if (accountType == null) return 'Please enter the type of the account ("cash" or "credit")'
        if (!(product instanceof Product)) return "Product not found, Please enter the product's object!"

        if (accountType.toLowerCase() == 'cash') {
            if (this.cashBalance >= product.price) {
                this.cashBalance = this.cashBalance - product.price
                return `Payment succeded, you purchased a ${product.name} for $${product.price}, and your cash balance now is $${this.cashBalance}`
            }
            else return `The cash balance is $${this.cashBalance}, which is not sufficient to purchase ${product.name}, its price is $${product.price}`
        }
        else if (accountType.toLowerCase() == 'credit') {
            if (this.creditBalance >= product.price) {
                this.creditBalance = this.creditBalance - product.price
                return `Payment succeded, you purchased a ${product.name} for $${product.price}, and your credit balance now is $${this.creditBalance}`
            }
            else return `The credit balance is $${this.creditBalance}, which is not sufficient to purchase ${product.name}, its price is $${product.price}`
        }
    }
}



////////////////////////////////

// // Products instances
// let phone = new Product('Phone', 500)
// let laptop = new Product('LapTop', 1000)
// let car = new Product('Car', 12000)
// let car2 = new Product('Car2', 10000)

// console.log(car2.sale(10))  // Please enter a number between 0 and 1
// console.log(car2.sale(0.1)) // The new price of Car2 is $9000

// console.log(phone) // Product {name: 'Phone', price: 500}
// console.log(laptop) // Product {name: 'LapTop', price: 1000}
// console.log(car) // Product {name: 'Car', price: 12000}
// console.log(car2) // Product {name: 'Car2', price: 9000}


// // Users instances
// let mohammad = new User('Mohammad')
// let jehad = new User('Jehad')
// let emad = new User('Emad')

// console.log(mohammad) // User {userId: '1', name: 'Mohammad', bankAccount: Bank}
// console.log(mohammad.userInfo) //  Mohammad is the owner of the account with the id 1
// console.log(jehad) // User {userId: '2', name: 'Jehad', bankAccount: Bank}
// console.log(jehad.userInfo) // Jehad is the owner of the account with the id 2
// console.log(emad) // User {userId: '3', name: 'Emad', bankAccount: Bank}
// console.log(emad.userInfo) //  Emad is the owner of the account with the id 3


// // deposits
// console.log(mohammad.bankAccount.deposit('50', 'cash')) // Please enter a number!
// console.log(mohammad.bankAccount.deposit(50)) // Please enter the type of the account ("cash" or "credit")
// console.log(mohammad.bankAccount.deposit(15000, 'cash')) // Successfull, $15000 has been added to your cash account, the current cash balance is $15000
// console.log(mohammad.bankAccount.deposit(2000, 'credit')) // Successfull, $2000 has been added to your cash account, the current credit balance is $2000
// console.log(jehad.bankAccount.deposit(1500, 'cash')) // Successfull, $1500 has been added to your cash account, the current cash balance is $1500
// console.log(jehad.bankAccount.deposit(4000, 'credit')) // Successfull, $4000 has been added to your cash account, the current credit balance is $4000
// console.log(emad.bankAccount.deposit(400, 'cash')) // Successfull, $400 has been added to your cash account, the current cash balance is $400
// console.log(emad.bankAccount.deposit(6000, 'credit')) // Successfull, $6000 has been added to your cash account, the current credit balance is $6000

// console.log(mohammad.bankAccount.bankStatus()) // The account 1 has $15000 cash balance, and $2000 credit balance
// console.log(jehad.bankAccount.bankStatus()) // The account 2 has $1500 cash balance, and $4000 credit balance
// console.log(emad.bankAccount.bankStatus()) // The account 3 has $400 cash balance, and $6000 credit balance


// // withdraw
// console.log(mohammad.bankAccount.withdraw('50', 'cash')) // Please enter a number!
// console.log(mohammad.bankAccount.withdraw(50)) // Please enter the type of the account ("cash" or "credit")
// console.log(mohammad.bankAccount.withdraw(50, 'cash')) // Successfull, $50 has been subtracted from your cash account, the current cash balance is $14950


// // buy 
// console.log(mohammad.bankAccount.buy('car', 'cash')) //Product not found, Please enter the product's object!
// console.log(mohammad.bankAccount.buy(car, 'cash')) // Payment succeded, you bought a Car for $12000, and your cash balance now is $2950
// console.log(mohammad.bankAccount.buy(car, 'cash')) // The cash balance is $2950, which is not sufficient to buy Car, its price is $12000
// console.log(emad.bankAccount.buy(car, 'cash')) // The cash balance is $400, which is not sufficient to buy Car, its price is $12000
