const express = require("express")
const server = express()

// Take database

const db = require("./database/db")

//configure a public folder

server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação

server.use(express.urlencoded({ extended: true }))

//utilizing template engine

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configure road for my application
//page home
// req = REQUIRE
// res = Answer
server.get("/", (req, res) => {

    return res.render("index.html", { title: "um titulo" })

})





server.get("/create-point", (req, res) => {



    return res.render("create-point.html")
})


server.get("/point-error", (req, res) => {
    console.log(req.query)
    
    return res.render("point-error.html")
})


server.post("/savepoint", (req, res) => {
    //console.log(req.body)

    //inserir dados no banco de dados
    const query = `
          INSERT INT places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
          ) VALUES (?,?,?,?,?,?,?)  
          `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
             console.log(err)
             return res.render("point-error.html")
        }

        console.log("Cadastro com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }
    db.run(query, values, afterInsertData)
   

    
})



server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        //pesquisa vazia

        return res.render("search-results.html", {total: 0})

    }

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length
        // mostrar pagina html com as linhas do banco de dados    
        return res.render("search-results.html", { places: rows, total: total})
    })

})

//turn on the server

server.listen(3000)