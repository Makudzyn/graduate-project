interface InstructionProps {
  title: string;
  description: string;
  picture: string;
  reverse?: boolean;
}

const Instruction = ({ title, description, picture, reverse }: InstructionProps) => {
  return (
    <div
      className={`flex items-center gap-10 text-center flex-col md:text-start md:gap-20 ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      <div className="flex-grow basis-0 px-4">
        <h3 className="relative text-primary mb-1.5 text-2xl md:text-3xl font-semibold">
          {title}
          <span className="left-1/2 transform -translate-x-1/2 w-2/5 absolute -bottom-1.5 h-0.5 rounded-lg bg-purpleFirst md:left-0 md:transform-none" />
        </h3>
        <p className="text-xl md:text-2xl text-paragraph">{description}</p>
      </div>
      <div className="flex-grow basis-0">
        <img src={picture} alt={"placehold.it"} />
      </div>
    </div>
  );
};

export default Instruction;
