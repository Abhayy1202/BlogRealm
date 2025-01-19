import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError('');
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({userData}));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section
      id="authentication"
      className="min-h-screen bg-neutral-100 dark:bg-neutral-800 py-20"
    >
      <div className="max-w-md mx-auto px-4">
        <div
          className={`bg-white dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full pt-5 pl-5 max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300 leading-tight">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-black/60 dark:text-neutral-400">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline dark:text-neutral-300 "
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <div
            id="registerForm"
            className=" p-8 animate__animated animate__fadeIn"
          >
            <form onSubmit={handleSubmit(create)} className="space-y-6">
              <div>
                <Input
                  label="Full Name: "
                  placeholder="Enter your full name"
                  {...register("name", {
                    required: true,
                  })}
                />
              </div>

              <div>
                <Input
                  label="Email: "
                  placeholder="Enter your email"
                  type="email"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPatern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || "Email address must be a valid address",
                    },
                  })}
                />
              </div>
              <div>
                <Input
                  label="Password: "
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: true,
                  })}
                />
              </div>
              <Button
                type="submit"
                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Account
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
