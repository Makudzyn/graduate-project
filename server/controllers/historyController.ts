import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import {HistoryRecord} from "../models/models";

async function saveInHistory(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { historyId, userValues, formNumber } = req.body;
    const historyRecord = await HistoryRecord.create({
      historyId,
      userValues,
      formNumber,
    });
    return res.json(historyRecord);
  } catch (error: unknown) {
    // явно указываем тип для ошибки как unknown
    return next(ApiError.internal((error as Error).message)); // приведение типа к Error
  }
}

async function getHistoryList(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const history = await HistoryRecord.findAll();
    return res.json(history);
  } catch (error: unknown) {
    // явно указываем тип для ошибки как unknown
    return next(ApiError.internal((error as Error).message)); // приведение типа к Error
  }
}

async function removeHistoryRecord(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { id } = req.body;
    const historyRecord = await HistoryRecord.findOne({ where: { id } });
    if (!historyRecord) {
      return next(ApiError.notFound("History record not found"));
    }
    await historyRecord.destroy();
    return res.status(204).end();
  } catch (error: unknown) {
    // явно указываем тип для ошибки как unknown
    return next(ApiError.internal((error as Error).message)); // приведение типа к Error
  }
}

export { getHistoryList, saveInHistory, removeHistoryRecord };
