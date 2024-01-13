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
import {
  BooleanSelect,
  Polynomial,
  PolynomialType,
} from "../../utils/interfacesAndTypes.ts";

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
    const { polynomialsStore, calculationInfoStore } = useContext(Context)!;

    //Fix here
    const [polynomialArrA, setPolynomialArrA] = useState<Polynomial[]>(
      polynomialsStore.polynomials,
    );

    const [polynomialArrB, setPolynomialArrB] = useState<Polynomial[]>(
      polynomialsStore.polynomials,
    );

    const cyclicSelection: BooleanSelect[] = [
      { booleanLabel: "Так", booleanValue: true },
      {
        booleanLabel: "Ні",
        booleanValue: false,
      },
    ];

    const options = generateOptions();
    const location = useLocation();

    const [outputValuesI, setOutputValuesI] = useState<number[]>([]);
    const [outputValuesJ, setOutputValuesJ] = useState<number[]>([]);
    const [matrixRank, setMatrixRank] = useState<number[]>([]);


    useEffect(() => {
      const degreeA = getSelectedParam(degreeParamA, searchParams);
      const numDegreeA = Number(degreeA);
      const polynomialA = getSelectedParam(polynomialParamA, searchParams);
      const isCyclicA = getSelectedParam(cyclicPolyParamA, searchParams);

      const degreeB = getSelectedParam(degreeParamB, searchParams);
      const numDegreeB = Number(degreeB);
      const polynomialB = getSelectedParam(polynomialParamB, searchParams);
      const isCyclicB = getSelectedParam(cyclicPolyParamB, searchParams);

      const indexI = getSelectedParam(indexParamI, searchParams);
      const indexJ = getSelectedParam(indexParamJ, searchParams);
      const matrixRank = getSelectedParam(matrixRankParam, searchParams);

      calculationInfoStore.setManyInputValues({
        degreeA: numDegreeA,
        polynomialA,
        isCyclicA,
        degreeB: numDegreeB,
        polynomialB,
        isCyclicB,
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
          thirdSelectLabel={`Зробити поліном F(${polynomialTypeA}) циклічним?`}
          degreeParamName={degreeParamA}
          degreeArray={options}
          polynomialParamName={polynomialParamA}
          polynomialArray={polynomialArrA}
          cyclicPolyParamName={cyclicPolyParamA}
          cyclicSelect={cyclicSelection}
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
          thirdOutputElementLabel={`Ранг матриці ${identifierS}`}
          thirdOptionsArray={matrixRank}
          thirdUrlParamName={matrixRankParam}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        <MatrixSelect
          firstSelectLabel={`Оберіть ступінь поліному F(${polynomialTypeB})`}
          secondSelectLabel={`Поліном F(${polynomialTypeB})`}
          thirdSelectLabel={`Зробити поліном F(${polynomialTypeB}) циклічним?`}
          degreeParamName={degreeParamB}
          degreeArray={options}
          polynomialParamName={polynomialParamB}
          polynomialArray={polynomialArrB}
          cyclicPolyParamName={cyclicPolyParamB}
          cyclicSelect={cyclicSelection}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </>
    );
  },
);

export default MatrixInputBlock;
