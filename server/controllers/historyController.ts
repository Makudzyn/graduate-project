import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import {HistoryRecord} from "../models/models";

async function getHistoryList(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const history = await HistoryRecord.findAll();
    return res.json(history);
  } catch (error: unknown) {
    return next(ApiError.internal((error as Error).message));
  }
}
async function createHistoryRecord(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { userId, pageName, parameters } = req.body;
    const historyRecord = await HistoryRecord.create({userId, pageName, parameters });
    return res.json(historyRecord);
  } catch (error: unknown) {
    return next(ApiError.internal((error as Error).message));
  }
}
async function deleteHistoryRecord(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const id = Number(req.query.id);
    if (isNaN(id)) {
      return next(ApiError.badRequest("Invalid id parameter"));
    }
    const historyRecord = await HistoryRecord.findOne({ where: { id } });
    if (!historyRecord) {
      return next(ApiError.notFound("History record not found"));
    }
    await historyRecord.destroy();
    return res.status(200).end();
  } catch (error: unknown) {
    return next(ApiError.internal((error as Error).message));
  }
}


async function deleteAllHistoryRecords(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const userId = Number(req.query.userId);
    const pageName = req.query.pageName as string;
    if (isNaN(userId)) {
      return next(ApiError.badRequest("Invalid userId parameter"));
    }
    const historyRecords = await HistoryRecord.findAll({ where: { userId, pageName } });
    if (!historyRecords) {
      return next(ApiError.notFound("History record not found"));
    }
    historyRecords.map(async record => await record.destroy());
    return res.status(204).end();
  } catch (error: unknown) {
    return next(ApiError.internal((error as Error).message));
  }
}

export { getHistoryList, createHistoryRecord, deleteHistoryRecord, deleteAllHistoryRecords};
