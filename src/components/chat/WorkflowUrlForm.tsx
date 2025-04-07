
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Info, AlertCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const urlSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }).min(1, { message: "URL is required" }),
});

interface WorkflowUrlFormProps {
  initialUrl: string;
  onSaveUrl: (url: string) => void;
  onTestConnection: () => void;
  testInProgress: boolean;
}

const WorkflowUrlForm: React.FC<WorkflowUrlFormProps> = ({
  initialUrl,
  onSaveUrl,
  onTestConnection,
  testInProgress,
}) => {
  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: initialUrl || "",
    },
  });

  const onSubmit = (values: z.infer<typeof urlSchema>) => {
    onSaveUrl(values.url);
  };

  return (
    <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
      <div className="flex items-center gap-2 mb-2">
        <Info className="h-4 w-4 text-blue-500" />
        <h3 className="text-sm font-medium">n8n Workflow Connection</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">n8n Webhook URL</FormLabel>
                <div className="flex space-x-2">
                  <FormControl>
                    <input
                      placeholder="Enter your n8n workflow webhook URL here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    size="sm"
                    variant="outline"
                    className="text-xs"
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    onClick={onTestConnection}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    disabled={testInProgress}
                  >
                    {testInProgress ? "Testing..." : "Test"}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
        <div className="flex gap-2 items-start">
          <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
          <div>
            <h4 className="text-xs font-medium text-amber-800">Troubleshooting 500 Errors</h4>
            <ul className="text-xs text-amber-700 mt-1 list-disc list-inside space-y-1">
              <li>Check your n8n workflow is published and active</li>
              <li>Verify your webhook node is correctly configured</li>
              <li>Make sure your workflow expects "message" and "history" in the payload</li>
              <li>Check if your workflow returns a JSON response with a "response" property</li>
              <li>View the n8n execution logs for more detailed error information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowUrlForm;
