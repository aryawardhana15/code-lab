"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveTestimonial = exports.deleteTestimonial = exports.updateTestimonial = exports.getTestimonialById = exports.getAllTestimonials = exports.createTestimonial = void 0;
const testimonials_service_1 = require("./testimonials.service");
const createTestimonial = async (req, res, next) => {
    try {
        const customReq = req;
        const testimonialData = req.body;
        // If student_id is not provided in body, use authenticated user's ID
        if (!testimonialData.student_id && customReq.user) {
            testimonialData.student_id = customReq.user.id;
        }
        const testimonial = await (0, testimonials_service_1.createTestimonialService)(testimonialData);
        res.status(201).json(testimonial);
    }
    catch (error) {
        next(error);
    }
};
exports.createTestimonial = createTestimonial;
const getAllTestimonials = async (req, res, next) => {
    try {
        const { approved } = req.query;
        const testimonials = await (0, testimonials_service_1.getAllTestimonialsService)(approved);
        res.status(200).json(testimonials);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllTestimonials = getAllTestimonials;
const getTestimonialById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const testimonial = await (0, testimonials_service_1.getTestimonialByIdService)(Number(id));
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.status(200).json(testimonial);
    }
    catch (error) {
        next(error);
    }
};
exports.getTestimonialById = getTestimonialById;
const updateTestimonial = async (req, res, next) => {
    try {
        const { id } = req.params;
        const testimonialData = req.body;
        const updatedTestimonial = await (0, testimonials_service_1.updateTestimonialService)(Number(id), testimonialData);
        res.status(200).json(updatedTestimonial);
    }
    catch (error) {
        next(error);
    }
};
exports.updateTestimonial = updateTestimonial;
const deleteTestimonial = async (req, res, next) => {
    try {
        const { id } = req.params;
        await (0, testimonials_service_1.deleteTestimonialService)(Number(id));
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTestimonial = deleteTestimonial;
const approveTestimonial = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { is_approved } = req.body; // Expecting { is_approved: true/false }
        const approvedTestimonial = await (0, testimonials_service_1.approveTestimonialService)(Number(id), is_approved);
        res.status(200).json(approvedTestimonial);
    }
    catch (error) {
        next(error);
    }
};
exports.approveTestimonial = approveTestimonial;
