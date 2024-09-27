// import { Migration } from '../app'
// import { DataTypes } from 'sequelize'


// export const up: Migration = async ({ context: { queryInterface } }) => {
//     await queryInterface.createTable("product", {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         price: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//     })
//     await queryInterface.createTable("user", {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         bankAccountId: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//     })
//     await queryInterface.createTable("bankDetails", {
//         accountId: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true
//         },
//         cashBalance: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             defaultValue: 0
//         },
//         creditBalance: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             defaultValue: 0
//         }
//     })
// }
// export const down: Migration = async ({ context: { queryInterface } }) => {
//     await queryInterface.dropTable("product")
//     await queryInterface.dropTable("user")
//     await queryInterface.dropTable("bankDetails")

// }