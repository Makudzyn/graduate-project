import { VariableSizeList } from 'react-window';
import { CSSProperties } from "react";
interface MatrixProps {
  dataArray: number[][];
}
const Matrix = ({ dataArray }: MatrixProps) => {
  const itemSize = () => 28; // Задайте желаемую высоту каждой строки

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => (
    <div style={style}>
      {dataArray[index].map((item, i) => (
        <span className="pr-1 last:pr-0" key={i}>
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <VariableSizeList
      className={"text-xl h-64 overflow-y-auto overflow-x-hidden text-center rounded-md border border-gray-900 scroll-smooth"}
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
