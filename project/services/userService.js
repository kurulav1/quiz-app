import { sql } from "../database/database.js";

const addUser = async(email,password) => {
    await sql`INSERT INTO users (email,password) VALUES (${email},${password})`;
}

const existingUsers = async(email) => {
    const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
    return rows;
}

const checkAdmin = async(user_id) => {
    const rows = await sql`SELECT * FROM users WHERE id = ${user_id} AND admin = TRUE`;
    return rows;
}

export {addUser, existingUsers, checkAdmin}