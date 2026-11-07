interface ClosetControlsProps {
  closetIsOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onAddItem: () => void;
}

function ClosetControls({
  closetIsOpen,
  onOpen,
  onClose,
  onAddItem,
}: ClosetControlsProps) {
  return (
    <div>
      {closetIsOpen ? (
        <>
          <button onClick={onAddItem}>Add Clothing Item</button>
          <button onClick={onClose}>Close Closet</button>
        </>
      ) : (
        <button onClick={onOpen}>Open Closet</button>
      )}
    </div>
  );
}

export default ClosetControls;
