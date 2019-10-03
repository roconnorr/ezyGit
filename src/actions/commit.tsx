export const EMAIL_CHANGED = 'email_changed';

export const changeEmail = (email: any) => ({
  type: EMAIL_CHANGED,
  email,
});
