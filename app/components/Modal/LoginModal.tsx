'use client';

import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from 'next/navigation';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from 'next-auth/react';
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";

const LoginModal: React.FC = () => {
    const router = useRouter();

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({ defaultValues: { email: '', password: '' } });

    const onSubmit = (data: FieldValues) => {
        setIsLoading(true)

        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((callback) => {
                setIsLoading(false)
                if (callback?.ok) {
                    toast.success("Logged in");
                    router.refresh();
                    loginModal.onClose()
                }
                if (callback?.error) {
                    toast.error(callback.error);
                }
            })
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4" >
            <Heading title="Welcome back" subtitle="Login To Your Account" />
            <Input id="email" label="Email" disable={isLoading} register={register} errors={errors} required />
            <Input id="password" label="Password" type="password" disable={isLoading} register={register} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3" >
            <hr />
            < Button outline label="Continue with Google" icon={FcGoogle} onClick={() => { }} />
            < Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => signIn('github')} />
            < div className="text-neutral-500 text-center mt-4 font-light" >
                <div className="flex flex-row items-center gap-2 justify-center" >
                    <div>First time using Airbnb ? </div>
                    < div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline" >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modal disabled={isLoading} isOpen={loginModal.isOpen} title="Login" actionLabel="Continue" onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
    )
}

export default LoginModal