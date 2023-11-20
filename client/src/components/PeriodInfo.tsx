interface PeriodInfoProps {
  periodLengthByFormula: number;
  experimentalPeriodLength: number;
  identifier?: string;
}
const PeriodInfo = ({periodLengthByFormula, experimentalPeriodLength, identifier} : PeriodInfoProps) => {
  return (
    <div>
      <h5>Період по формулі {identifier} = {periodLengthByFormula}</h5>
      <h5>Експериментальний період {identifier} = {experimentalPeriodLength}</h5>
    </div>
  );
};

export default PeriodInfo;