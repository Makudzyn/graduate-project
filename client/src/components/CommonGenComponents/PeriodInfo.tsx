import Header5 from '../PageComponents/Headers/Header5.tsx';

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
        <Header5>
          Потенційний період T<sub>p</sub>
          {identifier} = {potentialPeriodLength}
        </Header5>
      )}
      <Header5>
        Фактичний період T<sub>f</sub>
        {identifier} = {factualPeriodLength}
      </Header5>
    </div>
  );
};

export default PeriodInfo;
