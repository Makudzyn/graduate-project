import MatrixSelect from './MatrixSelect.tsx';
import MatrixOutputSelectionBlock from './MatrixOutputSelectionBlock.tsx';
import { SetURLSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { PolynomialType } from '../../utils/interfacesAndTypes.ts';

interface MatrixInputBlockProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  degreeParamA: string;
  degreeParamB: string;
  polynomialParamA: string;
  polynomialParamB: string;
  cyclicPolyParamA: string;
  cyclicPolyParamB: string;
  indexParamI: string;
  indexParamJ: string;
  matrixRankParam: string;
  polynomialTypeA: PolynomialType;
  polynomialTypeB: PolynomialType;
  identifierS: string;
}

const MatrixInputBlock = observer(
  ({
    searchParams,
    setSearchParams,
    degreeParamA,
    degreeParamB,
    polynomialParamA,
    polynomialParamB,
    cyclicPolyParamA,
    cyclicPolyParamB,
    indexParamI,
    indexParamJ,
    matrixRankParam,
    polynomialTypeA,
    polynomialTypeB,
    identifierS,
  }: MatrixInputBlockProps) => {
    return (
      <>
        <MatrixSelect
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          degreeParamName={degreeParamA}
          polynomialParamName={polynomialParamA}
          cyclicPolyParamName={cyclicPolyParamA}
          polynomialType={polynomialTypeA}
        />

        <MatrixOutputSelectionBlock
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          degreeParamA={degreeParamA}
          degreeParamB={degreeParamB}
          indexParamI={indexParamI}
          indexParamJ={indexParamJ}
          matrixRankParam={matrixRankParam}
          identifierS={identifierS}
        />

        <MatrixSelect
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          degreeParamName={degreeParamB}
          polynomialParamName={polynomialParamB}
          cyclicPolyParamName={cyclicPolyParamB}
          polynomialType={polynomialTypeB}
        />
      </>
    );
  },
);

export default MatrixInputBlock;
