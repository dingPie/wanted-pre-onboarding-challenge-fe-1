export const checkEmailForm = (email: string) => {
  const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  return regEmail.test(email)
}

export const checkPwForm = (pw: string) => {
  return pw.length >= 8
}