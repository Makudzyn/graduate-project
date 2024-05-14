import { VariableSizeGrid } from "react-window";
import { CSSProperties, useRef } from "react";
import "./scrollbar.css";

interface SequenceProps {
  dataArray: number[];
}

const Sequence = ({ dataArray }: SequenceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth =  containerRef.current?.offsetWidth;

  const itemSize = () => 26;
  const columnCount = containerWidth
    ? Math.floor(containerWidth / 19)
    : 1;
  const rowCount = Math.ceil(dataArray.length / columnCount);

  const Row = ({ rowIndex, columnIndex, style }: { rowIndex: number; columnIndex: number; style: CSSProperties }) => (
    <span style={style} className="px-1 mt-2 mx-1.5 text-center">
      {dataArray[rowIndex * columnCount + columnIndex]}
    </span>
  );

  return (
    <div ref={containerRef}>
      <VariableSizeGrid
        className="scrollbar font-medium mb-5 rounded-md ring-1 ring-inset ring-gray-300 shadow-lg text-xl scroll-smooth"
        columnCount={columnCount}
        rowCount={rowCount}
        columnWidth={() => 18.75} // Ширина столбца (в пикселях)
        rowHeight={itemSize} // Функция для определения высоты строки
        width={containerWidth === undefined ? 1 : containerWidth}
        height={92}
      >
        {Row}
      </VariableSizeGrid>
    </div>
  );
};

export default Sequence;
