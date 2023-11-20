import { useState } from "react";

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

  const slicedMatrix = conditionMatrix.slice(
    currentIndex,
    currentIndex + step,
  );

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

      <div className="p-1.5 text-xl h-64 w-[400px] overflow-y-auto overflow-x-hidden text-center rounded-sm border border-gray-900 focus:border-t-gray-900">
        {slicedMatrix.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <span className="pr-1 last:pr-0" key={cellIndex}>
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>

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
