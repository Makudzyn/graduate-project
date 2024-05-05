interface SectionTitleProps {
  headerTitle: string;
  paragraphText: string;
  alignCenter?: boolean;
}

const SectionTitle = ({ headerTitle, paragraphText, alignCenter }: SectionTitleProps) => {
  return (
    <div className={`flex flex-col ${alignCenter ? "items-center text-center" : ""}`}>
      <h2 className="relative m-0 font-extrabold font-libreFranklin text-5xl">
        {headerTitle}
        <span
          className={`
            ${alignCenter ? "left-1/2 transform -translate-x-1/2 w-4/5" : "left-0 w-1/3"}
            absolute -bottom-1.5 h-0.5 rounded-lg bg-purpleFirst
            `}
        />
      </h2>
      <p className="font-normal text-paragraph text-xl mt-2.5 mb-[1.875rem]">
        {paragraphText}
      </p>
    </div>
  );
};

export default SectionTitle;
