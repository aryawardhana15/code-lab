"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeSubmission = exports.getChallengeSubmissions = exports.submitChallenge = exports.deleteChallenge = exports.updateChallenge = exports.getChallengeById = exports.getAllChallenges = exports.createChallenge = void 0;
const challenges_service_1 = require("./challenges.service");
const createChallenge = async (req, res, next) => {
    try {
        const challengeData = req.body;
        const challenge = await (0, challenges_service_1.createChallengeService)(challengeData);
        res.status(201).json(challenge);
    }
    catch (error) {
        next(error);
    }
};
exports.createChallenge = createChallenge;
const getAllChallenges = async (req, res, next) => {
    try {
        const challenges = await (0, challenges_service_1.getAllChallengesService)();
        res.status(200).json(challenges);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllChallenges = getAllChallenges;
const getChallengeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const challenge = await (0, challenges_service_1.getChallengeByIdService)(Number(id));
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.status(200).json(challenge);
    }
    catch (error) {
        next(error);
    }
};
exports.getChallengeById = getChallengeById;
const updateChallenge = async (req, res, next) => {
    try {
        const { id } = req.params;
        const challengeData = req.body;
        const updatedChallenge = await (0, challenges_service_1.updateChallengeService)(Number(id), challengeData);
        res.status(200).json(updatedChallenge);
    }
    catch (error) {
        next(error);
    }
};
exports.updateChallenge = updateChallenge;
const deleteChallenge = async (req, res, next) => {
    try {
        const { id } = req.params;
        await (0, challenges_service_1.deleteChallengeService)(Number(id));
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteChallenge = deleteChallenge;
const submitChallenge = async (req, res, next) => {
    try {
        const customReq = req;
        const { challengeId } = req.params;
        const submissionData = req.body;
        const student_id = customReq.user.id;
        const submission = await (0, challenges_service_1.submitChallengeService)(Number(challengeId), student_id, submissionData);
        res.status(201).json(submission);
    }
    catch (error) {
        next(error);
    }
};
exports.submitChallenge = submitChallenge;
const getChallengeSubmissions = async (req, res, next) => {
    try {
        const { challengeId } = req.params;
        const submissions = await (0, challenges_service_1.getChallengeSubmissionsService)(Number(challengeId));
        res.status(200).json(submissions);
    }
    catch (error) {
        next(error);
    }
};
exports.getChallengeSubmissions = getChallengeSubmissions;
const gradeSubmission = async (req, res, next) => {
    try {
        const { submissionId } = req.params;
        const gradeData = req.body;
        const gradedSubmission = await (0, challenges_service_1.gradeSubmissionService)(Number(submissionId), gradeData);
        res.status(200).json(gradedSubmission);
    }
    catch (error) {
        next(error);
    }
};
exports.gradeSubmission = gradeSubmission;
