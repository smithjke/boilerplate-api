import mongoose from 'mongoose';
import { virtualId } from '~/1st-server-mongo';
import { Role } from '~/api';

export const roleSchema = new mongoose.Schema<Role & { _id: mongoose.Types.ObjectId }>({
  name: String,
  permissions: String,
  createdAt: Date,
  updatedAt: Date,
});

roleSchema.virtual<string>('id').get(virtualId);

export const RoleModel = mongoose.model<Role>('Role', roleSchema);
