"use client";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const LoginForm = () => {
  const [data, setData] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      socials: [{ url: "" }],
      dob: new Date(),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socials",
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data?.dob.toISOString().split("T")[0]);
    console.log(data?.photo[0]);
    console.log(data?.photos);
    console.log(data);
    setData(data);
    reset();
  };

  const password = watch("password");
  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 w-3/4 mx-auto mt-10"
      >
        <h2 className="text-2xl font-bold mb-4">Login Form</h2>
        <input
          className="border p-2 rounded block w-full"
          type="email"
          name="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors?.email && (
          <p className="text-red-500">{errors?.email?.message}</p>
        )}
        <input
          className="border p-2 rounded block w-full"
          type="password"
          name="password"
          {...register("password", {
            required: "this field cannot be empty",
            minLength: { value: 6, message: "Must be at least 6 characters" },
          })}
        />
        {errors?.password && (
          <p className="text-red-500">{errors?.password?.message}</p>
        )}
        <input
          className="border p-2 rounded block w-full"
          type="password"
          name="confirmPassowrd"
          {...register("confirmPassword", {
            required: "please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors?.confirmPassword && (
          <p className="text-red-500">{errors?.confirmPassword?.message}</p>
        )}
        <div className="my-4 border p-4 rounded">
          <h3 className="font-bold mb-2">Social Links</h3>

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                className="border p-2 rounded flex-grow"
                placeholder="https://..."
                {...register(`socials.${index}.url`, {
                  required: "URL is required",
                })}
              />
              {errors.socials && errors.socials[index] && (
                <p className="text-red-500">
                  {errors.socials[index]?.url?.message}
                </p>
              )}
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Append Button */}
          <button
            type="button"
            onClick={() => append({ url: "" })}
            className="bg-green-500 text-white p-2 rounded mt-2"
          >
            Add Link
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Select Role</label>

          <Controller
            name="role"
            control={control}
            defaultValue=""
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              // 'field' contains { onChange, onBlur, value, ref }
              // We spread it onto the element so React Hook Form takes control
              <select {...field} className="border p-2 rounded w-full">
                <option value="">Select a role...</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
              </select>
            )}
          />

          {errors.role && <p className="text-red-500">{errors.role.message}</p>}
        </div>
        <div>
          <label htmlFor="#" className="block capitalize mb-1">
            choose subjects
          </label>
          <input
            className="mr-1"
            type="radio"
            name="subjects"
            id="CSE"
            value="CSE"
            {...register("subjects")}
          />
          <label htmlFor="CSE" className="mr-2">
            CSE
          </label>
          <input
            className="mr-1"
            type="radio"
            name="subjects"
            id="EEE"
            value="EEE"
            {...register("subjects")}
          />
          <label htmlFor="EEE" className="mr-2">
            EEE
          </label>
        </div>
        <div className="flex gap-2">
          <label>
            <input type="checkbox" value="HTML" {...register("skills")} /> HTML
          </label>

          <label>
            <input type="checkbox" value="CSS" {...register("skills")} /> CSS
          </label>

          <label>
            <input type="checkbox" value="React" {...register("skills")} />
            React
          </label>
        </div>
        <div>
          <label className="block mb-1">Select Date of Birth</label>
          <Controller
            name="dob"
            control={control}
            rules={{ required: "Date of birth is required" }}
            render={({ field }) => (
              <DatePicker
                placeholderText="Select date"
                className="border p-2 rounded"
                selected={field?.value}
                showYearDropdown
                showMonthDropdown
                onChange={(data) => field?.onChange(data)}
              />
            )}
          />
          {errors?.dob && (
            <p className="text-red-500">{errors?.dob?.message}</p>
          )}
        </div>
        <input
          type="file"
          className="px-2 py-1 rounded border"
          {...register("photo", { required: "photo is required" })}
        />
        {errors?.photo && (
          <p className="text-red-500">{errors?.photo?.message}</p>
        )}
        <p className="font-bold underline">Multiple photo upload</p>
        <input
          className="px-2 py-1 rounded border"
          type="file"
          multiple
          {...register("photos", { required: "Photos are required" })}
        />
        {errors?.photos && (
          <p className="text-red-500">{errors?.photos?.message}</p>
        )}
        <p className="font-bold underline">Favorite Color</p>
        <input
          className="block w-64"
          type="color"
          {...register("favoriteColor", {
            required: "Favorite color is required",
          })}
        />
        {errors?.favoriteColor && (
          <p className="text-red-500">{errors?.favoriteColor?.message}</p>
        )}
        <p className="font-bold underline">Select Range</p>
        <input
          className="w-64"
          min={0}
          max={100}
          type="range"
          {...register("range", { required: "Range is required" })}
        />
        {errors?.range && (
          <p className="text-red-500">{errors?.range?.message}</p>
        )}

        <button
          className="bg-green-500 text-white py-2 px-6 text-center rounded-lg w-full"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
      </form>
      <div className="mt-10 w-3/4 mx-auto">
        <h3 className="text-xl font-bold mb-2">Form Data:</h3>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default LoginForm;
