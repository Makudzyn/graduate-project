import React, { useState } from "react";

interface ConditionMatrixBlockProps {
  conditionMatrix: number[][];
  periodLength: number;
}

const ConditionMatrixBlock: React.FC<ConditionMatrixBlockProps> = ({
  conditionMatrix,
  periodLength,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slicedMatrix = conditionMatrix.slice(
    currentIndex,
    currentIndex + periodLength,
  );

  const resetState = () => {
    setCurrentIndex(0);
  };

  const goToPreviousState = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - periodLength);
    }
  };

  const goToNextState = () => {
    if (currentIndex + periodLength < conditionMatrix.length) {
      setCurrentIndex(currentIndex + periodLength);
    }
  };

  const goToLastState = () => {
    const lastIndex = Math.max(0, conditionMatrix.length - periodLength);
    setCurrentIndex(lastIndex);
  };

  return (
    <div className="flex items-center justify-evenly w-3/4">
      <button className="px-3 py-2.5 border border-black w-24 h-12 rounded-md" onClick={resetState}>First</button>
      <button className="px-3 py-2.5 border border-black w-24 h-12 rounded-md" onClick={goToPreviousState}>Prev</button>

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

      <button className="px-3 py-2.5 border border-black w-24 h-12 rounded-md" onClick={goToNextState}>Next</button>
      <button className="px-3 py-2.5 border border-black w-24 h-12 rounded-md" onClick={goToLastState}>Last</button>
    </div>
  );
};

export default ConditionMatrixBlock;
