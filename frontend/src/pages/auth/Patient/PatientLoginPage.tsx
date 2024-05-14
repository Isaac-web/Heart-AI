import Form from "@/components/form/Form";
import FormSubmitButton from "@/components/form/FormSubmitButton";
import FormTextfield from "@/components/form/FormTextfield";
import { Email, Key } from "@mui/icons-material";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(7).required(),
});

const PatientLoginPage = () => {
  return (
    <section className="w-full min-h-screen flex">
      <div className="w-full lg:w-1/2 flex justify-center py-10 bg-white">
        <div className="min-w-[30em]">
          <div>
            <div className="mb-12 flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-center mb-5 text-text-heading-color">
                Patient Sign In
              </h3>
              <span className="text-sm  text-center w-full text-text-subtitle-color">
                We suggest you use your work email
              </span>
            </div>

            <Form
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(data) => {
                console.log(data);
              }}
              validationSchema={validationSchema}
            >
              <div className="flex flex-col space-y-5 ">
                <div>
                  <FormTextfield
                    name="email"
                    label="Email"
                    placeholder="example@email.com"
                    startAdornment={<Email fontSize="small" />}
                  />
                </div>

                <div>
                  <FormTextfield
                    name="password"
                    label="Password"
                    placeholder="Input your user password"
                    startAdornment={<Key fontSize="small" />}
                  />
                </div>

                <div>
                  <FormSubmitButton className="bg-button-color">
                    Sign In
                  </FormSubmitButton>
                </div>
              </div>
            </Form>

            <div className="my-8 w-full ">
              <span className="w-full inline-block text-center text-sm">
                OR
              </span>
            </div>

            <div className="flex gap-5 mb-10">
              <button className="text-center flex-1 btn rounded-md text-white bg-button-color">
                Continue with Google
              </button>
              <button className="text-center flex-1  btn text-white rounded-md bg-button-color">
                Continue with Apple
              </button>
            </div>
          </div>

          <div className="">
            <p className="text-center mb-20 text-sm">
              Don't have an account yet?{" "}
              <Link to="/patient-signup" className="text-primary cursor-pointer">
                Sign Up
              </Link>
            </p>

            <p className="text-center text-xs">
              By Creating An Account, You agree to our{" "}
              <span className="text-primary cursor-pointer">terms</span> and{" "}
              <span className="text-primary cursor-pointer">conditions</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="w-1/2 bg-bg-color p-11">
        <img src="src/assets/images/doctor-main.png" alt="" />
      </div>
    </section>
  );
};

export default PatientLoginPage;
