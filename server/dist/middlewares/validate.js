"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => (req, res, next) => {
    try {
        if (schema instanceof zod_1.ZodArray) {
            schema.parse(req.body);
        }
        else if (schema instanceof zod_1.ZodObject) {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
        }
        else {
            // Fallback for other Zod schema types if needed, or throw an error
            schema.parse(req.body); // Assuming other schemas might parse the body directly
        }
        next();
    }
    catch (e) {
        return res.status(400).send(e.errors);
    }
};
exports.validate = validate;
