import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createUser } from './user.functions';
import type { CreateUserPayload } from '../types/models.types';

const getCreateUserError = (error: Error): string =>
  axios.isAxiosError<{ message?: string }>(error)
    ? error.response?.data?.message?.trim() || error.message
    : error.message;

export const useCreateUserForm = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserPayload>();

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