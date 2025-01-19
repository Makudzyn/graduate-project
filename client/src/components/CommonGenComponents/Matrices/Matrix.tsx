import { VariableSizeList } from 'react-window';
import { CSSProperties } from 'react';
import '../scrollbar.css';

interface MatrixProps {
  dataArray: (number | null)[][];
}
const Matrix = ({ dataArray }: MatrixProps) => {
  const itemSize = () => 28; // height of each line

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
      className={
        'scrollbar text-xl font-medium h-64 overflow-y-auto overflow-x-hidden text-center rounded-md ring-1 ring-inset ring-gray-300 scroll-smooth shadow-lg'
      }
      height={260} // List height
      itemCount={dataArray.length} // Total number of elements
      itemSize={itemSize} // Function that returns the height of each element
      width={400} // List width
    >
      {Row}
    </VariableSizeList>
  );
};

export default Matrix;
