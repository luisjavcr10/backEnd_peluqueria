const express = require('express');
const router = express.Router();

const UserService = require('../services/users.service');
const service = new UserService();

router.get('/', async (req, res, next) => {
    try {
        const users = await service.find();
        res.status(200).json(users);
    } catch (error) {
        const httpError = new Error('Error al obtener los usuarios');
        httpError.status = 500;
        next(httpError);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await service.findById(id);
        res.status(200).json(user);
    } catch (error) {
        const httpError = new Error('Error al encontrar el usuario');
        httpError.status = 404;
        next(httpError);
    }
});

router.post('/', async (req, res) => {
    const body = req.body;
    try {
        const newUser = await service.create(body);
        res.json(newUser);
    } catch (error) {
        const httpError = new Error('Error al crear el usuario');
        httpError.status = 400;
        next(httpError);
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const updatedUser = await service.update(id, changes);
        res.json(updatedUser);
    } catch (error) {
        const httpError = new Error('Error al actualizar el usuario');
        httpError.status = 404;
        next(httpError);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await service.delete(id);
        res.json(result);
    } catch (error) {
        const httpError = new Error('Error al eliminar el usuario');
        httpError.status = 404;
        next(httpError);
    }
});

module.exports = router;