import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Role, Mode } from "../types/user";

type FormValues = {
  email: string;
  password?: string;
};

export default function AuthForm({
  role,
  mode,
  onSuccess,
  onError,
}: {
  role: Role;
  mode: Mode;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}) {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    if (mode === "login") {
      if (data.email === "test@example.com" && data.password === "123456") {
        router.push(`/${role}/dashboard`);
        onSuccess("Login berhasil!");
      } else {
        onError("Email atau password salah");
      }
    } else {
      onSuccess(`Link verifikasi sudah dikirim ke ${data.email}`);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: true })}
        className="border rounded p-2"
      />
      {mode === "login" && (
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          className="border rounded p-2"
        />
      )}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {mode === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}
