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
    <div className="flex justify-evenly w-full flex-wrap">
      {potentialPeriodLength !== undefined && (
        <h5 className="w-full text-center my-1">
          Потенційний період T<sub>p</sub>
          {identifier} = {potentialPeriodLength}
        </h5>
      )}
      <h5 className="w-full text-center my-1">
        Фактичний період T<sub>f</sub>
        {identifier} = {factualPeriodLength}
      </h5>
    </div>
  );
};

export default PeriodInfo;
