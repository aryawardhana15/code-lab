"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveProject = exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getAllProjects = exports.createProject = void 0;
const projects_service_1 = require("./projects.service");
const createProject = async (req, res, next) => {
    try {
        const customReq = req;
        const projectData = req.body;
        const student_id = customReq.user.id;
        const project = await (0, projects_service_1.createProjectService)(student_id, projectData);
        res.status(201).json(project);
    }
    catch (error) {
        next(error);
    }
};
exports.createProject = createProject;
const getAllProjects = async (req, res, next) => {
    try {
        const { published } = req.query;
        const projects = await (0, projects_service_1.getAllProjectsService)(published);
        res.status(200).json(projects);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllProjects = getAllProjects;
const getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await (0, projects_service_1.getProjectByIdService)(Number(id));
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    }
    catch (error) {
        next(error);
    }
};
exports.getProjectById = getProjectById;
const updateProject = async (req, res, next) => {
    try {
        const customReq = req;
        const { id } = req.params;
        const projectData = req.body;
        const user_id = customReq.user.id;
        const user_role = customReq.user.role;
        const updatedProject = await (0, projects_service_1.updateProjectService)(Number(id), user_id, user_role, projectData);
        res.status(200).json(updatedProject);
    }
    catch (error) {
        next(error);
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res, next) => {
    try {
        const customReq = req;
        const { id } = req.params;
        const user_id = customReq.user.id;
        const user_role = customReq.user.role;
        await (0, projects_service_1.deleteProjectService)(Number(id), user_id, user_role);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProject = deleteProject;
const approveProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { is_published } = req.body; // Expecting { is_published: true/false }
        const approvedProject = await (0, projects_service_1.approveProjectService)(Number(id), is_published);
        res.status(200).json(approvedProject);
    }
    catch (error) {
        next(error);
    }
};
exports.approveProject = approveProject;
