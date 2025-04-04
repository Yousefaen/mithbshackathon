"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  Input,
  Textarea,
  Checkbox,
  Button,
  Select,
} from "@/components/ui/form";
import { useState } from "react";

// Define the form schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  priority: z.string().min(1, { message: "Please select a priority" }),
  receiveUpdates: z.boolean().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function FormWithReusableComponents() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const methods = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      priority: "",
      receiveUpdates: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    console.log("Form submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    methods.reset();
    alert("Form submitted successfully!");
  };

  const priorityOptions = [
    { value: "", label: "Select priority" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  return (
    <FormProvider {...methods}>
      <Form form={methods} onSubmit={onSubmit} className="space-y-4">
        <FormField name="name" label="Name">
          <Input id="name" {...methods.register("name")} />
        </FormField>
        
        <FormField name="email" label="Email">
          <Input id="email" type="email" {...methods.register("email")} />
        </FormField>
        
        <FormField name="subject" label="Subject">
          <Input id="subject" {...methods.register("subject")} />
        </FormField>
        
        <FormField name="priority" label="Priority">
          <Select 
            id="priority" 
            options={priorityOptions} 
            {...methods.register("priority")} 
          />
        </FormField>
        
        <FormField name="message" label="Message">
          <Textarea 
            id="message" 
            rows={4} 
            {...methods.register("message")} 
          />
        </FormField>
        
        <FormField name="receiveUpdates">
          <Checkbox 
            id="receiveUpdates" 
            label="Receive updates about this inquiry" 
            {...methods.register("receiveUpdates")} 
          />
        </FormField>
        
        <Button type="submit" isLoading={isSubmitting}>
          Submit
        </Button>
      </Form>
    </FormProvider>
  );
}
