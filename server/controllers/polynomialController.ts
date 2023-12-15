import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';
import { Polynomial } from '../models/models';
import {
  autocorrelation,
  convertPrs,
  createMatrixInitialArray, experimentalPeriodLengthCalc,
  generateStructureMatrixA, getPrsSequence, hammingWeightCalc, linearFeedbackShiftRegister, transformArrayToObjects
} from '../functions/computingFunctions';

async function addPolynomial(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const { name, degree, polynomial } = req.body;
    const poly = await Polynomial.create({ name, degree, polynomial });
    return res.json(poly);
  } catch (error: unknown) {
    // явно указываем тип для ошибки как unknown
    return next(ApiError.internal((error as Error).message)); // приведение типа к Error
  }
}

async function addManyPolynomials(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
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

async function getAllPolynomials(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const polynomials = await Polynomial.findAll();
    return res.json(polynomials);
  } catch (error: unknown) {
    // явно указываем тип для ошибки как unknown
    return next(ApiError.internal((error as Error).message)); // приведение типа к Error
  }
}

async function removePolynomial(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
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

async function editPolynomial(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  // Типизированный код редактирования полинома
}

async function performLinearComputation(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const {degreeA, polynomialArr, userValueArr, lengthByFormula} = req.body;

    const structureMatrix = generateStructureMatrixA(
      degreeA,
      createMatrixInitialArray(degreeA, polynomialArr),
    );

    const experimentalPeriodLength = experimentalPeriodLengthCalc(structureMatrix, degreeA);

    const conditionMatrix = linearFeedbackShiftRegister(
      lengthByFormula,
      userValueArr,
      structureMatrix,
    );

    const pseudorandomSequence = getPrsSequence(conditionMatrix);
    const hammingWeight = hammingWeightCalc(pseudorandomSequence);
    const convertedPrs = convertPrs(pseudorandomSequence);
    const correlation = autocorrelation(convertedPrs);
    const correlationObjectDots = transformArrayToObjects(correlation);

    return res.json({
      experimentalPeriodLength,
      structureMatrix,
      conditionMatrix,
      pseudorandomSequence,
      hammingWeight,
      correlationObjectDots
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
  performLinearComputation,
};
