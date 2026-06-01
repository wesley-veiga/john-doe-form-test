import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema, type ClientInput } from "shared";

export type FormState =
  | null
  | { status: "success"; fullName: string }
  | { status: "error"; error: string };

export const useClientForm = () => {
  const [state, setState] = useState<FormState>(null);

  const {
    register,
    control,
    handleSubmit,
    reset: resetFields,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ClientInput>({
    resolver: zodResolver(clientSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ClientInput) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 201) {
        setState({ status: "success", fullName: data.fullName });
        return;
      }

      const body = (await res.json()) as { error: { message?: string } };

      if (res.status === 409) {
        setState({ status: "error", error: body.error.message ?? "Dados já cadastrados." });
        return;
      }

      setState({ status: "error", error: "Ocorreu um erro inesperado. Tente novamente." });
    } catch {
      setState({ status: "error", error: "Não foi possível conectar ao servidor. Tente novamente." });
    }
  };

  const reset = () => {
    setState(null);
    resetFields();
  };

  return { state, reset, register, control, errors, isSubmitting, isValid, handleSubmit, onSubmit };
};
