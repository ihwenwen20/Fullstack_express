import {Sequelize} from "sequelize";

const db = new Sequelize('latihan_node_express_auth_backend', 'root', 'root', {
    host: "localhost",
    dialect: "mysql"
});

export default db;