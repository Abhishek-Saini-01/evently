"use client"
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useSession } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RegisterPage = () => {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { data: session, status: sessionStatus } = useSession()

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.replace("/")
        }
    }, [sessionStatus, router])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const fullName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        if (!fullName || !email || !password) {
            toast({
                variant: "destructive",
                title: "Invlid email and password",
                description: "Please provide enter all information",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            return;
        }

        try {
            setIsLoading(true);
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password
                })
            })

            if (res.status === 400) {
                toast({
                    variant: "destructive",
                    title: "Email is already in use",
                    description: "Please use another email address",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })

            }
            if (res.status === 200) {
                router.push("/login")
            }


        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            console.log("Error while creating user", error.message);

        } finally {
            setIsLoading(false);
        }


    }
    if (sessionStatus === 'loading') {
        return <>
            <Loader2 className='w-10 h-10 animate-spin' />
        </>
    }
    return (
        sessionStatus !== "authenticated" &&
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <div className="mb-4 flex justify-center">
                        <Image
                            src="/assets/images/logo.svg"
                            alt='logo'
                            width={128}
                            height={38}
                        />
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Sign up to create account
                    </h2>
                    <p className="mt-2 text-center text-base text-gray-600">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            title=""
                            className="font-medium text-black transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                    <form onSubmit={handleSubmit} className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="name" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Full Name{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Full Name"
                                        id="name"
                                    ></input>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Email address{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                    ></input>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Password{' '}
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        placeholder="Password"
                                        id="password"
                                    ></input>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    {isLoading ? <Loader2 className='w-8 h-8 animate-spin' /> : <>Create Account<ArrowRight className="ml-2" size={16} /></>}
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default RegisterPage
