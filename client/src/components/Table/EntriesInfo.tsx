interface EntriesInfoProps {
   offset: number;
   limit: number;
   totalCount: number;
}

const EntriesInfo = ({ offset, limit, totalCount }: EntriesInfoProps) => {
 return (
   <div
     className="pt-[0.755em] text-lg font-medium text-gray-900"
     id="info"
     role="status"
     aria-live="polite"
   >
     Поліноми з {offset + 1}-го по {Math.min(offset + limit, totalCount)}-й з{" "}
     {totalCount} загальних
   </div>
 );
};

export default EntriesInfo;
