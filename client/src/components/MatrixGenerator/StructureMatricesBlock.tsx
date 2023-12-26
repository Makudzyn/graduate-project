import Matrix from "../Matrix.tsx";

interface StructureMatricesBlockProps {
  structureMatrixA: number[][];
  structureMatrixB: number[][];
  basisMatrix: number[][];
}
const StructureMatricesBlock = ({
  structureMatrixA,
  structureMatrixB,
  basisMatrix,
}: StructureMatricesBlockProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div>
        <h3 className="text-center">Структурна матриця F(A)</h3>
        <Matrix dataArray={structureMatrixA} />
      </div>
      <div>
        <h3 className="text-center">Матриця S[0]</h3>
        <Matrix dataArray={basisMatrix} />
      </div>
      <div>
        <h3 className="text-center">Структурна матриця F(B)</h3>
        <Matrix dataArray={structureMatrixB} />
      </div>
    </div>
  );
};

export default StructureMatricesBlock;
