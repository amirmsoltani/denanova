export const errors = {
  login: {
    message: "اطلاعات وارد شده صحیح نمی باشد",
    status: 422,
    isHandledError: true,
  },
  form: (messages: any[]) => {
    return {
      status: 400,
      message: messages,
      isHandledError: true,
    };
  },
  auth: {
    status: 401,
    message: "شما اجازه دسترسی به این بخش را ندارید",
    isHandledError: true,
  },
  authInvalid: {
    status: 401,
    message: "اطلاعات دسترسی شما نا معتبر است",
    isHandledError: true,
  },
  notFound: {
    status: 404,
    message: "اطلاعات مورد نظر یافت نشد",
    isHandledError: true,
  },
  method: {
    status: 405,
    message: "Method Not Allowed",
  },
};

type Errors = typeof errors;

export const errorException = <K extends keyof Errors = keyof Errors>(
  error: K
): Errors[K] => {
  return errors[error];
};
