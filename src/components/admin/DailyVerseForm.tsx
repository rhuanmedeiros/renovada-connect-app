
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

const verseFormSchema = z.object({
  text: z.string().min(2, "O texto do versículo é obrigatório"),
  reference: z.string().min(2, "A referência do versículo é obrigatória"),
});

export const DailyVerseForm = () => {
  const { data, updateDailyVerse } = useAppData();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof verseFormSchema>>({
    resolver: zodResolver(verseFormSchema),
    defaultValues: {
      text: data.dailyVerse.text,
      reference: data.dailyVerse.reference,
    },
  });

  function onSubmit(values: z.infer<typeof verseFormSchema>) {
    updateDailyVerse({
      text: values.text,
      reference: values.reference,
    });
    toast({
      title: "Versículo atualizado",
      description: "O versículo do dia foi atualizado com sucesso.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Versículo do Dia</CardTitle>
        <CardDescription>
          Atualize o versículo que aparece na página inicial.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Texto do Versículo</FormLabel>
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
            
            <Button type="submit">Atualizar Versículo</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
