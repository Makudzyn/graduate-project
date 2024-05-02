import GenButton from "../CommonGenComponents/GenButton.tsx";
import Sequence from "../CommonGenComponents/Sequence.tsx";
import HammingWeight from "../CommonGenComponents/HammingWeight.tsx";
import CorrelationChart from "../Chart/Plotly/CorrelationChart.tsx";

interface SumAndProductBlockProps {
  conditionS: number;
  onClick: () => void;
  dataArray: number[];
  hammingWeight: number;
  dataArray1: number[];
  hammingWeight1: number;
  data1: number[];
  data2: number[];
}

const SumAndProductBlock = ({
  conditionS,
  onClick,
  dataArray,
  hammingWeight,
  dataArray1,
  hammingWeight1,
  data1,
  data2,
}: SumAndProductBlockProps) => {
  return (
    <>
      {conditionS === 1 && (
        <>
          <div className="flex justify-center items-center p-2.5 my-5">
            <GenButton onClick={onClick}>
              Згенерувати послідовності суми та добутку
            </GenButton>
          </div>

          <label>Послідовність S (сум)</label>
          <Sequence dataArray={dataArray} />
          <HammingWeight hammingWeight={hammingWeight} />

          <label>Послідовність P (добуток)</label>
          <Sequence dataArray={dataArray1} />
          <HammingWeight hammingWeight={hammingWeight1} />

          <div className="flex justify-center items-center w-full h-full">
            <CorrelationChart data1={data1} data2={data2} />
          </div>
        </>
      )}
    </>
  );
};

export default SumAndProductBlock;
