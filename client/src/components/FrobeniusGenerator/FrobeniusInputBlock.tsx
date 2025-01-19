import { SetURLSearchParams } from 'react-router-dom';
import { PolynomialType } from '../../utils/interfacesAndTypes.ts';
import { observer } from 'mobx-react-lite';
import SelectValue from '../CommonGenComponents/Select/SelectValue.tsx';
import SelectPolynomial from '../CommonGenComponents/Select/SelectPolynomial.tsx';
import { useEffect, useState } from 'react';
import {
  generateOptions,
  getSelectedParam,
} from '../../functions/functions.ts';
import DecompositionInput from './DecompositionInput.tsx';

interface FrobeniusInputBlockProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  degreeParam: string;
  polynomialParam: string;
  userValueParam: string;
  polynomialType?: PolynomialType;
}

const FrobeniusInputBlock = observer(
  ({
    searchParams,
    setSearchParams,
    degreeParam,
    polynomialParam,
    polynomialType,
    userValueParam,
  }: FrobeniusInputBlockProps) => {
    const [polyDegree, setPolyDegree] = useState<number>(0);
    const degreesArray = generateOptions();

    useEffect(() => {
      const degree = Number(getSelectedParam(degreeParam, searchParams));
      setPolyDegree(degree);
    }, [location.search]);

    const DEGREE_LABEL = `Оберіть ступінь поліному ${polynomialType || ''}`;
    const DEGREE_PLACEHOLDER = `Ступінь поліному ${polynomialType || ''}`;
    const POLYNOMIAL_LABEL = `Оберіть поліном ${polynomialType || ''}`;
    const POLYNOMIAL_PLACEHOLDER = `Поліном ${polynomialType || ''}`;
    const INPUT_LABEL = `Розбийте поліном на допоміжні ${polynomialType || ''}`;

    return (
      <div className="flex flex-col justify-center w-[25rem] px-3">
        <SelectValue
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={degreeParam}
          optionsArray={degreesArray}
          selectLabel={DEGREE_LABEL}
          shownPlaceholder={DEGREE_PLACEHOLDER}
        />

        <SelectPolynomial
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={polynomialParam}
          polyDegree={polyDegree}
          selectLabel={POLYNOMIAL_LABEL}
          shownPlaceholder={POLYNOMIAL_PLACEHOLDER}
        />

        <DecompositionInput
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={userValueParam}
          inputLabel={INPUT_LABEL}
          inputPlaceholder={'n-m-...-k'}
          degreeRestriction={polyDegree}
        />
      </div>
    );
  },
);

export default FrobeniusInputBlock;
