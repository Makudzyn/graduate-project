import Matrix from "../Matrix.tsx";
import { PolynomialType } from "../../utils/interfacesAndTypes.ts";

interface StructureMatricesBlockProps {
  structureMatrixA: number[][];
  structureMatrixB: number[][];
  basisMatrix: number[][];
  polynomialTypeA?: PolynomialType;
  polynomialTypeB?: PolynomialType;
  identifierS?: string;
}

const StructureMatricesBlock = ({
  structureMatrixA,
  structureMatrixB,
  basisMatrix,
  polynomialTypeA,
  polynomialTypeB,
  identifierS,
}: StructureMatricesBlockProps) => {
  return (
    <div className="flex flex-wrap items-center justify-evenly">
      <div className="flex flex-col flex-wrap px-3">
        <h3 className="text-center">Структурна матриця F({polynomialTypeA})</h3>
        <Matrix dataArray={structureMatrixA} />
      </div>
      <div className="flex flex-col flex-wrap px-3">
        <h3 className="text-center">Матриця {identifierS}[0]</h3>
        <Matrix dataArray={basisMatrix} />
      </div>
      <div className="flex flex-col flex-wrap px-3">
        <h3 className="text-center">Структурна матриця F({polynomialTypeB})</h3>
        <Matrix dataArray={structureMatrixB} />
      </div>
    </div>
  );
};

export default StructureMatricesBlock;
