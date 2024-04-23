import { Input, Button, FormErrorMessage, FormLabel, FormControl } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';

import { auth } from '../../Firebase';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = (data) => {
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, data.email, data.password);
            })
            .then(() => {
                console.log("login successfully!");
            })
            .catch((error) => {
                if (error.code === "auth/invalid-credential") {
                    alert("そのようなユーザーは存在しません。");
                } else {
                    alert(error.message);
                }
            });
    }
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.email}>
                <FormLabel>メールアドレス</FormLabel>
                <Input
                placeholder="sample@email.com"
                _placeholder={{ opacity: "0.3", color: "gray.500" }}
                size="lg"
                p={3}
                bgColor="white"
                variant="flushed"
                onSubmit={handleSubmit(onSubmit)}
                {...register("email", {
                    required: "メールアドレスは必須です。",
                    pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                        message: "不適切なメールアドレスです。"
                    }
                })}
                />
                <FormErrorMessage>
                    {errors.email && errors.email.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
                <FormLabel>パスワード</FormLabel>
                <Input
                placeholder="●●●●●●●●●"
                _placeholder={{ opacity: "0.3", color: "gray.500" }}
                size="lg"
                p={3}
                type='password'
                bgColor="white"
                variant="flushed"
                {...register("password", {
                    required: "パスワードは必須です。",
                    minLength: {
                        value: "6",
                        message: "パスワードは6文字以上で入力してください。"
                    }
                })}
                />
                <FormErrorMessage>
                    {errors.password && errors.password.message}
                </FormErrorMessage>
            </FormControl>
            <Button
            colorScheme="blue"
            size="md"
            bgColor="white"
            variant="outline"
            px={7}
            mt={4}
            isLoading={isSubmitting}
            type="submit"
            >
            ログイン
            </Button>
        </form>
        </>
    )
}

export default Login;