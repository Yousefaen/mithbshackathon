"use client";

import { useState } from "react";
import { BasicForm } from "@/components/BasicForm";
import { ProfileForm } from "@/components/ProfileForm";
import { FormWithDialog } from "@/components/FormWithDialog";
import { FormWithReusableComponents } from "@/components/FormWithReusableComponents";
import * as Accordion from "@radix-ui/react-accordion";

export default function FormsPage() {
  const [activeForm, setActiveForm] = useState<string>("basic");

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <h1 className="mb-6 text-3xl font-bold">Form Examples with React Hook Form and Zod</h1>
      
      <div className="mb-8">
        <p className="text-gray-700">
          This page demonstrates different form patterns using React Hook Form with Zod validation.
          Each example shows how to handle form state, validation, and submission.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="sticky top-8 space-y-2">
            <button
              onClick={() => setActiveForm("basic")}
              className={`w-full rounded-md px-4 py-2 text-left text-sm font-medium ${
                activeForm === "basic"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Basic Form
            </button>
            <button
              onClick={() => setActiveForm("profile")}
              className={`w-full rounded-md px-4 py-2 text-left text-sm font-medium ${
                activeForm === "profile"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Profile Form
            </button>
            <button
              onClick={() => setActiveForm("dialog")}
              className={`w-full rounded-md px-4 py-2 text-left text-sm font-medium ${
                activeForm === "dialog"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Form with Dialog
            </button>
            <button
              onClick={() => setActiveForm("reusable")}
              className={`w-full rounded-md px-4 py-2 text-left text-sm font-medium ${
                activeForm === "reusable"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Reusable Components
            </button>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {activeForm === "basic" && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">Basic Form</h2>
                <p className="mb-6 text-gray-600">
                  A simple form with email and password fields, demonstrating basic validation with Zod.
                </p>
                <BasicForm />
              </div>
            )}
            
            {activeForm === "profile" && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">Profile Form</h2>
                <p className="mb-6 text-gray-600">
                  A more complex form with various field types and validation rules.
                </p>
                <ProfileForm />
              </div>
            )}
            
            {activeForm === "dialog" && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">Form with Dialog</h2>
                <p className="mb-6 text-gray-600">
                  A form inside a Radix UI Dialog component, demonstrating how to integrate forms with UI components.
                </p>
                <div className="flex justify-center">
                  <FormWithDialog />
                </div>
              </div>
            )}
            
            {activeForm === "reusable" && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">Form with Reusable Components</h2>
                <p className="mb-6 text-gray-600">
                  A form built using reusable form components, demonstrating a more maintainable approach to form creation.
                </p>
                <FormWithReusableComponents />
              </div>
            )}
          </div>
          
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Implementation Details</h2>
            
            <Accordion.Root type="single" collapsible className="space-y-2">
              <Accordion.Item value="item-1" className="rounded-md border border-gray-200">
                <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-gray-50">
                  <span>Form Setup</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform duration-200 ui-open:rotate-180"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden px-4 pb-3 text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="text-gray-700">
                    <p>To set up a form with React Hook Form and Zod:</p>
                    <ol className="ml-4 mt-2 list-decimal space-y-1">
                      <li>Import the necessary dependencies</li>
                      <li>Define a schema using Zod</li>
                      <li>Use the useForm hook with zodResolver</li>
                      <li>Create a form with register and handleSubmit</li>
                    </ol>
                    <pre className="mt-2 overflow-x-auto rounded bg-gray-100 p-2">
                      <code>{`import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.string().email(),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});`}</code>
                    </pre>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
              
              <Accordion.Item value="item-2" className="rounded-md border border-gray-200">
                <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-gray-50">
                  <span>Validation with Zod</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform duration-200 ui-open:rotate-180"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden px-4 pb-3 text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="text-gray-700">
                    <p>Zod provides a powerful way to validate form data:</p>
                    <ul className="ml-4 mt-2 list-disc space-y-1">
                      <li>String validation: min/max length, regex, email, url</li>
                      <li>Number validation: min/max, integer, positive/negative</li>
                      <li>Boolean validation</li>
                      <li>Optional fields and nullable fields</li>
                      <li>Custom error messages</li>
                    </ul>
                    <pre className="mt-2 overflow-x-auto rounded bg-gray-100 p-2">
                      <code>{`const schema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email({ message: "Invalid email" }),
  age: z.number().min(18, "Must be 18 or older"),
  website: z.string().url().optional(),
});`}</code>
                    </pre>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
              
              <Accordion.Item value="item-3" className="rounded-md border border-gray-200">
                <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-gray-50">
                  <span>Form Submission</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform duration-200 ui-open:rotate-180"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden px-4 pb-3 text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="text-gray-700">
                    <p>Handling form submission with React Hook Form:</p>
                    <ol className="ml-4 mt-2 list-decimal space-y-1">
                      <li>Create an onSubmit function</li>
                      <li>Use handleSubmit to process the form</li>
                      <li>Handle loading states during submission</li>
                      <li>Display success/error messages</li>
                    </ol>
                    <pre className="mt-2 overflow-x-auto rounded bg-gray-100 p-2">
                      <code>{`const onSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    // API call or other logic
    await submitData(data);
    // Success handling
  } catch (error) {
    // Error handling
  } finally {
    setIsSubmitting(false);
  }
};

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    {/* Form fields */}
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  </form>
);`}</code>
                    </pre>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </div>
      </div>
    </div>
  );
}