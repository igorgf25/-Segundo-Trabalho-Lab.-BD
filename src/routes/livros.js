import express from 'express'
import { connectToDatabase } from '../utils/mongodb.js'
import { check, validationResult } from 'express-validator'

const router = express.Router()
const nomeCollection = 'livros'
const { db, ObjectId } = await connectToDatabase()

let date = new Date()

const validaLivro = [
   check('titulo', 'Titulo do livro é obrigatório').not().isEmpty(),
   check('descricao', 'Descrição do livro é obrigatório').not().isEmpty(),
   check('anoPublicacao', 'Ano de publicação do livro é obrigatório').not().isEmpty(),
   check('anoPublicacao', 'Ano de publicação deve ser um inteiro').isInt({max: date.getFullYear+1}),
   check('autor', 'Autor do livro é obrigatório').not().isEmpty(),
   check('preco', 'Preço do livro é obrigatório').not().isEmpty(),
   check('preco', 'Preço tem que ser do tipo float').isNumeric({min: 0.00}),
   check('genero', 'Genero do livro é obrigatório').not().isEmpty(),
]

//GET /livos/
//Retorna todos os livros
router.get("/", async (req, res) => {
   try {
      db.collection(nomeCollection).find({}).toArray((err, docs) => {
       if (err) {
         res.status(400).json(err)
       } else {
         res.status(200).json(docs) 
       }
     })
   } catch (err) {
     res.status(500).json({ "error": err.message })
   }
})

//GET /livros/:id
//Retorna o livro pelo id
router.get("/:id", async (req, res) => {
  try {
    db.collection(nomeCollection).find({ "_id": { $eq: ObjectId(req.params.id) } }).toArray((err, docs) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(200).json(docs)
      }
    })
  } catch (err) {
    res.status(500).json({ "error": err.message })
  }
})

//GET /livros/titulo/:titulo
//Retorna livros pelo titulo
router.get("/titulo/:titulo", async (req, res) => {
  try {
  db.collection(nomeCollection).find({ titulo: {$regex: req.params.titulo, $options: "i"} }).toArray((err, docs) => {
      if (err) {
        res.status(400).json(err) 
      } else {
        res.status(200).json(docs) 
      }
    })
  } catch (err) {
    res.status(500).json({ "error": err.message })
  }
})

//GET /livros/genero/:genero
//Retorna livros pelo genero
router.get("/genero/:genero", async (req, res) => {
   try {
   db.collection(nomeCollection).find({ genero: {$regex: req.params.genero} }).toArray((err, docs) => {
       if (err) {
         res.status(400).json(err) 
       } else {
         res.status(200).json(docs) 
       }
     })
   } catch (err) {
     res.status(500).json({ "error": err.message })
   }
})

//GET /livros/ano/:ano
//Retorna livros pelo ano de publicação
router.get("/ano/:ano", async (req, res) => {
  try {
    db.collection(nomeCollection).find({"anoPublicacao": Number(req.params.ano)}).toArray((err, docs) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(200).json(docs)
      }
    })
  } catch (err) {
    res.status(500).json({ "error": err.message })
  }
})

//GET /livros/maxpreco/:preco
//Retorna livros pelo ano de publicação
router.get("/maxpreco/:preco", async (req, res) => {
  try {
    db.collection(nomeCollection).find({"preco": {$lt: Number(req.params.preco)+0.01}}).toArray((err, docs) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(200).json(docs)
      }
    })
  } catch (err) {
    res.status(500).json({ "error": err.message })
  }
})

//GET /livros/autor/:autor
//Retorna livros pelo autor
router.get("/autor/:autor", async (req, res) => {
  try {
  db.collection(nomeCollection).find({ autor: {$regex: req.params.autor, $options: "i"} }).toArray((err, docs) => {
      if (err) {
        res.status(400).json(err) 
      } else {
        res.status(200).json(docs) 
      }
    })
  } catch (err) {
    res.status(500).json({ "error": err.message })
  }
})

//POST /livros/
//Adiciona um livro ao banco de dados
router.post('/', validaLivro, async (req, res) => {
   const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(({
      errors: errors.array()
    }))
  } else {
    await db.collection(nomeCollection)
      .insertOne(req.body)
      .then(result => res.status(201).send(result))
      .catch(err => res.status(400).json(err))
   }
})

//PUT /livros/
//Atualiza um livro
router.put('/', validaLivro, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(({
      errors: errors.array()
    }))
  } else {
    const livroInput = req.body
    await db.collection(nomeCollection)
      .updateOne({ "_id": { $eq: ObjectId(req.body._id) } }, {
        $set:
        {
          titulo: livroInput.titulo,
          descricao: livroInput.descricao,
          anoPublicacao: livroInput.anoPublicacao,
          autor: livroInput.autor,
          preco: livroInput.preco,
          genero: livroInput.genero,
        }
      },
        { returnNewDocument: true })
      .then(result => res.status(202).send(result))
      .catch(err => res.status(400).json(err))
  }
})

//DELETE /livros/:id
//Apaga um livro pelo id
router.delete('/:id', async (req, res) => {
  await db.collection(nomeCollection)
    .deleteOne({ "_id": { $eq: ObjectId(req.params.id) } })
    .then(result => res.status(202).send(result))
    .catch(err => res.status(400).json(err))
})

export default router
  

