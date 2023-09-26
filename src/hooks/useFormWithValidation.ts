import { useState, useCallback, SetStateAction } from 'react';
import { ChangeEvent } from 'react';

type useFormWithValidationTypes = {
  values: Record<string, any> 
  setValues:  React.Dispatch<SetStateAction<Record<string, any>>>
  handleChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void
  errors: Record<string, string>
  isFormValid: boolean
  resetForm: (
    newValues?: Record<string, any>, 
    newErrors?: Record<string, string>, 
    newIsFormValid?: boolean) => void
}

export function useFormWithValidation ():useFormWithValidationTypes {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const input: EventTarget & HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement = e.target;
    const name: string = input.name;
    const value: string = input.value;
    setValues((values) => ({...values, [name]: value}));
    setErrors((errors) => ({...errors, [name]: input.validationMessage}));
    if (input.closest('form')) {
      setIsFormValid(input.closest('form')!.checkValidity());
    }
  }

  // const handleBlur = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
  //   const input: EventTarget & HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement = e.target;
  //   const name: string = input.name;
  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [name]: '', // Очищаем ошибку для данного поля при потере фокуса
  //   }));
  // }
  

  const resetForm = useCallback((
    newValues = {}, 
    newErrors = {}, 
    newIsFormValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsFormValid(newIsFormValid);
  }, [setValues, setErrors, setIsFormValid]);

  return {values, setValues, handleChange, errors, isFormValid, resetForm}
}