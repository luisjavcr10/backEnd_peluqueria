const express = require('express');
const router = express.Router();
const SalesService = require('../services/sales.service');
const service = new SalesService();
const validatorHandler = require('./../middlewares/validator.handler');
const { createSalesSchema, getSalesSchema }= require('./../schemas/sales.schema');
const queryPaginatorSchema = require('./../schemas/paginator.schema');

router.get('/', 
    validatorHandler(queryPaginatorSchema,'query'),
    async(req,res, next)=>{
    try {
        const sales = await service.find(req.query);
        res.status(200).json({
            message: 'Ventas obtenidas exitosamente',
            sales
        });
    } catch (error) {
        const httpError = new Error('Error al obtener los ventas');
        httpError.status = 500;
        next(httpError)
    }
})

router.get('/:id',
    validatorHandler(getSalesSchema,'params'),
    async (req, res, next) =>{
    try {
        const {id} = req.params;
        const sale = await service.findById(id);
        res.status(200).json({
            message : 'Venta obtenida exitosamente',
            sale
        })
    } catch (error) {
        const httpError = new Error('Error al encontrar la venta');
        httpError.status = 404;
        next(httpError);
    }
});

router.post('/', 
    validatorHandler(createSalesSchema, 'body'),
    async(req,res)=>{
    try {
        const {saleData, saleDetailsData} = req.body;
        const newSale = await service.createSalesWithDetails(saleData,saleDetailsData);
        res.status(201).json({
            message: 'Venta registrada exitosamente',
            sale: newSale
        })
    } catch (error) {
        const httpError = new Error('Error al registrar la venta');
        httpError.status = 400;
        next(httpError);
    }
});

module.exports = router;