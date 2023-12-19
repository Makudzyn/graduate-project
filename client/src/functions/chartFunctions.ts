export function correlationNameAndType(corrValue: number) {
  let correlationType = "Пряма залежність";
  let correlationName = "";

  if (corrValue < 0) {
    correlationType = "Обернена залежність";
  }

  if (corrValue === 0) {
    correlationName = "Кореляція відсутня";
  } else if (corrValue < 0.1) {
    correlationName = "Кореляція майже відсутня";
  } else if (corrValue < 0.3) {
    correlationName = "Слабка кореляція";
  } else if (corrValue < 0.5) {
    correlationName = "Помірна кореляція";
  } else if (corrValue < 0.7) {
    correlationName = "Помітна кореляція";
  } else if (corrValue < 0.9) {
    correlationName = "Сильна кореляція";
  } else if (corrValue < 0.99) {
    correlationName = "Дуже сильна кореляція";
  } else if (corrValue < 1) {
    correlationName = "Майже функціональна кореляція";
  } else {
    correlationName = "Функціональна кореляція";
  }

  return { correlationName, correlationType };
}

export function formatTicks(dataLength: number) {
  let ticksCount;
  if (dataLength <= 64) {
    ticksCount = dataLength;
  } else if (dataLength <= 256) {
    ticksCount = dataLength / 2;
  } else if (dataLength <= 512) {
    ticksCount = dataLength / 3;
  } else if (dataLength <= 1024) {
    ticksCount = dataLength / 4;
  } else if (dataLength <= 2048) {
    ticksCount = dataLength / 5;
  } else if (dataLength <= 4096) {
    ticksCount = dataLength / 6;
  } else ticksCount = dataLength / 10;

  return Math.round(ticksCount);
}


