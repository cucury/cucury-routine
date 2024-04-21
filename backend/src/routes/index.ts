import express  from "express"
import {
  CreateDiary,
  GetDiary,
  UpdateDiary
} from "../controllers/diaryController"

const router = express.Router()
router.post("/api/v1/diary", CreateDiary)
router.get("/api/v1/diary", GetDiary)
router.put("/api/v1/diary", UpdateDiary)

export default router