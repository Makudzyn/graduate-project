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
import compression from "compression";


const compressMiddleware = compression();
const router = Router();

router.get("/get-polynomials", compressMiddleware, getAllPolynomials);
router.post("/add-one", authMiddleware(), addPolynomial);
router.post("/add-many", authMiddleware(), addManyPolynomials);
router.post("/compute-linear", compressMiddleware, linearComputation);
router.post("/compute-matrix", compressMiddleware, matrixComputation);
router.post("/compute-sum-and-product", compressMiddleware, additionAndMultiplicationComputation);
router.post("/compute-hamming-weight-block", compressMiddleware, hammingWeightBlocksComputation);
router.put("/", authMiddleware(), editPolynomial);
router.delete("/", authMiddleware(), removePolynomial);

export default router;
