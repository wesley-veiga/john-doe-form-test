import { useClientForm } from "./useClientForm";
import { ClientFormFields } from "./components/form";
import { SuccessAlert } from "../../components/alert";

export const ClientForm = () => {
  const { state, reset, register, control, errors, isSubmitting, isValid, handleSubmit, onSubmit } =
    useClientForm();

  return (
    <>
      <main className="min-h-screen bg-white sm:bg-gray-50 sm:flex sm:items-center sm:justify-center sm:px-4">
        <div className="bg-white sm:rounded-xl sm:shadow-sm sm:border sm:border-gray-200 p-6 sm:p-8 w-full sm:max-w-md min-h-screen sm:min-h-fit space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Cadastro</h1>
            <p className="text-sm text-gray-500 mt-1">
              Preencha os campos abaixo para se cadastrar.
            </p>
          </div>

          {state?.status === "error" && (
            <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {state.error}
            </div>
          )}

          <ClientFormFields
            register={register}
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
            isValid={isValid}
            onSubmit={handleSubmit(onSubmit)}
          />
        </div>
      </main>

      {state?.status === "success" && (
        <SuccessAlert
          title="Sucesso!"
          message={<><strong>{state.fullName}</strong> foi cadastrado.</>}
          onConfirm={reset}
        />
      )}
    </>
  );
};
