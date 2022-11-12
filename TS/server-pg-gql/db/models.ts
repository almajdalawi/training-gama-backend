import { DataTypes } from 'sequelize';
import { db } from '../app';


export function dbCreateTables(): void {
    const ProductModel = db.define('product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    const UserModel = db.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bank_account_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    const BankDetailsModel = db.define('bank_details', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cash_balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        credit_balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });


    db.sync({ force: true }).then(() => {
        console.log('Database & tables created!');
    });
}