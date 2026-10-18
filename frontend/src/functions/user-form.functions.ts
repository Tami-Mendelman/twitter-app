import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { createUser } from './user.functions';
import type { CreateUserPayload } from '../types/models.types';

export const useCreateUserForm = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('translation', {
    keyPrefix: 'CREATE_USER_PAGE',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserPayload>();

  const getCreateUserError = (error: Error): string => {
    if (!axios.isAxiosError<{ code?: string; message?: string }>(error)) {
      return error.message;
    }

    if (error.response?.data?.code === 'USERNAME_ALREADY_EXISTS') {
      return t('USERNAME_EXISTS');
    }

    return error.response?.data?.message?.trim() || error.message;
  };

  const invalidateUsers = async (): Promise<void> => {
    await queryClient.invalidateQueries({ queryKey: ['users'] });
  };

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: invalidateUsers,
  });

  const submitUser = (payload: CreateUserPayload): void => {
    mutation.mutate(payload);
  };

  const handleFormSubmit = handleSubmit(submitUser);

  const resetForm = (): void => {
    reset();
  };

  return {
    register,
    handleFormSubmit,
    resetForm,
    errors,
    isPending: mutation.isPending,
    error: mutation.error ? getCreateUserError(mutation.error) : null,
    isSuccess: mutation.isSuccess,
  };
};