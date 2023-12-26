"use client"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import MobileNav from "./MobileNav"
import NavItems from "./NavItems"

const Header = () => {
  const { data: session } = useSession()
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image 
            src="/assets/images/logo.svg" width={128} height={38}
            alt="Evently logo" 
          />
        </Link>

        {session?(
             <nav className="md:flex-between hidden w-full max-w-xs">
             <NavItems />
           </nav>
          ): null}

        <div className="flex w-32 justify-end gap-3">
          {session?(
            <MobileNav />
          ): null}
          {!session ? (
            <Button asChild className="rounded-full" size="lg">
              <Link href="/login">
                Login
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </DropdownMenuTrigger>
               <DropdownMenuContent>
                <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button onClick={()=>signOut()} className="w-full">Logout</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
            
        </div>
      </div>
    </header>
  )
}

export default Header