interface SequenceTypeProps {
  periodLengthByFormula: number;
  experimentalPeriodLength: number;
}

const SequenceType = ({
  periodLengthByFormula,
  experimentalPeriodLength,
}: SequenceTypeProps) => {
  return (
    <h5>
      Вид послідовності ={" "}
      {periodLengthByFormula === experimentalPeriodLength ? "M" : "C"}
      -послідовність
    </h5>
  );
};

export default SequenceType;
