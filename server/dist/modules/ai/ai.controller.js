"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAIResponse = void 0;
const ai_service_1 = require("./ai.service");
const getAIResponse = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ message: 'Prompt is required' });
        }
        const response = await (0, ai_service_1.getAICompletion)(prompt);
        res.status(200).json({ response });
    }
    catch (error) {
        next(error);
    }
};
exports.getAIResponse = getAIResponse;
