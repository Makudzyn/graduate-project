import MatrixSelect from "./MatrixSelect.tsx";
import MatrixOutputSelectionBlock from "./MatrixOutputSelectionBlock.tsx";
import { useContext, useEffect, useState } from "react";
import {
  generateOptions,
  getSelectedParam,
} from "../../functions/functions.ts";
import { SetURLSearchParams, useLocation } from "react-router-dom";
import { calculatePossibleValues } from "../../functions/generatorFunctions.ts";
import { Context } from "../../main.tsx";
import { observer } from "mobx-react-lite";
import { Polynomial, PolynomialType } from "../../utils/interfacesAndTypes.ts";

interface MatrixInputBlockProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  degreeParamA: string;
  degreeParamB: string;
  polynomialParamA: string;
  polynomialParamB: string;
  indexParamI: string;
  indexParamJ: string;
  matrixRankParam: string;
  polynomialTypeA?: PolynomialType;
  polynomialTypeB?: PolynomialType;
}

const MatrixInputBlock = observer(
  ({
    searchParams,
    setSearchParams,
    polynomialParamA,
    polynomialParamB,
    degreeParamA,
    degreeParamB,
    indexParamI,
    indexParamJ,
    matrixRankParam,
    polynomialTypeA,
    polynomialTypeB,
  }: MatrixInputBlockProps) => {
    const { polynomialsStore, calculationInfoStore } = useContext(Context)!;

    //Fix here
    const [polynomialArrA, setPolynomialArrA] = useState<Polynomial[]>(
      polynomialsStore.polynomials,
    );

    const [polynomialArrB, setPolynomialArrB] = useState<Polynomial[]>(
      polynomialsStore.polynomials,
    );

    const options = generateOptions();
    const location = useLocation();

    const [outputValuesI, setOutputValuesI] = useState<number[]>([0]);
    const [outputValuesJ, setOutputValuesJ] = useState<number[]>([0]);
    const [matrixRank, setMatrixRank] = useState<number[]>([1]);

    useEffect(() => {
      const degreeA = getSelectedParam(degreeParamA, searchParams);
      const degreeB = getSelectedParam(degreeParamB, searchParams);
      const polynomialA = getSelectedParam(polynomialParamA, searchParams);
      const polynomialB = getSelectedParam(polynomialParamB, searchParams);

      const indexI = getSelectedParam(indexParamI, searchParams);
      const indexJ = getSelectedParam(indexParamJ, searchParams);
      const matrixRank = getSelectedParam(matrixRankParam, searchParams);

      const numDegreeA = Number(degreeA);
      const numDegreeB = Number(degreeB);

      calculationInfoStore.setManyInputValues({
        degreeA: numDegreeA,
        polynomialA,
        degreeB: numDegreeB,
        polynomialB,
        indexI: Number(indexI),
        indexJ: Number(indexJ),
        matrixRank: Number(matrixRank),
      });

      setPolynomialArrA(
        polynomialsStore.polynomials.filter(
          (poly) => poly.degree === numDegreeA,
        ),
      );

      setPolynomialArrB(
        polynomialsStore.polynomials.filter(
          (poly) => poly.degree === numDegreeB,
        ),
      );

      const valuesArrayI = calculatePossibleValues(numDegreeA);
      const valuesArrayJ = calculatePossibleValues(numDegreeB);
      const minDegree = Math.min(numDegreeA, numDegreeB);
      const rankValues = calculatePossibleValues(minDegree, 1);

      setOutputValuesI(valuesArrayI);
      setOutputValuesJ(valuesArrayJ);
      setMatrixRank(rankValues);
    }, [location.search]);

    return (
      <>
        <MatrixSelect
          firstSelectLabel={`Оберіть ступінь поліному F(${polynomialTypeA})`}
          secondSelectLabel={`Поліном F(${polynomialTypeA})`}
          degreeParamName={degreeParamA}
          degreeArray={options}
          polynomialParamName={polynomialParamA}
          polynomialArray={polynomialArrA}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        <MatrixOutputSelectionBlock
          firstOutputElementLabel={"Значення i вихідного елементу"}
          firstOptionsArray={outputValuesI}
          firstUrlParamName={indexParamI}
          secondOutputElementLabel={"Значення j вихідного елементу"}
          secondOptionsArray={outputValuesJ}
          secondUrlParamName={indexParamJ}
          thirdOutputElementLabel={"Ранг матриці S"}
          thirdOptionsArray={matrixRank}
          thirdUrlParamName={matrixRankParam}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        <MatrixSelect
          firstSelectLabel={`Оберіть ступінь поліному F(${polynomialTypeB})`}
          secondSelectLabel={`Поліном F(${polynomialTypeB})`}
          degreeParamName={degreeParamB}
          degreeArray={options}
          polynomialParamName={polynomialParamB}
          polynomialArray={polynomialArrB}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </>
    );
  },
);

export default MatrixInputBlock;
