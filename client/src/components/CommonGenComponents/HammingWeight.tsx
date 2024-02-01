interface HammingWeightProps {
  hammingWeight: number;
}

const HammingWeight = ({ hammingWeight }: HammingWeightProps) => {
  return <h5>Вага Хеммінгу = {hammingWeight}</h5>;
};

export default HammingWeight;
