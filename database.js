import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config({ path: 'Nest.env' })

const { Pool } = pkg

class Database {

    constructor(){
        
        this.user = process.env.user
        this.password=process.env.password
        this.host=process.env.host
        this.port=process.env.port 
        this.dbname=process.env.dbname
        this.pool=null
    }

    connection() {

        if (this.pool) return this.pool

        
        this.pool = new Pool ({
            user: this.user,
            password: this.password,
            host: this.host,
            port: this.port,
            database: this.dbname,
            ssl: {
                rejectUnauthorized: false
            }
        })

        return this.pool
    }

    async getUser() {
        const pool = this.connection()

        try {
            const res = await pool.query("SELECT * FROM utenti")
            return res.rows
        } catch (err) {
            console.error("Query error: ", err)
            throw err
        }
    }

    async getActivities() {
        const pool = this.connection()

        try {
            const res = await pool.query("SELECT * FROM attivita")
            return res.rows
        } catch (err) {
            console.error("Query error: ", err)
            throw err
        }
    }
}

export default Database


// const db = new Database()
// const acts = await db.getActivities()


// console.log(acts)
