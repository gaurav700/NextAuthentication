"use client";
import { signup } from "@/actions/auth-actions";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function AuthForm() {
  const [state, formAction] = useFormState(signup, {});
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {state.errors && Object.keys(state.errors).length > 0 && (
        <ul id="form-errors">
          {Object.entries(state.errors).map(([errorKey, error]) =>
            Array.isArray(error) ? (
              error.map((errMsg, index) => (
                <li key={`${errorKey}-${index}`}>{errMsg}</li>
              ))
            ) : (
              <li key={errorKey}>{error}</li>
            )
          )}
        </ul>
      )}

      <p>
        <button type="submit">Create Account</button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}
