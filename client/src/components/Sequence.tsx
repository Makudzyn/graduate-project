interface SequenceProps {
  dataArray: number[];
}
const Sequence = ({ dataArray }: SequenceProps) => {
  return (
    <div className="mb-5 flex h-32 w-full flex-wrap overflow-y-auto overflow-x-hidden rounded-sm border border-gray-900 text-xl p-1.5 focus:border-t-gray-900">
      {dataArray.map((item, index) => (
        <div className="pl-1.5" key={index}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default Sequence;
