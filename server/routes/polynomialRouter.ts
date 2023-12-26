import {Router} from "express";
import {
  addManyPolynomials,
  addPolynomial,
  editPolynomial,
  getAllPolynomials,
  linearComputation,
  matrixComputation,
  additionAndMultiplicationComputation,
  removePolynomial,
} from "../controllers/polynomialController";
import authMiddleware from "../middleware/checkAuthAndRoleMiddleware";

const router = Router();

router.get("/", getAllPolynomials);
router.post("/add-one", authMiddleware(), addPolynomial);
router.post("/add-many", authMiddleware(), addManyPolynomials);
router.post("/compute-linear", linearComputation);
router.post("/compute-matrix", matrixComputation);
router.post("/compute-sum-and-multiplication", additionAndMultiplicationComputation);
router.put("/", authMiddleware(), editPolynomial);
router.delete("/", authMiddleware(), removePolynomial);

export default router;
