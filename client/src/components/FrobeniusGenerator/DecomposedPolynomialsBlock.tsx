import { SetURLSearchParams } from 'react-router-dom';
import SelectPolynomial from '../CommonGenComponents/Select/SelectPolynomial.tsx';
import { PARAMS_DECOMPOSED_POLYNOMIAL } from '../../utils/consts.ts';

interface DecomposedPolynomialsBlockProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  decompositionValues: number[];
}

const DecomposedPolynomialsBlock = ({
  searchParams,
  setSearchParams,
  decompositionValues,
}: DecomposedPolynomialsBlockProps) => {
  return (
    <div className="flex flex-wrap justify-evenly w-full my-3.5 gap-2 px-3">
      {decompositionValues.map((decomposition, i) => (
        <SelectPolynomial
          key={i}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={PARAMS_DECOMPOSED_POLYNOMIAL + i}
          polyDegree={decomposition}
          selectLabel={`Оберіть допоміжний поліном ${decomposition}-ого ступеня`}
          shownPlaceholder={'Допоміжний поліном'}
        />
      ))}
    </div>
  );
};

export default DecomposedPolynomialsBlock;
