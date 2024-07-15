import { dateOptions } from "@/lib/constants";
import { valueToLabel } from "@/lib/db/units";
import { SupplierBatchType } from "@/lib/types/types";
import Link from "next/link";
import React from "react";

type Props = { commodityBatches: SupplierBatchType[] };

const SupplierBatches: React.FC<Props> = ({ commodityBatches }) => {
  return (
    <div className="pl-2 grid grid-cols-[repeat(2,auto)] md:grid-cols-[repeat(3,auto)] mt-1 w-fit gap-x-4">
      {commodityBatches.map(
        ({ external_id: externalId, initial_amount: initialAmount, date, commodity: { name, id, unit } }) => {
          const batchLink = `/lotes/materias-primas/${externalId}`;
          const itemLink = `/materias-primas/${id}`;
          const formattedDate = new Date(date).toLocaleDateString("es-ES", dateOptions);
          return (
            <React.Fragment key={id}>
              <span>
                - <Link href={itemLink}>{name}</Link>
                {` (${initialAmount} ${valueToLabel[unit]}):`}
              </span>
              <Link href={batchLink}>{externalId}</Link>
              <span className="hidden md:block">({formattedDate})</span>
            </React.Fragment>
          );
        }
      )}
    </div>
  );
};

export default SupplierBatches;
