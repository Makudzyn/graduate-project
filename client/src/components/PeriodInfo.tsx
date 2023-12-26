interface PeriodInfoProps {
  potentialPeriodLength?: number;
  factualPeriodLength: number;
  identifier?: string;
}
const PeriodInfo = ({
  potentialPeriodLength,
  factualPeriodLength,
  identifier,
}: PeriodInfoProps) => {
  return (
    <div className="flex justify-evenly w-full">
      {potentialPeriodLength !== undefined && (
        <h5 className="w-full text-center">
          Потенційний період T<sub>p</sub>
          {identifier} = {potentialPeriodLength}
        </h5>
      )}
      <h5 className="w-full text-center">
        Фактичний період T<sub>f</sub>
        {identifier} = {factualPeriodLength}
      </h5>
    </div>
  );
};

export default PeriodInfo;
