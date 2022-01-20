const { body } = require ( 'express-validator' );

let validaciones = [
    body('mail').notEmpty().withMessage('Debes poner un mail'),
    body('password').notEmpty().withMessage('Debes poner una password')
]

module.exports = validaciones;