import { Button } from "@/components/ui/button"

function SignupForm() {
  return (
    <>
      <section className="flex flex-1 justify-center items-center flex-col">
        <Button>Click me</Button>
      </section>
      <img src="/assets/images/side-img.svg"
      alt="slid-image"
      className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat" />
     </>
  )
}

export default SignupForm