import express from 'express';
import { ProdutoQuimico } from "../../../domain/Entities/ProdutoQuimico";
import {enumClasseRisco} from "../../../domain/enums/enumClasseRisco"
import { Historico } from '../../../domain/Entities/Historico';

const app = express()
const PORT = 3000


const produto1 = new ProdutoQuimico("Produto 1", "1", enumClasseRisco.CLASSE_1)
const produto2 = new ProdutoQuimico("Produto 2", "2", enumClasseRisco.CLASSE_4)

const list = [produto1, produto2]

// Método que retorna todos os produtos
app.get("/api/produto_quimico/get/", (req, res) => {
      res.json(list)
})

// Método que busca produtos pelo id
// A URL recebe um id no final ('/:id') e retorna o produto referente a essa id
app.get('/api/produto_quimico/:id', (req, res) => {
      const id = req.params.id
      list.forEach((produto => {
            if (produto.id === id) {
                  res.json(produto)
            }
      }))
})

// Método que registra um produto
// Servidor recebe um objeto pela URL e envia uma mensagem de sucesso
app.post('/api/produto_quimico/post/:data', (req, res) => {
    const data = req.body // Coletando os dados que foram enviados
    res.status(201).json({message: 'Success', data}) // Mensagem de sucesso, dizendo que o objeto foi registrado

    //* De preferência adicione validações para o objeto antes de registrar no banco de dados.
})

// Método que atualiza apenas a 'classe_risco' de um produto especifico | *WIP*
app.patch('/api/produto_quimico/:id/classe_risco/:data', (req, res) => {
      const id = req.body.data
      const data =  req.body.data
      let produto: ProdutoQuimico = {
            id: "",
            nome: "",
            descricao: "",
            codigoONU: "",
            classeRisco: enumClasseRisco.NENHUM,
            grupoCompatibilidade: "",
            statusAtivo: false,
            historicoAtualizacoes: new Historico()
      }

      list.forEach((param => {
            if (param.id === id) {
                  produto = param
            }
      }))

      produto.classeRisco = data

      res.json(produto)
})

// Método que atualiza todos os valores de um produto | *WIP*
app.put('/api/produto_quimico/:id', (req, res) => {})

// Mensagem no terminal local, usado em dev
app.listen(PORT, (err) => {
      if (err) console.log(err) // Caso ocorra um erro, retorne a mensagem de erro no console
      console.log(`O servidor está rodando na porta: ${PORT}`)
})