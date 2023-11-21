import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';
import { Polynomial } from '../models/models';
import { autocorrelation, convertPrs } from '../functions/computingFunctions';

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

async function performComputation(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const inputData = req.body;
    const convertedPrs = convertPrs(inputData);
    const result = autocorrelation(convertedPrs);
    return res.json(result);
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
  performComputation,
};
