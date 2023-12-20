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
    <div>
      {potentialPeriodLength !== undefined && (
        <h5>
          Потенційний період {identifier} = {potentialPeriodLength}
        </h5>
      )}
      <h5>
        Фактичний період {identifier} = {factualPeriodLength}
      </h5>
    </div>
  );
};

export default PeriodInfo;
