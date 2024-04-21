import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

function getSortableHeader(label: string) {
  function sortableHeader({ column }: { column: any }) {
    return (
      <Button
        variant="ghost"
        className="font-bold px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  }
  return sortableHeader;
}

export default getSortableHeader;
