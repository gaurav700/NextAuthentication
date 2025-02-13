import db from "./db";

export function createUser(email, password){
    const res = db.prepare('INSERT INTO users (email, password) VALUES (?,?)').run(email, password);
    return res.lastInsertRowid;
}

export function getUserByEmail(email){
    const res = db.prepare('SELECT * from users WHERE email = ?').get(email);
    return res;
}


