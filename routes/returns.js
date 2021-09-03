const express = require('express');
const Joi = require('joi');
const { Rental } = require('../models/rentals');
const { Movie } = require('../models/movies');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const router = express.Router();

router.post('/', [auth, validate(validateReturn)], async (req, res, next) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) return res.status(404).send('rental not found');

    if (rental.dateReturned) return res.status(400).send('rental already processed');

    rental.return();
    await rental.save();

    await Movie.updateOne({ _id: rental.movie.id }, {
        $inc: { numberInStock: 1 }
    });

    return res.send('request is valid');
});

function validateReturn(req) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });

    return schema.validate(req);
}

module.exports = router;