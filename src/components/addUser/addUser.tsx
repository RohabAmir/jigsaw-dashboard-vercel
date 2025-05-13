import { AddUserForm } from "./addUser-form";

export default function AddUserPage() {
  return (
    <div
      style={{
        background: "var(--add-user-bg)",
      }}
      className="flex min-h-svh flex-col items-center justify-center gap-6  p-6 md:p-10"
    >
      <div className="flex w-full max-w-sm flex-col gap-6 ">
        <AddUserForm />
      </div>
    </div>
  );
}
