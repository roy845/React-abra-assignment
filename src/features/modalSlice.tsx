import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  isOpen: boolean;
  doNotShowAgain: boolean;
}

const initialState: ModalState = {
  isOpen: !Boolean(localStorage.getItem("hideAppInfoModal")),
  doNotShowAgain: Boolean(localStorage.getItem("hideAppInfoModal")),
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    toggleDoNotShowAgain: (state) => {
      state.doNotShowAgain = !state.doNotShowAgain;
      if (state.doNotShowAgain) {
        localStorage.setItem("hideAppInfoModal", "true");
      } else {
        localStorage.removeItem("hideAppInfoModal");
      }
    },
  },
});

export const { openModal, closeModal, toggleDoNotShowAgain } =
  modalSlice.actions;

export default modalSlice.reducer;
