import { NewBookForm } from "@/components/Forms/NewBookForm";

export default function NewBookPage() {
  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col w-full items-center">
        <h1 className="font-mono font-semibold text-base md:text-2xl mb-4">
          ~ Create a new book ~
        </h1>
        <NewBookForm />
      </div>
    </div>
  );
}
