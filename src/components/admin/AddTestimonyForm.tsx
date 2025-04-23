
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAppData } from "@/context/AppDataContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";

const testimonyFormSchema = z.object({
  content: z.string().min(2, "O conteúdo do testemunho é obrigatório"),
  author: z.string().min(2, "O autor do testemunho é obrigatório"),
});

export const AddTestimonyForm = () => {
  const { addTestimony } = useAppData();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof testimonyFormSchema>>({
    resolver: zodResolver(testimonyFormSchema),
    defaultValues: {
      content: "",
      author: "",
    },
  });

  function onSubmit(values: z.infer<typeof testimonyFormSchema>) {
    addTestimony({
      content: values.content,
      author: values.author,
    });
    form.reset();
    toast({
      title: "Testemunho adicionado",
      description: "O testemunho foi adicionado com sucesso.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Testemunho</CardTitle>
        <CardDescription>
          Adicione um novo testemunho à página de oração.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Testemunho</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Texto do testemunho" 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autor</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da pessoa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Testemunho
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
