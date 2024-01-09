import { PolynomialType } from "../utils/interfacesAndTypes.ts";

interface PeriodsConditionProps {
   polynomialTypeFirst?: PolynomialType;
   polynomialTypeSecond?: PolynomialType;
   condition: number;
}

const PeriodsCondition = ({ polynomialTypeFirst, polynomialTypeSecond, condition }: PeriodsConditionProps) => {
 return (
   <h5 className="my-1 w-full text-center">Умова (T({polynomialTypeFirst}), T({polynomialTypeSecond})) = {condition}</h5>
 );
};

export default PeriodsCondition;