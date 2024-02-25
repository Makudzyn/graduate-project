import { VariableSizeList } from "react-window";
import { CSSProperties, useEffect, useRef, useState } from "react";

interface SequenceProps {
  dataArray: number[];
}

const Sequence = ({ dataArray }: SequenceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = containerRef.current?.offsetWidth || 0;
      setContainerWidth(width);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chunkArray = (arr: number[], size: number) => {
    const result: number[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };


  const itemSize = () => 28;

  const twoDimensionalArray = chunkArray(
    dataArray,
    containerWidth === 0 ? 1 : Math.floor(containerWidth / 17.35),
  );

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => (
    <div style={style}>
      {twoDimensionalArray[index]?.map((item, i) => (
        <span className="pl-1.5" key={i}>
          {item}
        </span>
      ))}
    </div>
  );



  return (
    <div ref={containerRef}>
      <VariableSizeList
        className={
          "mb-5 overflow-y-auto overflow-x-hidden rounded-sm border border-gray-900 text-xl scroll-smooth"
        }
        height={130} // Высота списка
        itemCount={dataArray.length} // Общее количество элементов
        itemSize={itemSize} // Функция, возвращающая высоту каждого элемента
        width={"100%"} // Ширина списка
      >
        {Row}
      </VariableSizeList>
    </div>
  );
};

export default Sequence;
