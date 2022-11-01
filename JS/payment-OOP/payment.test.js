import { User, Product } from './payment';


let car = new Product('Car', 12000)
let car2 = new Product('Car2', 10000)
let phone = new Product('Phone', 500)
let mohammad = new User('Mohammad')
let emad = new User('Emad')
emad.bankAccount.deposit(600, 'credit')

describe('Product', () => {
    it('Creats insnaces of the Product class', () => {
        expect(car).toEqual({ name: 'Car', price: 12000 })
        expect(car2).toEqual({ name: 'Car2', price: 10000 })
    })
    it("Reduces the product's price", () => {
        expect(car2.sale(0.1)).toEqual('The new price of Car2 is $9000');
    });
    it('Returns an error', () => {
        expect(car2.sale('0.1')).toEqual('Please enter a number!');
        expect(car2.sale(10)).toEqual('Please enter a number between 0 and 1');
    });
});

describe('User', () => {
    it('Creats insnaces of the User class', () => {
        expect(mohammad).toMatchObject({ name: 'Mohammad' })
        expect(emad).toMatchObject({ name: 'Emad' })
    })
    it('Returns the details of the user', () => {
        expect(mohammad.userInfo).toContain('Mohammad is the owner of the account with the id');
        expect(emad.userInfo).toContain('Emad is the owner of the account with the id');
    });
});

describe('Bank', () => {
    it('Deposits into the bank account', () => {
        expect(mohammad.bankAccount.deposit(50)).toEqual('Please enter the type of the account ("cash" or "credit")');
        expect(mohammad.bankAccount.deposit(50, 'cashhhh')).toEqual('Please enter a correct type of the account ("cash" or "credit")');

        expect(mohammad.bankAccount.deposit('50', 'cash')).toEqual('Please enter a number!');
        expect(mohammad.bankAccount.deposit(15000, 'cash')).toEqual('Successfull, $15000 has been added to your cash account, the current cash balance is $15000');

        expect(mohammad.bankAccount.deposit('50', 'credit')).toEqual('Please enter a number!');
        expect(mohammad.bankAccount.deposit(2000, 'credit')).toEqual('Successfull, $2000 has been added to your cash account, the current credit balance is $2000');
    });

    it('Returns the status of the bank account', () => {
        expect(mohammad.bankAccount.bankStatus()).toContain('has $15000 cash balance, and $2000 credit balance');
    });

    it('Withdraws from the bank account', () => {
        expect(mohammad.bankAccount.withdraw(50)).toEqual('Please enter the type of the account ("cash" or "credit")');
        expect(mohammad.bankAccount.withdraw(50, 'creditttttt')).toEqual('Please enter a correct type of the account ("cash" or "credit")');

        expect(mohammad.bankAccount.withdraw('50', 'cash')).toEqual('Please enter a number!');
        expect(mohammad.bankAccount.withdraw(50, 'cash')).toEqual('Successfull, $50 has been subtracted from your cash account, the current cash balance is $14950');
        expect(mohammad.bankAccount.withdraw(50000, 'cash')).toEqual("You can't widraw $50000, your current cash balance is $14950");

        expect(mohammad.bankAccount.withdraw('50', 'credit')).toEqual('Please enter a number!');
        expect(mohammad.bankAccount.withdraw(50, 'credit')).toEqual('Successfull, $50 has been subtracted from your credit account, the current credit balance is $1950');
        expect(mohammad.bankAccount.withdraw(50000, 'credit')).toEqual("You can't widraw $50000, your current credit balance is $1950");
    });

    it('Perchases a product', () => {
        expect(mohammad.bankAccount.purchase('car')).toEqual('Please enter the type of the account ("cash" or "credit")');

        expect(mohammad.bankAccount.purchase('car', 'cash')).toEqual("Product not found, Please enter the product's object!");
        expect(mohammad.bankAccount.purchase(car, 'cash')).toEqual('Payment succeded, you purchased a Car for $12000, and your cash balance now is $2950');
        expect(mohammad.bankAccount.purchase(car, 'cash')).toEqual('The cash balance is $2950, which is not sufficient to purchase Car, its price is $12000');

        expect(emad.bankAccount.purchase('phone', 'credit')).toEqual("Product not found, Please enter the product's object!");
        expect(emad.bankAccount.purchase(phone, 'credit')).toEqual('Payment succeded, you purchased a Phone for $500, and your credit balance now is $100');
        expect(emad.bankAccount.purchase(phone, 'credit')).toEqual('The credit balance is $100, which is not sufficient to purchase Phone, its price is $500');
    });
});
