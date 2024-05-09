interface InstructionProps {
  title: string;
  description: string;
  picture: string;
  reverse?: boolean;
}

const Instruction = ({ title, description, picture, reverse }: InstructionProps) => {
  return (
    <div
      className={`flex items-center gap-20 ${reverse && "flex-row-reverse"}`}
    >
      <div className="flex-grow basis-0 px-4">
        <h3 className="relative text-primary mb-1.5 text-3xl font-semibold">
          {title}
          <span className="left-0 w-2/5 absolute -bottom-1.5 h-0.5 rounded-lg bg-purpleFirst" />
        </h3>
        <p className="text-2xl text-paragraph">{description}</p>
      </div>
      <div className="flex-grow basis-0">
        <img src={picture} alt={"placehold.it"} />
      </div>
    </div>
  );
};

export default Instruction;
