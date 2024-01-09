interface MatrixProps {
  dataArray: number[][];
}
const Matrix = ({ dataArray }: MatrixProps) => {
  return (
    <div className="p-1.5 text-xl h-64 w-[25rem] overflow-y-auto overflow-x-hidden text-center rounded-sm border border-gray-900 focus:border-t-gray-900">
      {dataArray.map((row, index) => (
        <div key={index}>
          {row.map((item, i) => (
            <span className="pr-1 last:pr-0" key={i}>
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Matrix;
