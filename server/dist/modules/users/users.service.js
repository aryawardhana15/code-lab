"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getAllUsers = async () => {
    const [rows] = await db_1.default.execute('SELECT * FROM users');
    return rows;
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    const [rows] = await db_1.default.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] || null;
};
exports.getUserById = getUserById;
const updateUser = async (id, data) => {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);
    await db_1.default.execute(`UPDATE users SET ${fields} WHERE id = ?`, [...values, id]);
    const [rows] = await db_1.default.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    await db_1.default.execute('DELETE FROM users WHERE id = ?', [id]);
};
exports.deleteUser = deleteUser;
