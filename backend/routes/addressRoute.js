import express from 'express';
import { getUserAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } from '../controllers/addressController.js';
import authUser from '../middleware/auth.js';

const addressRouter = express.Router();

// All routes require authentication
addressRouter.post('/get', authUser, getUserAddresses);
addressRouter.post('/add', authUser, addAddress);
addressRouter.post('/update', authUser, updateAddress);
addressRouter.post('/delete', authUser, deleteAddress);
addressRouter.post('/set-default', authUser, setDefaultAddress);

export default addressRouter;


