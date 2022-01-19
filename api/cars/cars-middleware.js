const Cars = require('./cars-model')
const vinValidator = require('vin-validator');


const checkCarId = (req, res, next) => {
  const { id } = req.params;
  Cars.getById(id).then(car => {
    if (car) {
      req.verified = car
      next()
    } else {
      next({status: 404, message: `car with id ${id} is not found`})
    }
  })
}

const checkCarPayload = (req, res, next) => {
  
  if (!req.body.vin) {
    res.status(400).json({ message: "vin is missing"})
  }  else if (!req.body.make) {
    res.status(400).json({ message: "make is missing"})
  }  else if (!req.body.model) {
    res.status(400).json({ message: "model is missing"})
  }  else if (!req.body.mileage) {
    res.status(400).json({ message: "mileage is missing"})
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body
  const validated = vinValidator.validate(vin)
  if (validated) {
    next()
  } else {
    res.status(400).json({message: `vin ${vin} is invalid`})
  }
}

const checkVinNumberUnique = (req, res, next) => {
  const { vin } = req.body
  Cars.checkVin(vin)
    .then(car => {
      if (car) {
      res.status(400).json({message: `vin ${vin} already exists`})
      } else {
        next()
    }
    })
  .catch(next)
}
module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}

