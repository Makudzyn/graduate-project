import { VariableSizeList } from 'react-window';
import { CSSProperties } from "react";
import "../scrollbar.css";

interface MatrixProps {
  dataArray: (number | null)[][];
}
const Matrix = ({ dataArray }: MatrixProps) => {
  const itemSize = () => 28; // высоту каждой строки

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => (
    <div style={style} className="flex items-center justify-center my-2">
      {dataArray[index].map((item, i) => (
        <span className="text-center px-0.5 w-5" key={i}>
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <VariableSizeList
      className={"scrollbar text-xl font-medium h-64 overflow-y-auto overflow-x-hidden text-center rounded-md ring-1 ring-inset ring-gray-300 scroll-smooth shadow-lg"}
      height={260} // Высота списка
      itemCount={dataArray.length} // Общее количество элементов
      itemSize={itemSize} // Функция, возвращающая высоту каждого элемента
      width={400} // Ширина списка
    >
      {Row}
    </VariableSizeList>
  );
};

export default Matrix;
