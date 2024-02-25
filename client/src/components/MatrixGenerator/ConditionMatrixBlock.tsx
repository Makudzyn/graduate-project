import { CSSProperties, useState } from "react";
import { VariableSizeList } from "react-window";

interface ConditionMatrixBlockProps {
  conditionMatrix: number[][];
  periodLength: number;
}

const ConditionMatrixBlock = ({
  conditionMatrix,
  periodLength,
}: ConditionMatrixBlockProps) => {
  const step = Math.sqrt(periodLength + 1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slicedMatrix = conditionMatrix.slice(currentIndex, currentIndex + step);

  const resetState = () => {
    setCurrentIndex(0);
  };

  const goToPreviousState = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - step);
    }
  };

  const goToNextState = () => {
    if (currentIndex + step < conditionMatrix.length) {
      setCurrentIndex(currentIndex + step);
    }
  };

  const goToLastState = () => {
    const lastIndex = Math.max(0, conditionMatrix.length - step);
    setCurrentIndex(lastIndex);
  };

  const itemSize = () => 28; // Вы можете изменить эту высоту по своему усмотрению

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => (
    <div style={style}>
      {slicedMatrix[index]?.map((cell, cellIndex) => (
        <span className="pr-1 last:pr-0" key={cellIndex}>
          {cell}
        </span>
      ))}
    </div>
  );

  return (
    <div className="flex items-center justify-evenly w-3/4">
      <button
        className="px-3 py-2.5 border border-black w-24 h-12 rounded-md"
        onClick={resetState}
      >
        First
      </button>
      <button
        className="px-3 py-2.5 border border-black w-24 h-12 rounded-md"
        onClick={goToPreviousState}
      >
        Prev
      </button>

      <VariableSizeList
        className="text-xl р-64 overflow-y-auto overflow-x-hidden text-center rounded-md border border-gray-900 scroll-smooth"
        height={260} // Высота списка
        itemCount={slicedMatrix.length} // Общее количество строк
        itemSize={itemSize} // Функция, возвращающая высоту каждой строки
        width={400} // Ширина списка
      >
        {Row}
      </VariableSizeList>

      <button
        className="px-3 py-2.5 border border-black w-24 h-12 rounded-md"
        onClick={goToNextState}
      >
        Next
      </button>
      <button
        className="px-3 py-2.5 border border-black w-24 h-12 rounded-md"
        onClick={goToLastState}
      >
        Last
      </button>
    </div>
  );
};

export default ConditionMatrixBlock;
