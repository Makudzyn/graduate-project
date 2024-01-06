import { Router } from "express";
import {
  additionAndMultiplicationComputation,
  addManyPolynomials,
  addPolynomial,
  editPolynomial,
  getAllPolynomials,
  hammingWeightBlocksComputation,
  linearComputation,
  matrixComputation,
  removePolynomial,
} from "../controllers/polynomialController";
import authMiddleware from "../middleware/checkAuthAndRoleMiddleware";

const router = Router();

router.get("/", getAllPolynomials);
router.post("/add-one", authMiddleware(), addPolynomial);
router.post("/add-many", authMiddleware(), addManyPolynomials);
router.post("/compute-linear", linearComputation);
router.post("/compute-matrix", matrixComputation);
router.post("/compute-sum-and-product", additionAndMultiplicationComputation);
router.post("/compute-hamming-weight-block", hammingWeightBlocksComputation);
router.put("/", authMiddleware(), editPolynomial);
router.delete("/", authMiddleware(), removePolynomial);

export default router;
