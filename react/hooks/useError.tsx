import { useState } from 'react';

interface ErrorProps {
  field: string;
  message: string;
}


export default function useErrors() {
  const [errors, setErrors] = useState<ErrorProps[]>([]);

  function appendNewError({ field, message }: ErrorProps) {
    const errorAlreadyExist = errors.find(({ field }) => field === 'email');

    if (errorAlreadyExist) {
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  function removeErrors(fieldName: string) {
    setErrors((prevState) => prevState.filter(
      ({ field }) => field !== fieldName,
    ));
  }

  function getMessageErrorByFieldName(fieldName: string) {
    return errors.find(
      ({ field }) => field === fieldName,
    )?.message;
  }

  return {
    errors,
    appendNewError,
    removeErrors,
    getMessageErrorByFieldName,
  };
}
