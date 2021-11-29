const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');
const factura = require('./index');

const router = express.Router();

// Routes
router.get('/', list);
// router.post('/follow/:id', secure('follow'), follow);
// router.get('/:id/following', following);
router.get('/:id', get);
router.delete('/:id', getRemove);
router.post('/', upsert);
router.put('/', update);
// router.put('/', secure('update'), upsert);

// Internal functions
function list(req, res, next) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
}

function get(req, res, next) {
    console.log('entra-get')
    Controller.get(req.params.id)
        .then((factura) => {
            response.success(req, res, factura, 200);
        })
        .catch(next);
}

function getRemove(req, res, next) {
    console.log('entra-REMOVE')
    Controller.getRemove(req.params.id)
        .then((factura) => {
            response.success(req, res, factura, 200);
        })
        .catch(next);
}

function update(req, res, next) {
    console.log('entra net- upFactura')
    Controller.upDate(req.body)
        .then((factura) => {
            response.success(req, res, factura, 201);
        })
        .catch(next);
}

function upsert(req, res, next) {
    console.log('entra upsert-network')
    Controller.upsert(req.body)
        .then((factura) => {
            response.success(req, res, factura, 201);
        })
        .catch(next);
}

function follow(req, res, next) {
    Controller.follow(req.factura.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

function following(req, res, next) {
	return Controller.following(req.params.id)
		.then( (data) => {
			return response.success(req, res, data, 200);
		})
		.catch(next);
}

module.exports = router;