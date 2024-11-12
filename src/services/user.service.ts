import { User, IUser } from '../models'

/* create user */
export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const user = new User(userData)
    return await user.save();
}

/* all user */
export const getAllUsers = async (): Promise<IUser[]> => {
    return await User.find();

}

/* get user by id */
export const getUserById = async (userId: string): Promise<IUser | null> => {
    return await User.findById(userId);
}

/* update user */
export const updateUser = async (userId: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true })
}

/* delete user */
export const deleteUser = async (userId: string): Promise<IUser | null> => {
    return await User.findByIdAndDelete(userId)

}