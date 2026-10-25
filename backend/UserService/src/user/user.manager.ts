import { userRepository } from "./user.repository.js";

export const userManager = {
    create: userRepository.create,
    getAll: userRepository.getAll,
    getById: userRepository.getById,
};
