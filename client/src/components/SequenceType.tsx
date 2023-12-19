interface SequenceTypeProps {
  periodLengthByFormula: number;
  potentialPeriodLength: number;
}

const SequenceType = ({
  periodLengthByFormula,
  potentialPeriodLength,
}: SequenceTypeProps) => {
  return (
    <h5>
      Вид послідовності ={" "}
      {periodLengthByFormula === potentialPeriodLength ? "M" : "C"}
      -послідовність
    </h5>
  );
};

export default SequenceType;
