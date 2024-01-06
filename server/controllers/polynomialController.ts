import { NextFunction, Request, Response } from "express";
import ApiError from "../error/apiError";
import { Polynomial } from "../models/models";
import {
  autocorrelation,
  convertPrs, countWeights,
  expandSequence,
  getPrsSequence, hammingWeightBlock,
  hammingWeightCalc,
  linearFeedbackShiftRegister,
  matrixShiftRegister,
  performAdditionAndMultiplication
} from "../functions/computingFunctions";

async function addPolynomial(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { name, degree, polynomial } = req.body;
    const poly = await Polynomial.create({ name, degree, polynomial });
    return res.json(poly);
  } catch (error: unknown) {
    // явно указываем тип для ошибки как unknown
    return next(ApiError.internal((error as Error).message)); // приведение типа к Error
  }
}

async function addManyPolynomials(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const polynomials = req.body;

    const createdPolynomials = [];

    for (const polynomialData of polynomials) {
      const { name, degree, polynomial } = polynomialData;
      const poly = await Polynomial.create({ name, degree, polynomial });
      createdPolynomials.push(poly);
    }

    return res.json(createdPolynomials);
  } catch (error: unknown) {
    // явно указываем тип для ошибки как unknown
    return next(ApiError.internal((error as Error).message)); // приведение типа к Error
  }
}

async function getAllPolynomials(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const polynomials = await Polynomial.findAll();
    return res.json(polynomials);
  } catch (error: unknown) {
    // явно указываем тип для ошибки как unknown
    return next(ApiError.internal((error as Error).message)); // приведение типа к Error
  }
}

async function removePolynomial(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { id } = req.body;
    const polynomial = await Polynomial.findOne({ where: { id } });

    if (!polynomial) {
      return next(ApiError.notFound("Polynomial not found"));
    }

    await polynomial.destroy();
    return res.status(204).end();
  } catch (error: unknown) {
    // явно указываем тип для ошибки как unknown
    return next(ApiError.internal((error as Error).message)); // приведение типа к Error
  }
}

async function editPolynomial(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  // Типизированный код редактирования полинома
}

async function linearComputation(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { structureMatrix, userValueArr, factualLength } = req.body;

    const conditionMatrix = linearFeedbackShiftRegister(
      factualLength,
      userValueArr,
      structureMatrix,
    );

    const pseudorandomSequence = getPrsSequence(conditionMatrix);
    const hammingWeight = hammingWeightCalc(pseudorandomSequence);
    const convertedPrs = convertPrs(pseudorandomSequence);
    const correlation = autocorrelation(convertedPrs);

    return res.json({
      conditionMatrix,
      pseudorandomSequence,
      hammingWeight,
      correlation,
    });
  } catch (error: unknown) {
    // явно указываем тип для ошибки как unknown
    return next(ApiError.internal((error as Error).message)); // приведение типа к Error
  }
}

async function matrixComputation(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const {
      structureMatrixA,
      structureMatrixB,
      basisMatrix,
      periodLengthS,
      indexI,
      indexJ,
    } = req.body;

    const { conditionMatrix, pseudorandomSequence } = matrixShiftRegister(
      structureMatrixA,
      structureMatrixB,
      basisMatrix,
      periodLengthS,
      indexI,
      indexJ,
    );

    const hammingWeight = hammingWeightCalc(pseudorandomSequence);
    const convertedPrs = convertPrs(pseudorandomSequence);
    const correlation = autocorrelation(convertedPrs);

    return res.json({
      conditionMatrix,
      pseudorandomSequence,
      hammingWeight,
      correlation,
    });
  } catch (error: unknown) {
    // явно указываем тип для ошибки как unknown
    return next(ApiError.internal((error as Error).message)); // приведение типа к Error
  }
}

async function additionAndMultiplicationComputation(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { pseudorandomSequenceA, pseudorandomSequenceB, periodLengthS } =
      req.body;

    const expandedSequenceA = expandSequence(
      pseudorandomSequenceA,
      periodLengthS,
    );
    const expandedSequenceB = expandSequence(
      pseudorandomSequenceB,
      periodLengthS,
    );

    const { sumSequence, productSequence } = performAdditionAndMultiplication(
      expandedSequenceA,
      expandedSequenceB,
      periodLengthS,
    );

    const hammingWeightSum = hammingWeightCalc(sumSequence);
    const hammingWeightProduct = hammingWeightCalc(productSequence);

    const convertedSumPrs = convertPrs(sumSequence);
    const convertedProductPrs = convertPrs(productSequence);

    const sumCorrelation = autocorrelation(convertedSumPrs);
    const productCorrelation = autocorrelation(convertedProductPrs);

    return res.json({
      sumSequence,
      productSequence,
      hammingWeightSum,
      hammingWeightProduct,
      sumCorrelation,
      productCorrelation,
    });
  } catch (error: unknown) {
    // явно указываем тип для ошибки как unknown
    return next(ApiError.internal((error as Error).message)); // приведение типа к Error
  }
}

async function hammingWeightBlocksComputation(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { linearSequence, matrixSequence, hammingBlockLength } = req.body;
    const linearWeightsArr = hammingWeightBlock(linearSequence, hammingBlockLength);
    const matrixWeightsArr = hammingWeightBlock(matrixSequence, hammingBlockLength);

    const countedLinearWeights = countWeights(linearWeightsArr);
    const countedMatrixWeights = countWeights(matrixWeightsArr);

    const linearWeights = Object.values(countedLinearWeights);
    const matrixWeights = Object.values(countedMatrixWeights);

    const linearKeys = Object.keys(countedLinearWeights);
    const matrixKeys = Object.keys(countedMatrixWeights);

    const combinedKeys = [...linearKeys, ...matrixKeys];
    const uniqueKeysSet = new Set(combinedKeys);
    const sharedWeights = [...uniqueKeysSet].map(Number).sort((a, b) => a - b);
    // const combinedKeys = linearKeys.concat(matrixKeys);
    // const sharedWeights = combinedKeys.filter((value, index, self) => self.indexOf(value) === index);

    return res.json({
      linearWeights,
      matrixWeights,
      sharedWeights
    });
  } catch (error: unknown) {
    // явно указываем тип для ошибки как unknown
    return next(ApiError.internal((error as Error).message)); // приведение типа к Error
  }
}

export {
  addPolynomial,
  addManyPolynomials,
  getAllPolynomials,
  removePolynomial,
  editPolynomial,
  linearComputation,
  matrixComputation,
  additionAndMultiplicationComputation,
  hammingWeightBlocksComputation
};
