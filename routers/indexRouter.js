import express from "express";

const router = express.Router();
router.get("/", function (req, res, next) {
  res.send("how are you doing today?");
});
export default router;
