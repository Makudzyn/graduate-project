import GenButton from "../CommonGenComponents/GenButton.tsx";
import Sequence from "../CommonGenComponents/Sequence.tsx";
import HammingWeight from "../CommonGenComponents/HammingWeight.tsx";
import CorrelationChart from "../Chart/Plotly/CorrelationChart.tsx";
import Header3 from "../PageComponents/Headers/Header3.tsx";

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
          <div className="mb-8 flex items-center justify-center p-2.5">
            <GenButton onClick={onClick}>
              Згенерувати послідовності суми та добутку
            </GenButton>
          </div>
          <div className="flex w-full flex-col my-4 mx-3">
            <Header3 align="left">Послідовність S (сум)</Header3>
            <Sequence dataArray={dataArray} />
            <HammingWeight hammingWeight={hammingWeight} />
          </div>
          <div className="flex w-full flex-col my-4 mx-3">
            <Header3 align="left">Послідовність P (добутків)</Header3>
            <Sequence dataArray={dataArray1} />
            <HammingWeight hammingWeight={hammingWeight1} />
          </div>
          <div className="flex justify-center items-center w-full h-full">
            <CorrelationChart data1={data1} data2={data2} />
          </div>
        </>
      )}
    </>
  );
};

export default SumAndProductBlock;
