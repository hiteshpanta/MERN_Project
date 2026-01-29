import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router"
import { useUserLoginMutation } from "./authApi"
import { Formik } from "formik"
import * as Yup from 'yup'
import toast from "react-hot-toast"
import { LockKeyhole, LockKeyholeOpenIcon, } from "lucide-react"
import { useState } from "react"
import { Spinner } from "../../components/ui/spinner"
import { useDispatch } from "react-redux"
import { setUser } from "../user/userSlice"

const loginShcema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(3).required()
})

export default function Login() {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useUserLoginMutation();
  return (
    <div className="p-5">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button onClick={() => nav('/signup')} variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>

          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={async (val) => {
              try {
                const response = await loginUser(val).unwrap();
                toast.success('Login successful');
                dispatch(setUser(response.data));
                nav(-1);
              } catch (err) {
                toast.error(err.data.data);
              }

            }}
            validationSchema={loginShcema}
          >
            {({ values, handleChange, errors, touched, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name='email'
                      onChange={handleChange}
                      value={values.email}
                      id="email"
                      type="email"
                      placeholder="m@example.com"

                    />
                    {errors.email && touched.email && <p className="text-red-500">
                      {errors.email}
                    </p>}

                  </div>


                  <div className='w-full max-w-xs space-y-2'>
                    <Label>Password</Label>
                    <div className='relative'>
                      <Input
                        onChange={handleChange}
                        value={values.password}
                        type={show ? 'text' : 'password'}
                        name='password' placeholder='******' className='pr-9' />

                      <Button
                        type='button'
                        onClick={() => setShow(!show)}
                        variant='ghost'
                        size='icon'
                        className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
                      >

                        {show ? <LockKeyholeOpenIcon /> : <LockKeyhole />}


                        <span className='sr-only'>Show password</span>
                      </Button>
                    </div>
                    {errors.password && touched.password && <p className="text-red-500">
                      {errors.password}
                    </p>}
                  </div>



                </div>

                {isLoading ? <Button size="sm" variant="outline" disabled className="w-full mt-5">
                  <Spinner />
                  Submit
                </Button> : <Button type="submit" className="w-full mt-5">
                  Login
                </Button>}





              </form>
            )}
          </Formik>

        </CardContent>

      </Card>
    </div >
  )
}



