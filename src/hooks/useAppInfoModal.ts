import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectModal } from "../features/modalSelectors";

const useAppInfoModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, doNotShowAgain } = useAppSelector(selectModal);

  return { isOpen, doNotShowAgain, dispatch };
};

export default useAppInfoModal;
