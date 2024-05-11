interface HammingWeightProps {
  hammingWeight: number;
}

const HammingWeight = ({ hammingWeight }: HammingWeightProps) => {
  return <h5 className="text-lg font-medium">Вага Хеммінгу = {hammingWeight}</h5>;
};

export default HammingWeight;
