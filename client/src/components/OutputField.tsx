interface OutputFieldProps {
  dataArray?: number[][];
}
const OutputField = ({dataArray} : OutputFieldProps) => {
  return (
    <div
      className="p-5 h-64 w-[400px] overflow-y-auto overflow-x-hidden rounded-sm border border-gray-900 focus:border-t-gray-900"
    >
      {dataArray?.map((row, index) =>
        <div key={index}>
          {row.map((item, i) =>
            <span key={i}>{item}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default OutputField;