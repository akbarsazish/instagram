import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl,FormDescription,FormField,FormItem,  FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { SignupValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "../../components/shared/Loader";
import { Link } from "react-router-dom";
 


function SignupForm() {
  const isLoading = false;

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })
 
  
  function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <>
      <Form {...form}>
        <div className="sm:w-420 flex flex-center flex-col">
          <img src="/assets/images/logo.svg" />
          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            create a new account 
          </h2>
          <p className="text-light-3 small-medium md:base-regular"> 
            To use instagram, please enter your account details.
          </p>
       
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-4 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" className="shad-input" {...field} />
                    </FormControl>
                 
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" className="shad-input" {...field} />
                    </FormControl>
                 
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" className="shad-input" {...field} />
                    </FormControl>
                 
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" className="shad-input" {...field} />
                    </FormControl>
                 
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="shad-button_primary" type="submit">
                {isLoading?  (
                  <div className="gap-2 flex-center">
                     <Loader /> Loading ...
                  </div>
                ) : "Sign Up" }
              </Button>
              <p className="text-smal-regular text-light-2 text-center mt-2">
                Already have an account? 
                <Link to="/sign-in" className="text-primary-500 text-small-simibold ml-1"> Login </Link>
              </p>
            </form>
           </div>
        </Form>
     </>
  )
}

export default SignupForm