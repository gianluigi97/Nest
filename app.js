import express from 'express'
import Database from './database.js'
import path from 'path'
import { Connection } from 'pg'

const db = new Database()
const app = express()

app.use(express.static(path.join(process.cwd(), 'public')))
app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'views'))


app.get('/users', async (req, res) => {
    try {
        const users = await db.getUser() 
        res.render('index', { users })
    } catch (err) {
        res.status(500).send("Errore server")
    }
}) 

app.get('/activities', async (req, res) => {
    try {
        const acts = await db.getActivities()
        res.render('index', { acts })
    } catch (err) {
        res.status(500).send("Errore Server")
    }
})




const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server in ascolto su http://localhost:${PORT}`))

