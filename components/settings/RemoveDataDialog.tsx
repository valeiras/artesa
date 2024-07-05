import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import RemoveDataForm from "./RemoveDataForm";

type Props = { isDialogOpen: boolean; setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>> };
const RemoveDataDialog: React.FC<Props> = ({ isDialogOpen, setIsDialogOpen }) => {
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Realmente deseas eliminar todos tus datos?</AlertDialogTitle>
          <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
        </AlertDialogHeader>
        <RemoveDataForm setIsDialogOpen={setIsDialogOpen} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveDataDialog;
