import type * as React from "react";
import type { UseFormRegister, FieldErrors, ChangeHandler, Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { ClientInput } from "shared";
import { maskCpf } from "shared";
import { TextInput, TextareaInput } from "../../../../components/input";
import { PrimaryButton } from "../../../../components/button";
import { ColorSelectInput } from "../colorSelect";

type Props = {
  register: UseFormRegister<ClientInput>;
  control: Control<ClientInput>;
  errors: FieldErrors<ClientInput>;
  isSubmitting: boolean;
  isValid: boolean;
  onSubmit: React.ComponentProps<"form">["onSubmit"];
};

export const ClientFormFields = ({ register, control, errors, isSubmitting, isValid, onSubmit }: Props) => {
  const nameReg = register("fullName");
  const cpfReg = register("cpf");

  const handleNameChange: ChangeHandler = (e) => {
    e.target.value = String(e.target.value).replace(/\d/g, "");
    return nameReg.onChange(e);
  };

  const handleCpfChange: ChangeHandler = (e) => {
    e.target.value = maskCpf(String(e.target.value));
    return cpfReg.onChange(e);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <TextInput
        id="fullName"
        label="Nome completo"
        type="text"
        autoComplete="name"
        placeholder="João da Silva"
        registration={{ ...nameReg, onChange: handleNameChange }}
        error={errors.fullName?.message}
        disabled={isSubmitting}
      />

      <TextInput
        id="cpf"
        label="CPF"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        placeholder="000.000.000-00"
        maxLength={14}
        registration={{ ...cpfReg, onChange: handleCpfChange }}
        error={errors.cpf?.message}
        disabled={isSubmitting}
      />

      <TextInput
        id="email"
        label="E-mail"
        type="email"
        autoComplete="email"
        placeholder="joao@exemplo.com"
        registration={register("email")}
        error={errors.email?.message}
        disabled={isSubmitting}
      />

      <Controller
        name="favoriteColor"
        control={control}
        render={({ field }) => (
          <ColorSelectInput
            label="Cor preferida"
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.favoriteColor?.message}
            disabled={isSubmitting}
          />
        )}
      />

      <TextareaInput
        id="notes"
        label="Observações"
        optional
        rows={3}
        placeholder="Informações adicionais..."
        registration={register("notes")}
        disabled={isSubmitting}
      />

      <PrimaryButton type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? "Enviando..." : "Cadastrar"}
      </PrimaryButton>
    </form>
  );
};
