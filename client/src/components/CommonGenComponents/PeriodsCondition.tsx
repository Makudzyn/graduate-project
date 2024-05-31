import { PolynomialType } from "../../utils/interfacesAndTypes.ts";
import Header5 from "../PageComponents/Headers/Header5.tsx";

interface PeriodsConditionProps {
   polynomialTypeFirst?: PolynomialType;
   polynomialTypeSecond?: PolynomialType;
   condition: number;
}

const PeriodsCondition = ({ polynomialTypeFirst, polynomialTypeSecond, condition }: PeriodsConditionProps) => {
 return (
   <Header5>Умова (T({polynomialTypeFirst}), T({polynomialTypeSecond})) = {condition}</Header5>
 );
};

export default PeriodsCondition;
