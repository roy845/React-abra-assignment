import { RootState } from "../app/store";
import { ModalState } from "./modalSlice";

export const selectModal = (state: RootState): ModalState => state.modal;
