// DO YOUR MAGIC
const router = require('express').Router()
const Cars = require('./cars-model')
const {
	checkCarId,
	checkCarPayload,
	checkVinNumberUnique,
	checkVinNumberValid
} = require('./cars-middleware')


router.get('/', async (req, res, next) => {
	await Cars.getAll(req.query)
		.then(cars => {
		res.status(200).json(cars)
		})
	.catch(next)
})
router.get('/:id', checkCarId ,(req, res) => {
	res.json(req.verified)
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
	await Cars.create(req.body)
		.then(newCar => {
		res.status(201).json(newCar)
		})
	.catch(next)
})
module.exports = router;