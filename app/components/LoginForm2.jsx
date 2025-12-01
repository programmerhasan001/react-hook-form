"use client";

import { useForm } from "react-hook-form";

const LoginForm2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data, "data---");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="block border"
          type="text"
          placeholder="username"
          {...register("username", {
            required: "this field is required",
            minLength: { value: 3, message: "minimum three characters" },
          })}
        />
        {errors?.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
        <input
          className="block border mt-2"
          type="password"
          placeholder="password"
          {...register("password", {
            required: "this fields is required",
            minLength: { value: 6, message: "minimum six characters" },
          })}
        />
        {errors?.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
        <button className="block border mt-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm2;
