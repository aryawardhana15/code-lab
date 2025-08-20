"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderMaterials = exports.deleteMaterial = exports.updateMaterial = exports.createMaterial = exports.getCourseMaterials = exports.deleteCourse = exports.updateCourse = exports.getCourseById = exports.getAllCourses = exports.createCourse = void 0;
const courses_service_1 = require("./courses.service");
const createCourse = async (req, res, next) => {
    try {
        const courseData = req.body;
        const course = await (0, courses_service_1.createCourseService)(courseData);
        res.status(201).json(course);
    }
    catch (error) {
        next(error);
    }
};
exports.createCourse = createCourse;
const getAllCourses = async (req, res, next) => {
    try {
        const { level, published } = req.query;
        const courses = await (0, courses_service_1.getAllCoursesService)(level, published);
        res.status(200).json(courses);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCourses = getAllCourses;
const getCourseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await (0, courses_service_1.getCourseByIdService)(Number(id));
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    }
    catch (error) {
        next(error);
    }
};
exports.getCourseById = getCourseById;
const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const courseData = req.body;
        const updatedCourse = await (0, courses_service_1.updateCourseService)(Number(id), courseData);
        res.status(200).json(updatedCourse);
    }
    catch (error) {
        next(error);
    }
};
exports.updateCourse = updateCourse;
const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        await (0, courses_service_1.deleteCourseService)(Number(id));
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCourse = deleteCourse;
const getCourseMaterials = async (req, res, next) => {
    try {
        const { id } = req.params;
        const materials = await (0, courses_service_1.getCourseMaterialsService)(Number(id));
        res.status(200).json(materials);
    }
    catch (error) {
        next(error);
    }
};
exports.getCourseMaterials = getCourseMaterials;
const createMaterial = async (req, res, next) => {
    try {
        const { id } = req.params; // courseId
        const materialData = req.body;
        const material = await (0, courses_service_1.createMaterialService)(Number(id), materialData);
        res.status(201).json(material);
    }
    catch (error) {
        next(error);
    }
};
exports.createMaterial = createMaterial;
const updateMaterial = async (req, res, next) => {
    try {
        const { courseId, materialId } = req.params;
        const materialData = req.body;
        const updatedMaterial = await (0, courses_service_1.updateMaterialService)(Number(courseId), Number(materialId), materialData);
        res.status(200).json(updatedMaterial);
    }
    catch (error) {
        next(error);
    }
};
exports.updateMaterial = updateMaterial;
const deleteMaterial = async (req, res, next) => {
    try {
        const { courseId, materialId } = req.params;
        await (0, courses_service_1.deleteMaterialService)(Number(courseId), Number(materialId));
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteMaterial = deleteMaterial;
const reorderMaterials = async (req, res, next) => {
    try {
        const { id } = req.params; // courseId
        const reorderData = req.body;
        await (0, courses_service_1.reorderMaterialsService)(Number(id), reorderData);
        res.status(200).json({ message: 'Materials reordered successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.reorderMaterials = reorderMaterials;
