// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { commodityBatchFormSchema, CommodityBatchFormType } from "@/lib/types";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { getSingleCommodityWithBatches, updateCommodity } from "@/lib/actions/commodityActions";
// import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
// import CommodityForm from "./CommodityBatchForm";

// type Props = { commodityId: number; batchIdx: number };
// const UpdateCommodityBatchForm: React.FC<Props> = ({ commodityId, batchIdx }) => {
//   const { data: commodityData } = useQuery({
//     queryKey: ["commodity", commodityId],
//     queryFn: () => getSingleCommodityWithBatches(Number(commodityId)),
//   });

//   const form = useForm<CommodityBatchFormType>({
//     resolver: zodResolver(commodityBatchFormSchema),
//     defaultValues: {
//       commodityId: commodityData?.dbData.id,
//       commodityName: commodityData?.dbData.name,
//       supplierId: commodityData?.dbData.supplierId,
//       externalId: "",
//       date: new Date(),
//       initialAmount: undefined,
//       comments: "",
//     },
//   });

//   const successHandler = useQuerySuccessHandler({
//     destinationAfterSuccess: "/materias-primas",
//     successToastMessage: "Lote actualizado con éxito",
//     queryKeys: [["commodity", commodityId], ["commodities"], ["stats"], ["charts"]],
//   });

//   const { mutate, isPending } = useMutation({
//     mutationFn: (values: CommodityBacthFormType) => updateCommodityBatch(values, commodityId),
//     onSuccess: successHandler,
//     onError: (error) => {
//       console.log(error);
//     },
//   });

//   return (
//     <CommodityForm
//       form={form}
//       mutate={mutate}
//       isPending={isPending}
//       formHeader="Editar materia prima"
//       submitButtonLabel="Actualizar"
//     />
//   );
// };
// export default UpdateCommodityBatchForm;
