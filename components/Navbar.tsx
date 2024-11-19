'use client'
import Link from "next/link"
import { Button } from "@nextui-org/button"
import{useSession} from 'next-auth/react'
import Image from 'next/image'
function Navbar() {
    const {data:session} = useSession()
    console.log(session,'session')
  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full border-gray-200 dark:border-gray-600 flex justify-between">
    <Link href="/" className="font-bold text-xl">AAYUS KARKI</Link>      
    {
    !session?(<Link href='/auth/signin'>
      <Button>Login</Button>
    </Link>):(
      <>
        <form>
        <Button type="submit">SignOut </Button>
        </form>
        <div className="flex">
          <h1>{session.user?.name}</h1>
        <Image src={session.user?.image!} width={50} height={50} alt="avatar" className="rounded-full" />
        </div>
        </>
    )
    }
    </nav>
  )
}

export default Navbar