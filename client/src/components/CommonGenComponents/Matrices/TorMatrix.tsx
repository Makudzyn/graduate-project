interface TorMatrixProps {
  statesArray: number[][][][];
}

const TorMatrix = ({ statesArray }: TorMatrixProps) => {
  return (
    <div className="flex flex-col scrollbar text-xl font-medium py-6 h-64 overflow-y-auto w-full text-center rounded-md ring-1 ring-inset ring-gray-300 scroll-smooth shadow-lg">
      {statesArray.map((subArray, subIndex) => (
        <div key={subIndex} className="flex items-center mx-1">
          {subArray.map((subSubArray, subSubIndex) => (
            <div key={subSubIndex} className="flex flex-col items-center mx-2">
              {subSubArray.map((chunk, chunkIndex) => (
                <div
                  className="flex justify-center items-center"
                  key={chunkIndex}
                >
                  {chunk.map((item, itemIndex) => (
                    <span className="w-3.5" key={itemIndex}>
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TorMatrix;
