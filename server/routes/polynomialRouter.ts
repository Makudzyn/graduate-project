import { Router } from "express";
import {
  getAllPolynomials,
  addPolynomial,
  addManyPolynomials,
  performLinearComputation,
  editPolynomial,
  removePolynomial, performMatrixComputation,
} from "../controllers/polynomialController";
import authMiddleware from "../middleware/checkAuthAndRoleMiddleware";

const router = Router();

router.get("/", getAllPolynomials);
router.post("/add-one", authMiddleware(), addPolynomial);
router.post("/add-many", authMiddleware(), addManyPolynomials);
router.post("/compute-linear", performLinearComputation);
router.post("/compute-matrix", performMatrixComputation);
router.put("/", authMiddleware(), editPolynomial);
router.delete("/", authMiddleware(), removePolynomial);

export default router;
