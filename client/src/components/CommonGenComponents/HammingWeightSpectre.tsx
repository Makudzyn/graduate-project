interface HammingWeightSpectreProps {
  hammingWeightSpectre: string[];
}

const HammingWeightSpectre = ({
  hammingWeightSpectre,
}: HammingWeightSpectreProps) => {
  return (
    <h5>
      Спектр ваг Хеммінгу:{" "}
      {hammingWeightSpectre.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </h5>
  );
};

export default HammingWeightSpectre;
