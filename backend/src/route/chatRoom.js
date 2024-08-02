import { Router } from "express";
import { startConversation,getChatRoom } from "../controller/chatRoom.js";
const router = Router();

router.route("/start-conversation").post(startConversation);
router.route("/get-chat-rooms").get(getChatRoom);
export default router