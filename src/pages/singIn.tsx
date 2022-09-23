import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import UserForm from '../components/UserForm/UserForm'
import singUpSchema from '../schemes/singUpSchema'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/button/button'
import MakeFormErrors from '../utils/makeFormErrorsFromServer'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { clearError, signIn } from '../redux/slices/userSlice'
import getUserData from '../redux/selectors/userSelector'

import styles from './pages.module.css'

type SignInData = {
  email: string
  password: string
}

function SignIn() {
  const { info, status, error, loadingInitial } = useAppSelector(getUserData)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onSubmit = ({ email, password }: SignInData) => dispatch(signIn({ email, password }))

  useEffect(() => {
    if (info && !loadingInitial) navigate('/')
  }, [info, loadingInitial])

  useEffect(() => {
    dispatch(clearError())
  }, [])

  return (
    <section>
      <UserForm<SignInData>
        title="Sign In"
        onSubmit={onSubmit}
        resolver={yupResolver(singUpSchema)}
        serverErrors={error && MakeFormErrors(error)}
      >
        <Input<SignInData> name="email" placeholder="Email address" label="Email address" />

        <Input<SignInData> name="password" placeholder="Password" label="Password" type="password" />

        <Button submit loading={status === 'loading'}>
          Login
        </Button>

        <p className={styles.secondary_text}>
          Don’t have an account?
          <Link to="/sign-up" className={styles.link}>
            Sign Up.
          </Link>
        </p>
      </UserForm>
    </section>
  )
}

export default SignIn
