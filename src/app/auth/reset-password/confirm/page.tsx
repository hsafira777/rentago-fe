import { Suspense } from "react";
import ConfirmResetPasswordClient from "./ConfirmResetPassword";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
      <ConfirmResetPasswordClient />
    </Suspense>
  );
}
