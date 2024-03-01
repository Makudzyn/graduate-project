import { VariableSizeList } from "react-window";
import { CSSProperties, useRef } from "react";

interface SequenceProps {
  dataArray: number[];
}

const Sequence = ({ dataArray }: SequenceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth =  containerRef.current?.offsetWidth;

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
    containerWidth === undefined ? 1 : Math.floor(containerWidth / 17.35),
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
          "mb-5 rounded-md border border-gray-900 text-xl scroll-smooth"
        }
        height={130}
        itemCount={twoDimensionalArray.length}
        itemSize={itemSize}
        width={"100%"}
      >
        {Row}
      </VariableSizeList>
    </div>
  );
};

export default Sequence;
