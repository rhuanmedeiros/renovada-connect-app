
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

const devotionalFormSchema = z.object({
  title: z.string().min(2, "O título é obrigatório"),
  verse: z.string().min(2, "O versículo é obrigatório"),
  reference: z.string().min(2, "A referência é obrigatória"),
  content: z.string().min(2, "O conteúdo é obrigatório"),
  date: z.string().min(2, "A data é obrigatória"),
});

export const AddDevotionalForm = () => {
  const { addDevotional } = useAppData();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof devotionalFormSchema>>({
    resolver: zodResolver(devotionalFormSchema),
    defaultValues: {
      title: "",
      verse: "",
      reference: "",
      content: "",
      date: new Date().toISOString().split('T')[0],
    },
  });

  function onSubmit(values: z.infer<typeof devotionalFormSchema>) {
    addDevotional({
      title: values.title,
      verse: values.verse,
      reference: values.reference,
      content: values.content,
      date: values.date,
    });
    form.reset();
    toast({
      title: "Devocional adicionado",
      description: "O devocional foi adicionado com sucesso.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Devocional</CardTitle>
        <CardDescription>
          Adicione um novo devocional.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título do devocional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="verse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Versículo</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Texto do versículo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referência</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: João 3:16" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conteúdo</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Texto do devocional" 
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Devocional
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
