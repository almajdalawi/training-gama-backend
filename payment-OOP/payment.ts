/**
 * A class to create user objects which contains name and userId (which is a unique id).
 * @param {String} name The user's name.
 */
export class User {
    static id: number = 1
    userId: string
    name: string
    bankAccount: Bank

    constructor(name: string) {
        this.userId = User.id.toString()
        this.name = name
        this.bankAccount = new Bank(0, 0)
        User.id++
    }

    /**
     * A method to inqure about the user's informations.
     * @returns {String} A message of the User's information (the name and id).
     */
    get userInfo(): string {
        return ` ${this.name} is the owner of the account with the id ${this.userId}`
    }
}


/**
 * A class to create a new product's object that have a name and price.
 * @param {String} name The name of the product.
 * @param {Number} price The price of the product.
 */
export class Product {
    name: string
    price: number

    constructor(name: string, price: number) {
        this.name = name
        this.price = price
    }

    /**
     * A methhod to make a sale on a product (update its price).
     * @param {Number} percentage The percentage of the sale as a float number between 0 and 1
     * @returns {String} The new price of the product.
     */
    sale(percentage: number): string {
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
    accountId: string
    cashBalance: number
    creditBalance: number

    constructor(cashBalance: number, creditBalance: number) {
        this.accountId = Bank.id.toString()
        this.cashBalance = cashBalance
        this.creditBalance = creditBalance
        Bank.id++
    }

    /**
     * A method to enquire about the balance (cash and credit) of the account.
     * @returns {String} A message of the bank account's id and balances.
     */
    bankStatus(): string {
        return `The account ${this.accountId} has $${this.cashBalance} cash balance, and $${this.creditBalance} credit balance`
    }

    /**
     * A method to diposit money in the bank account(cash or credit).
     * @param {Number} amount The amount of money to be deposited in the bank acount.
     * @param {String} accountType The type of the account (cash or credit).
     * @returns {String} A message of the added amount and the new balance of the bank account
     */
    deposit(amount: number, accountType: string): string {
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
    withdraw(amount: number, accountType: string): string {
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
     * @returns {string} A message of the product's name and price and the new balance of the bank account.
     */
    purchase(product: Product, accountType: string): string {
        if (accountType === null) return 'Please enter the type of the account ("cash" or "credit")'
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
        else return 'Please enter the type of the account ("cash" or "credit")'
    }
}
