import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast"
import {Form,FormControl,FormField,FormItem,  FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { SignupValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "../../components/shared/Loader";
import { Link } from "react-router-dom";
import { useCreateUserAccount, useSignInAccount} from "@/lib/react-query/queriesAndMutations";

 
function SignupForm() {
  const { toast } = useToast();

  const { mutateAsync: createUserAccount, isLoading: isCreatingUser } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isLoading: isSigningInUser } = useSignInAccount();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })
 
  
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);
    if(!newUser) {
      return toast({
        title: "Sign up failed. Please try again.",
      })
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    
    if(!session) {
      return toast({
        title: "Sign In failed. Please try again.",
      })
    }
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
                {isCreatingUser?  (
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