import express from "express";
import authMiddleware from "../middleware/auth.js";
import {sentiment,addComment} from "../controllers/commentController.js";


const commentRouter = express.Router();

commentRouter.post("/comment", addComment);
commentRouter.get("/sentiment", sentiment);


export default commentRouter;
