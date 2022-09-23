const Contact = require('../models/contact')
const yup = require('yup')
const mongoose = require('mongoose')

class ContactController {

  async show(req, res) {
    const query = Contact.find().select('-_id -__v -createdAt -updatedAt')
    query instanceof mongoose.Query // true
    const Contacts = await query
    return res.status(200).json({ error: false, Contacts })
  }

  async showOne(req, res) {
    
    const id = req.params.id
  
    const query = Contact.findOne({ _id: id }).select(
      '-_id -__v -createdAt -updatedAt',
    )

    query instanceof mongoose.Query // true
    const contact = await query
    return res.status(200).json({ error: false, contact })
  }

  async store(req, res) {
    //todo: validação dos dados
    let schema = yup.object().shape({
      name: yup.string().required(),
      sex: yup.string().required(),
      age: yup.number().required(),
      phone: yup.string().required(),
      address: yup.string().required(),
      cep: yup.string().required(),
      city: yup.string().required(),
      number: yup.number().required(),
      speciality: yup.string().required()
    })

    !(await schema.isValid(req.body)) &&
      res.status(400).json({
        error: true,
        message: 'Invalid format data ',
      })

    // validação que verifica se o usuário existe

    let contactExist = await Contact.findOne({
      name: req.body.name,
    })

    if (contactExist) {
      res.status(400).json({
        error: true,
        message: 'Existing Contact! please create a non-existing Contact  ',
      })
    } else {
      // Desestruturação dos dados da requisição

      const {
        name,
        sex,
        age,
        phone,
        address,
        cep,
        city,
        number,
        speciality
      } = req.body

      const data = {
        name,
        sex,
        age,
        phone,
        address,
        cep,
        city,
        number,
        speciality
      }

      //Inserção de doutor no MongoDB

      Contact.create(data, (error) => {
        error
          ? res.status(400).json({
              error: true,
              message: 'Error when trying to enter a Contact in mongoDB  ',
            })
          : res.status(200).json({
              error: false,
              message: 'Successfully registered Contact ',
            })
      })

      Contact.updateOne({ _id: data.idContact }, data)
    }
  }
  async update(req, res) {
    const id_verify = req.params.id
    const {
      name,
      sex,
      age,
      phone,
      address,
      cep,
      city,
      number,
      speciality
    } = req.body

    const contact = {

      name,
      sex,
      age,
      phone,
      address,
      cep,
      city,
      number,
      speciality
    }

    //todo: validação dos dados
    let schema = yup.object().shape({
      name: yup.string().required(),
      sex: yup.string().required(),
      age: yup.number().required(),
      phone: yup.string().required(),
      address: yup.string().required(),
      cep: yup.string().required(),
      city: yup.string().required(),
      number: yup.number().required(),
      speciality: yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      res.status(400).json({
        error: true,
        message: 'Invalid format data ',
      })
    } else {
      try {
        const updatedContact = await Contact.updateOne({ _id: id_verify }, contact)

        if (updatedContact.matchedCount === 0) {
          res.status(422).json({ message: 'Doutor não encontrado!' })
          return
        }

        res.status(200).json({ contact: contact })
      } catch (err) {
        res.status(500).json({ message: `${err}` })
      }
    }
  }
  async delete(req,res) {
    try {
      const deleteContact = await Contact.deleteOne({ name: req.body.name })

      if (deleteContact.matchedCount === 0) {
        res.status(422).json({ message: 'Contato não encontrado!' })
        return
      }

      res.status(200).json({ contact: 'deletado com sucesso' })
    } catch (err) {
      res.status(500).json({ message: `${err}` })
    }
  }
}

module.exports = new ContactController()
