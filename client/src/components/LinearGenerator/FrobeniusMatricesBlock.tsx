import { PolynomialType } from "../../utils/interfacesAndTypes.ts";
import Header3 from "../PageComponents/Headers/Header3.tsx";
import Matrix from "../CommonGenComponents/Matrix.tsx";

interface FrobeniusMatricesBlockProps {
  structureMatrixA: number[][];
  structureMatrixB: number[][];
  basisMatrix: number[][];
  polynomialTypeA?: PolynomialType;
  polynomialTypeB?: PolynomialType;
  identifierS?: string;
}

const FrobeniusMatricesBlock = ({
  structureMatrixA,
  structureMatrixB,
  basisMatrix,
  polynomialTypeA,
  polynomialTypeB,
  identifierS,
}: FrobeniusMatricesBlockProps) => {
  return (
    <div className="flex flex-wrap items-center justify-evenly">
      <div className="flex flex-col flex-wrap px-3">
        <Header3>Структурна матриця F({polynomialTypeA})</Header3>
        <Matrix dataArray={structureMatrixA} />
      </div>
      <div className="flex flex-col flex-wrap px-3">
        <Header3>Матриця {identifierS}[0]</Header3>
        <Matrix dataArray={basisMatrix} />
      </div>
      <div className="flex flex-col flex-wrap px-3">
        <Header3>Структурна матриця F({polynomialTypeB})</Header3>
        <Matrix dataArray={structureMatrixB} />
      </div>
    </div>
  );
};

export default FrobeniusMatricesBlock;
