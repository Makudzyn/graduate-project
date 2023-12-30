import { useContext, useState } from "react";
import { fetchPolynomials } from "../http/polynomialsAPI.ts";
import { Context } from "../main.tsx";
import { linearCalculations } from "../functions/generatorFunctions.ts";
import { observer } from "mobx-react-lite";
import usePolynomialsFetching from "../hooks/usePolynomialsFetching.ts";
import PlotlyChart from "../components/Chart/Plotly/PlotlyChart.tsx";
import { useSearchParams } from "react-router-dom";
import {
  PARAMS_DEGREE,
  PARAMS_POLYNOMIAL,
  PARAMS_USER_VALUE,
} from "../utils/consts.ts";
import LinearGenerator from "../components/LinearGenerator/LinearGenerator.tsx";

const LinearGeneratorPage = observer(() => {
  const { polynomialsStore, calculationInfoStore } = useContext(Context)!;
  const [structureMatrix, setStructureMatrix] = useState<number[][]>([]);
  const [conditionMatrix, setConditionMatrix] = useState<number[][]>([]);

  const [potentialPeriodLength, setPotentialPeriodLength] = useState<number>(0);
  const [factualPeriodLength, setFactualPeriodLength] = useState<number>(0);
  const [pseudorandomSequence, setPseudorandomSequence] = useState<number[]>(
    [],
  );
  const [hammingWeight, setHammingWeight] = useState<number>(0);
  const [correlation, setCorrelation] = useState<number[]>([]);

  const [searchParams, setSearchParams] = useSearchParams({
    degree: "2",
    polynomial: "1 7 H",
    value: "01",
  });

  usePolynomialsFetching(fetchPolynomials, polynomialsStore);

  return (
    <section className="flex h-full justify-center">
      <div className="h-full w-[calc(100%-2rem)] flex flex-col justify-center">
        <h1 className="py-5 text-center">Лінійний ЗРЗЗ</h1>

        <LinearGenerator
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          structureMatrix={structureMatrix}
          conditionMatrix={conditionMatrix}
          potentialPeriodLength={potentialPeriodLength}
          factualPeriodLength={factualPeriodLength}
          pseudorandomSequence={pseudorandomSequence}
          hammingWeight={hammingWeight}
          degreeParam={PARAMS_DEGREE}
          polynomialParam={PARAMS_POLYNOMIAL}
          userValueParam={PARAMS_USER_VALUE}
          onClick={() =>
            linearCalculations(
              calculationInfoStore,
              setStructureMatrix,
              setConditionMatrix,
              setPotentialPeriodLength,
              setFactualPeriodLength,
              setPseudorandomSequence,
              setHammingWeight,
              setCorrelation,
            )
          }
        />

        <div className="flex h-full w-full items-center justify-center">
          <PlotlyChart data1={correlation} />
        </div>
      </div>
    </section>
  );
});

export default LinearGeneratorPage;
