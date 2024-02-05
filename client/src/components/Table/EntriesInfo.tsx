interface EntriesInfoProps {
   offset: number;
   limit: number;
   totalCount: number;
}

const EntriesInfo = ({ offset, limit, totalCount }: EntriesInfoProps) => {
 return (
   <div
     className="pt-[0.755em]"
     id="info"
     role="status"
     aria-live="polite"
   >
     Showing {offset + 1} to {Math.min(offset + limit, totalCount)} of{" "}
     {totalCount} entries
   </div>
 );
};

export default EntriesInfo;