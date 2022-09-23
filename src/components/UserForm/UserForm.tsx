import React, { ReactElement, useEffect } from 'react'
import { useForm, DeepPartial, Path, Resolver, FieldValues } from 'react-hook-form'

import FormTitle from '../UI/formTitle/formTitle'

import styles from './userForm.module.css'

interface UserFormProps<T extends FieldValues> {
  onSubmit: (data: T) => void
  children: (ReactElement | null)[]
  title: string
  resolver: Resolver<T> | undefined
  defaultValues?: DeepPartial<T>
  serverErrors?: IServerError<T>[]
}

export interface IServerError<T> {
  name: Path<T>
  option: {
    type: 'server'
    message: string
  }
}

const UserForm = <T extends Record<string, unknown>>({
  children,
  onSubmit,
  resolver,
  title,
  defaultValues,
  serverErrors,
  ...rest
}: UserFormProps<T>): JSX.Element => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<T>({ defaultValues, resolver })

  function setServerErrors(e: IServerError<T>[] | undefined) {
    if (e) e.map((error) => setError(error.name, error.option))
  }

  useEffect(() => {
    setServerErrors(serverErrors)
  }, [serverErrors])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.user_form} {...rest}>
      <FormTitle>{title}</FormTitle>
      {React.Children.map(children, (child) => {
        if (child && child.props.name)
          return React.createElement(child.type, {
            ...{
              ...child.props,
              register,
              key: child.props.name,
              error: errors[child.props.name],
            },
          })
        return child
      })}
    </form>
  )
}

UserForm.defaultProps = {
  defaultValues: undefined,
  serverErrors: undefined,
}

export default UserForm
