import db from "./db";

export function createUser(email, password){
    const res = db.prepare('INSERT INTO users (email, password) VALUES (?,?)').run(email, password);
    return res.lastInsertRowid;
}


