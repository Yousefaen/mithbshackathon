import { SimpleForm } from "@/components/SimpleForm";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Welcome to My V0 Project</h1>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sample Form</h2>
        <SimpleForm />
      </div>
    </div>
  );
}
