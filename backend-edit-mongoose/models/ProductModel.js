import mongoose from "mongoose";

const Products = mongoose.Schema({
    name: String,
    category: String,
    seller: String,
    price: Number,
    image: { type: String },
});

export default mongoose.model('products', Products);

// const Products = db.define('product',{
//     uuid:{
//         type: DataTypes.STRING,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         validate:{
//             notEmpty: true
//         }
//     },
//     name:{
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate:{
//             notEmpty: true,
//             len: [3, 100]
//         }
//     },
//     price:{
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         validate:{
//             notEmpty: true
//         }
//     },
//     userId:{
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         validate:{
//             notEmpty: true
//         }
//     },
//     image: DataTypes.STRING,
//     url: DataTypes.STRING,
//     description: DataTypes.STRING,
// },{
//     freezeTableName: true
// });

// Users.hasMany(Products);
// Products.belongsTo(Users, {foreignKey: 'userId'});