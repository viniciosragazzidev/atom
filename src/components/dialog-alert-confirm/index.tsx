import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DialogAlertConfirmProps {
  onOpenAlert: boolean;
  setOnOpenAlert: (value: boolean) => void;
  confirmClose: boolean;
  setConfirmClose: (value: boolean) => void;
}
export function DialogAlertConfirm({
  onOpenAlert,
  setOnOpenAlert,
  confirmClose,
  setConfirmClose,
}: DialogAlertConfirmProps) {
  const handleConfirmClose = () => {
    setConfirmClose(true);
    setOnOpenAlert(false);
  };
  return (
    <AlertDialog
      open={onOpenAlert}
      onOpenChange={setOnOpenAlert}
    >
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao continuar, todos os dados preenchidos abaixo serão perdidos e
            você terá que iniciar novamente!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmClose(false)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmClose}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
