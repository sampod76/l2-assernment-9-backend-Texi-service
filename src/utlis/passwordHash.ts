/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import config from '../config';

export const passwordHash = async (password: string) => {
  const result = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  );
  return result;
};
