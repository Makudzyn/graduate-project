import { PolynomialType } from "../../utils/interfacesAndTypes.ts";
import Matrix from "../Matrix.tsx";
import { useEffect, useRef, useState } from "react";

interface LinearMatricesBlockProps {
  polynomialType: PolynomialType | undefined;
  structureMatrix: number[][];
  conditionMatrix: number[][];
}

function LinearMatricesBlock({
  polynomialType,
  structureMatrix,
  conditionMatrix,
}: LinearMatricesBlockProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries && entries[0] && entries[0].contentRect) {
          setContainerWidth(entries[0].contentRect.width);
        }
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  let dynamicClass;
  if (containerWidth < 500) {
    dynamicClass = "flex-col justify-between h-[41.5rem]";
  } else {
    dynamicClass = "flex-wrap justify-center gap-5";
  }

  return (
    <div ref={containerRef} className={`flex items-center ${dynamicClass}`}>
      <div className="flex flex-col">
        <h3 className="text-center">Структурна матриця {polynomialType}</h3>
        <Matrix dataArray={structureMatrix} />
      </div>
      <div className="flex flex-col">
        <h3 className="text-center">
          Послідовність станів регістру {polynomialType}
        </h3>
        <Matrix dataArray={conditionMatrix} />
      </div>
    </div>
  );
}

export default LinearMatricesBlock;
