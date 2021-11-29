// const {nanoid} = require('nanoid');
// const auth = require('../auth');

const factura = require('.');

const TABLA = 'factura';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        console.log('listado get')
        return store.list(TABLA);
        
    }

    function get(id) {
        console.log('get por ids')
        return store.get(TABLA, id);

    }

    function getRemove(id) {
        console.log('delete por ids')
        return store.remove(TABLA, id);

    }
    
    async function upsert(body) {
        console.log('entra-upsert-controller')
        const factura = {
            cliente: body.cliente,
            carrito: body.carrito
        }
         console.log(body.cliente+ ' body')
        return store.upsert(TABLA, factura);
    }

  async function upDate(body) {
        const factura = {
            id: body.id,
            cliente: body.cliente,
            carrito: body.carrito
        }
        console.log('id-'+factura.id)
        return store.update(TABLA, factura, factura.id);
    }

    function follow(from, to) {
        console.log('2')
        return store.upsert(TABLA + '_follow', {
            carrito_from: from,
            carrito_to: to,
        });
    }

    async function following(factura) {
        console.log('1')
        const join = {}
        join[TABLA] = 'factura_to'; // { factura: 'factura_to' }
        const query = { factura_from: factura };
		
		return await store.query(TABLA + '_follow', query, join);
	}

    return {
        list,
        get,
        getRemove,
        upsert,
        upDate,
        follow,
        following,
    };
}