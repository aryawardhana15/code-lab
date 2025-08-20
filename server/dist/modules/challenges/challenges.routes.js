"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const challenges_controller_1 = require("./challenges.controller");
const validate_1 = require("../../middlewares/validate");
const challenges_validation_1 = require("./challenges.validation");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// Public routes
router.get('/', challenges_controller_1.getAllChallenges);
router.get('/:id', challenges_controller_1.getChallengeById);
// Authenticated routes (student submissions)
router.post('/:challengeId/submit', auth_1.authRequired, (0, validate_1.validate)(challenges_validation_1.submitChallengeSchema), challenges_controller_1.submitChallenge);
// Admin/Mentor routes
router.post('/', auth_1.authRequired, (0, auth_1.roleRequired)(['mentor', 'admin']), (0, validate_1.validate)(challenges_validation_1.createChallengeSchema), challenges_controller_1.createChallenge);
router.patch('/:id', auth_1.authRequired, (0, auth_1.roleRequired)(['mentor', 'admin']), (0, validate_1.validate)(challenges_validation_1.updateChallengeSchema), challenges_controller_1.updateChallenge);
router.delete('/:id', auth_1.authRequired, (0, auth_1.roleRequired)(['admin']), challenges_controller_1.deleteChallenge);
// Mentor/Admin for submissions
router.get('/:challengeId/submissions', auth_1.authRequired, (0, auth_1.roleRequired)(['mentor', 'admin']), challenges_controller_1.getChallengeSubmissions);
router.patch('/submissions/:submissionId/grade', auth_1.authRequired, (0, auth_1.roleRequired)(['mentor', 'admin']), (0, validate_1.validate)(challenges_validation_1.gradeSubmissionSchema), challenges_controller_1.gradeSubmission);
exports.default = router;
