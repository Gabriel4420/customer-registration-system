const { Router } = require('express')
const LoginController = require('../controllers/LoginController')
const UserController = require('../controllers/UserController')
const ContactController = require('../controllers/ContactController')

const AuthMiddleware = require('../middlewares/AuthMiddleware')
const { default: axios } = require('axios')
const routes = new Router()

routes.post('/register_contacts', AuthMiddleware, ContactController.store)

routes.get('/contacts', AuthMiddleware, ContactController.show)
routes.get('/contacts/:id', AuthMiddleware, ContactController.showOne)

routes.delete('/delete_contact/:id', AuthMiddleware, ContactController.delete)

routes.patch('/update_contact/:id', AuthMiddleware, ContactController.update)

routes.post('/create/user', UserController.store)
routes.get('/hello', UserController.hello),
  routes.get('/users', AuthMiddleware, UserController.show)
routes.get('/user/:id', AuthMiddleware, UserController.showOne)

routes.post('/login', LoginController.index)

routes.get('/placeholder', async (req, res) => {

  const id = req.params.id
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users`)

  return res.json(data)
})

module.exports = routes
