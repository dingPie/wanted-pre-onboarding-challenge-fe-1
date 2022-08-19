/**
 * 이메일 형식 검사
 * @param email 입력 이메일
 * @returns boolean
 */
export const checkEmailForm = (email: string) => {
  const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  return regEmail.test(email)
}

/**
 * 패스워드 형식 검사
 * @param pw 
 * @returns boolean
 */
export const checkPwForm = (pw: string) => {
  return pw.length >= 8
}