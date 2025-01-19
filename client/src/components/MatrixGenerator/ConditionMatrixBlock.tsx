import { CSSProperties, useState } from 'react';
import { VariableSizeList } from 'react-window';
import ChevronIcon from '../../assets/svgs/chevron.svg?react';
import ChevronDoubleIcon from '../../assets/svgs/chevron-double.svg?react';

interface ConditionMatrixBlockProps {
  conditionMatrix: number[][];
  basisMatrix: number[][];
}

const ConditionMatrixBlock = ({
  conditionMatrix,
  basisMatrix,
}: ConditionMatrixBlockProps) => {
  const step = basisMatrix.length;
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

  const itemSize = () => 28;

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => (
    <div style={style} className="flex items-center justify-center my-2">
      {slicedMatrix[index]?.map((cell, cellIndex) => (
        <span className="text-center px-0.5 w-5" key={cellIndex}>
          {cell}
        </span>
      ))}
    </div>
  );

  return (
    <div className="flex items-center justify-evenly w-3/4">
      <ChevronDoubleIcon
        className="h-10 w-10 stroke-paragraph transition-all duration-300 rotate-90 cursor-pointer bg-transparent rounded-full shadow-md hover:shadow-purpleFirst hover:shadow-lg hover:stroke-purpleFirst"
        onClick={resetState}
      />

      <ChevronIcon
        className="h-10 w-10 stroke-paragraph transition-all duration-300 rotate-90 cursor-pointer bg-transparent rounded-full shadow-md hover:shadow-purpleFirst hover:shadow-lg hover:stroke-purpleFirst"
        onClick={goToPreviousState}
      />

      <VariableSizeList
        className="scrollbar text-xl font-medium h-64 overflow-y-auto overflow-x-hidden text-center rounded-md ring-1 ring-inset ring-gray-300 scroll-smooth shadow-lg"
        height={260}
        itemCount={slicedMatrix.length}
        itemSize={itemSize}
        width={400}
      >
        {Row}
      </VariableSizeList>

      <ChevronIcon
        className="h-10 w-10 stroke-paragraph transition-all duration-300 -rotate-90 cursor-pointer bg-transparent rounded-full shadow-md hover:shadow-purpleFirst hover:shadow-lg hover:stroke-purpleFirst"
        onClick={goToNextState}
      />

      <ChevronDoubleIcon
        className="h-10 w-10 stroke-paragraph transition-all duration-300 -rotate-90 cursor-pointer bg-transparent rounded-full shadow-md hover:shadow-purpleFirst hover:shadow-lg hover:stroke-purpleFirst"
        onClick={goToLastState}
      />
    </div>
  );
};

export default ConditionMatrixBlock;
