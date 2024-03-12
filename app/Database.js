import mysql from "mysql";

export class Database {
    db;
    mydata;

    constructor({ host, database, password, user }) {
        this.db = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database,
        });
    }

    async getall({
        table,
        where = "",
        data = [],
        select = "*",
        fetch = '',
    }) {
        return new Promise((resolve, reject) => {
            var q = `SELECT ${select} FROM ${table} WHERE ${where} `;
            if (where.substring(0, 5).toUpperCase() === "LIMIT" || where.trim() === "") {
                q = `SELECT ${select} FROM ${table} ${where}`;
            }

            this.db.query(q, data, (err, result) => {
                if (err) reject(err); 
                else {
                    if (fetch === "single" || fetch === "s") {
                        if (result.length > 0) resolve(result[0]) 
                        else resolve(null);
                        
                    } else if (fetch === "length" || fetch === "l") resolve(result.length);
                     else resolve(result);
                }
            });
        });
    }
}
