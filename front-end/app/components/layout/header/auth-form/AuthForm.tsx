import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaUserCircle } from 'react-icons/fa'
import { IAuthFields } from '@/components/layout/header/auth-form/auth-form.interface'
import { validEmail } from '@/components/layout/header/auth-form/auth.validation'
import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/field/Field'
import { useOutside } from '@/hooks/useOutside'
import stylesIcon from '../icons-right/IconsRight.module.scss'
import styles from './AuthForm.module.scss'

const AuthForm: FC = () => {
	const { ref, isShow, setIsShow } = useOutside(false)

	const [type, setType] = useState<'login' | 'register'>('login')

	// /useActions

	// const { isLoading } = useAuth()

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<IAuthFields>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IAuthFields> = data => {
		if (type === 'login') {
		} else {
		}
	}

	return (
		<div className={styles.wrapper} ref={ref}>
			<button className={stylesIcon.button} onClick={() => setIsShow(!isShow)}>
				<FaUserCircle fill='#A4A4A4' />
			</button>
			{isShow && (
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Field
						{...register('email', {
							required: 'E-mail is required!',
							pattern: {
								value: validEmail,
								message: 'E-mail is not valid'
							}
						})}
						placeholder='E-mail'
						error={errors.email}
					/>

					<Field
						{...register('password', {
							required: 'Password is required!',
							minLength: {
								value: 6,
								message: 'Min length of password is 6'
							}
						})}
						placeholder='Password'
						error={errors.password}
						type='password'
					/>

					<div className='mt-5 mb-1 text-center'>
						<Button onClick={() => setType('login')}>Log in</Button>
					</div>

					<button
						className={styles.register}
						onClick={() => setType('register')}
					>
						Sign up
					</button>
				</form>
			)}
		</div>
	)
}

export default AuthForm
