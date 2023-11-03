interface SequenceProps {
  dataArray: number[];
}
const Sequence = ({dataArray} : SequenceProps) => {
  return (
    <div
      className="p-1.5 text-xl h-32 w-[400px] overflow-y-auto overflow-x-hidden rounded-sm border border-gray-900 focus:border-t-gray-900"
    >
      {dataArray.map((item, index) =>
        <span className="pr-1 last:pr-0" key={index}>
          {item}
        </span>
      )}
    </div>
  );
};

export default Sequence;