import MatrixSelect from "./MatrixSelect.tsx";
import MatrixOutputSelectionBlock from "./MatrixOutputSelectionBlock.tsx";
import { SetURLSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { PolynomialType } from "../../utils/interfacesAndTypes.ts";

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
  polynomialTypeA?: PolynomialType;
  polynomialTypeB?: PolynomialType;
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
          firstSelectLabel={`Оберіть ступінь поліному F(${polynomialTypeA})`}
          firstShownPlaceholder={`Ступінь поліному F(${polynomialTypeA})`}
          secondSelectLabel={`Оберіть поліном F(${polynomialTypeA})`}
          secondShownPlaceholder={`Поліном F(${polynomialTypeA})`}
          thirdSelectLabel={`Зробити поліном F(${polynomialTypeA}) циклічним?`}
          thirdShownPlaceholder={`Ні`}
          degreeParamName={degreeParamA}
          polynomialParamName={polynomialParamA}
          cyclicPolyParamName={cyclicPolyParamA}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        <MatrixOutputSelectionBlock
          firstOutputElementLabel={"Оберіть i вихідного елементу"}
          firstShownPlaceholder={`Значення i`}
          firstUrlParamName={indexParamI}
          degreeParamA={degreeParamA}
          secondOutputElementLabel={"Оберіть j вихідного елементу"}
          secondShownPlaceholder={`Значення j`}
          secondUrlParamName={indexParamJ}
          degreeParamB={degreeParamB}
          thirdOutputElementLabel={`Оберіть ранг матриці ${identifierS}`}
          thirdShownPlaceholder={`Ранг матриці ${identifierS}`}
          thirdUrlParamName={matrixRankParam}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        <MatrixSelect
          firstSelectLabel={`Оберіть ступінь поліному F(${polynomialTypeB})`}
          firstShownPlaceholder={`Ступінь поліному F(${polynomialTypeB})`}
          secondSelectLabel={`Оберіть поліном F(${polynomialTypeB})`}
          secondShownPlaceholder={`Поліном F(${polynomialTypeB})`}
          thirdSelectLabel={`Зробити поліном F(${polynomialTypeB}) циклічним?`}
          thirdShownPlaceholder={`Ні`}
          degreeParamName={degreeParamB}
          polynomialParamName={polynomialParamB}
          cyclicPolyParamName={cyclicPolyParamB}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </>
    );
  },
);

export default MatrixInputBlock;
