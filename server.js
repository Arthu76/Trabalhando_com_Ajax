// aula --> xmlHttpRequest1
//módulo capaz de converter o body da requisição para vários formatos.
const bodyParser = require('body-parser')

//serve para otimizar a construção de aplicações web e APIs
const express = require('express')

//instanciar a função express (criando uma função para usar depois)
const app = express()

//Midware - função que será executada quando uma determinada requisição chegar
app.use(express.static('.'))// aqui pede para que dentro da pasta atual(.) sirva os arquivos estáticos

app.use(bodyParser.urlencoded({ extend: true }))// lê os dados e os transforma em objetos

app.use(bodyParser.json())// transforma o JSON em objeto, case venha um JSON dentro da pasta da requisição

app.get('/teste', (req, res) => res.send('ok'))


//Upload de arquivos - aula --> xmlHttpRequest2

//multer irá interpreta o formulario que veio o arquivo do upload
const multer = require('multer')

//diskStrorage serve para personalizar a pasta e os nomes dos arquivos
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './upload')
  },
  filename: function( req, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage }).single('arquivo')

app.post('/upload', (req, res) => {
  upload(req, res, err => {
    if(err) {
      return res.end('Ocorreu um erro')
    }

    res.end('Concluído com sucesso')
  })
})

// aula --> fetch 2
app.post('/formulario', (req, res) => {
  res.send({
    ...req.body,
    id: 1
  })
})

// Função para saber se o nº é par ou impar - aula --> axios 2
app.get('/parOuImpar', (req, res) => {
  const par = parseInt(req.query.numero) % 2 === 0
  res.send({
    resultado: par ? 'par' : 'impar'
  })
})



 
// Ligando Servidor
app.listen(8080, () => console.log('Executando...'))