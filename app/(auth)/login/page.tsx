"use client"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { ArrowRight, Loader2 } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const LoginPage = () => {
  const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  // const session = useSession()
  const { data: session, status: sessionStatus } = useSession()

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/")
    }
  }, [sessionStatus, router])
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Invlid email and password",
        description: "Please provide a valid email and password",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return;
    }

    try {
      setIsLoading(true)
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password
      })
  
      if (res?.error) {
        toast({
          variant: "destructive",
          title: "Invlid email and password",
          description: "Please provide a valid email and password",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
        if (res?.url) router.replace("/")
      } 
    } catch (error:any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      console.log("Error while creating user", error.message);
    } finally{
      setIsLoading(false);
    }
  }

  if (sessionStatus === 'loading') {
    return <>
      <Loader2 className='w-10 h-10 animate-spin' />
    </>
  }
  return (
    sessionStatus !== "authenticated" && <section>
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">

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
                  {isLoading ? <Loader2 className='w-8 h-8 animate-spin' /> : <>Get started<ArrowRight className="ml-2" size={16} /></>}
                </button>
              </div>
            </div>
          </form>

          <button
            onClick={() => signIn("github")}
            type="button"
            className="mt-4 relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
          >
            <span className="mr-2 inline-block">
              
              <svg 
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                className="lucide lucide-github"
              >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </span>
            Sign in with Github
          </button>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
