import { AlertDialog } from 'native-base';

export default AlertDialogComponent = ({ 
    cancelRef,
    isOpen,
    onCloseDialog,
    header,
    body,
    footer,
}) => {
    return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onCloseDialog}>
        <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{header}</AlertDialog.Header>
        <AlertDialog.Body>
            {body}
        </AlertDialog.Body>
        <AlertDialog.Footer>
           {footer}
        </AlertDialog.Footer>
        </AlertDialog.Content>
    </AlertDialog> 
    );
};