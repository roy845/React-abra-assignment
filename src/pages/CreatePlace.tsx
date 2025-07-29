import { Helmet } from "react-helmet-async";
import { PAGE_TITLES } from "../constants/pageTitles";
import AppInfoModal from "../components/modal/AppInfoModal";
import ConfirmResetModal from "../components/modal/ConfirmResetModal";
import CreatePlaceFormButtons from "../components/CreatePlaceFormButtons";
import CreatePlaceFormFields from "../components/CreatePlaceFormFields";
import { useCreatePlaceForm } from "../hooks/useCreatePlaceForm";

const CreatePlace = (): JSX.Element => {
  const {
    loading,
    showResetModal,
    formMethods,
    handleResetForm,
    confirmReset,
    cancelReset,
    onSubmit,
  } = useCreatePlaceForm();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = formMethods;

  const { CREATE_PLACE_PAGE_TITLE } = PAGE_TITLES;

  return (
    <>
      <Helmet>
        <title>{CREATE_PLACE_PAGE_TITLE}</title>
      </Helmet>

      <AppInfoModal />

      <div className="min-h-screen pt-8 flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-6 bg-white"
        >
          <h2 className="text-3xl font-bold text-center text-blue-700">
            {CREATE_PLACE_PAGE_TITLE}
          </h2>

          <CreatePlaceFormFields
            register={register}
            errors={errors}
            loading={loading}
          />

          <CreatePlaceFormButtons
            loading={loading}
            onResetClick={handleResetForm}
          />
        </form>

        <ConfirmResetModal
          isOpen={showResetModal}
          onConfirm={confirmReset}
          onCancel={cancelReset}
        />
      </div>
    </>
  );
};

export default CreatePlace;
