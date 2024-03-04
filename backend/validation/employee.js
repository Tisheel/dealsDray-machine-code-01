import Joi from "joi"

export const loginValidation = Joi.object({
    f_userName: Joi.string().required(),
    f_Pwd: Joi.string().required()
})

export const createEmployeeValidation = Joi.object({
    f_Name: Joi.string().required().min(5).max(25),
    f_Email: Joi.string().email().required(),
    f_Mobile: Joi.string().regex(/^[6-9]\d{9}$/).required(),
    f_Designation: Joi.string().required(),
    f_gender: Joi.string().required(),
    f_Course: Joi.string().required()
})

export const updateEmployeeValidation = Joi.object({
    f_Name: Joi.string().min(5).max(25),
    f_Email: Joi.string().email(),
    f_Mobile: Joi.string().regex(/^[6-9]\d{9}$/),
    f_Designation: Joi.string(),
    f_gender: Joi.string(),
    f_Course: Joi.string()
})