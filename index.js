import express from 'express'

const router = express()
const port = 3000

router.use(express.json())

let carros = [
    { id: 1, modelo: 'Onix', marca: 'Chevrolet', preco: 85000 },
    { id: 2, modelo: 'HB20', marca: 'Hyundai', preco: 80000 }
]

router.get('/carros', (req, res) => {
    res.send(carros)
})

router.get('/carros/:id', (req, res) => {
    let id = Number(req.params.id)
    let indice = carros.findIndex((carro) => carro.id === id)

    if (indice === -1) {
        return res.status(404).send({ erro: 'Carro não encontrado.' })
    }

    res.send(carros[indice])
})

router.post('/carros', (req, res) => {
    let modelo = req.body.modelo
    let marca = req.body.marca
    let preco = Number(req.body.preco)

    if (!modelo || !marca || !preco) {
        return res.status(400).send({ erro: 'Informe modelo, marca e preço'})
    }

    let id = 1
    if (carros.length > 0) {
        id = carros[carros.length-1].id + 1
    }

    let carro = {id: id, marca: marca, preco: preco}
    carros.push(carro)

    res.status(201).send(carro)
})

router.put('/carros/:id', (req, res) => {
    let id = Number(req.params.id)
    let indice = carros.findIndex((carro) => carro.id === id)

    if (indice === -1) {
        return res.status(404).send({ erro: 'Carro não encontrado.' })
    }

    carros[indice].preco = Number(req.body.preco)

    if (!req.body.preco) {
        return res.status(400).send({ erro: 'Informe o novo preço'})
    }

    res.send(carros[indice])
})

router.delete('/carros/:id', (req, res) => {
    let id = Number(req.params.id)
    let indice = carros.findIndex((carro) => carro.id === id)

    if (indice === -1) {
        return res.status(404).send({ erro: 'Carro não encontrado' })
    }

    carros.splice(indice, 1)
    
    res.send({ mensagem: 'Carro vendido e removido do estoque' })
})

router.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})