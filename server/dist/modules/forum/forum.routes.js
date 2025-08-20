"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forum_controller_1 = require("./forum.controller");
const validate_1 = require("../../middlewares/validate");
const forum_validation_1 = require("./forum.validation");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// Public routes (viewing posts and comments)
router.get('/courses/:courseId/posts', forum_controller_1.getForumPostsByCourse);
router.get('/posts/:postId', forum_controller_1.getForumPostById);
// Authenticated routes
router.post('/posts', auth_1.authRequired, (0, validate_1.validate)(forum_validation_1.createForumPostSchema), forum_controller_1.createForumPost);
router.patch('/posts/:postId', auth_1.authRequired, (0, validate_1.validate)(forum_validation_1.updateForumPostSchema), forum_controller_1.updateForumPost);
router.delete('/posts/:postId', auth_1.authRequired, forum_controller_1.deleteForumPost); // Admin/Mentor can delete any, user can delete their own
router.post('/posts/:postId/comments', auth_1.authRequired, (0, validate_1.validate)(forum_validation_1.createForumCommentSchema), forum_controller_1.createForumComment);
router.post('/posts/:postId/like', auth_1.authRequired, forum_controller_1.toggleForumPostLike);
exports.default = router;
