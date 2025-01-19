import { PolynomialType } from '../../utils/interfacesAndTypes.ts';
import Matrix from '../CommonGenComponents/Matrices/Matrix.tsx';
import { useEffect, useRef, useState } from 'react';
import Header3 from '../PageComponents/Headers/Header3.tsx';

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
    dynamicClass = 'flex-col justify-between h-[44.5rem]';
  } else {
    dynamicClass = 'flex-wrap justify-center gap-5';
  }

  return (
    <div ref={containerRef} className={`flex items-center ${dynamicClass}`}>
      <div className="flex flex-col">
        <Header3>Структурна матриця {polynomialType}</Header3>
        <Matrix dataArray={structureMatrix} />
      </div>
      <div className="flex flex-col">
        <Header3>Послідовність станів регістру {polynomialType}</Header3>
        <Matrix dataArray={conditionMatrix} />
      </div>
    </div>
  );
}

export default LinearMatricesBlock;
