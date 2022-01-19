const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where('id', id).first()
}

const create = (data) => {
  return db('cars').insert(data)
    .then(([id]) =>  {
      return getById(id)
    })
}

const getByVin = vin => {
  return db('cars').where('vin', vin).first()
}

module.exports = {
  getById,
  getAll,
  create,
  getByVin
}
