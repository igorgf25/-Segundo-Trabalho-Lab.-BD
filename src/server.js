import express from 'express'
import cors from 'cors'
const app = express();
const port = process.env.PORT || 4000

app.use(cors()) 
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 
app.disable('x-powered-by') 
import rotasLivros from './routes/livros.js'
app.use("/livros", rotasLivros)

app.get('/', (req, res) => {
  res.status(200).json({
      mensagem: 'API 100% funcional!',
      versao: '1.0.0'
  })
})

app.listen(port, function () {
  console.log(`Servidor rodando na porta ${port}`)
})

