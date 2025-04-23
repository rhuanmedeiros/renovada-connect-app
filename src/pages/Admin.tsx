import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdmin } from '@/context/AdminContext';
import { LogOut } from 'lucide-react';
import { DailyVerseForm } from '@/components/admin/DailyVerseForm';
import { FeaturedVideoForm } from '@/components/admin/FeaturedVideoForm';
import { AddEventForm } from '@/components/admin/AddEventForm';
import { AddDevotionalForm } from '@/components/admin/AddDevotionalForm';
import { AddTestimonyForm } from '@/components/admin/AddTestimonyForm';
import { AddMediaForms } from '@/components/admin/AddMediaForms';
import { AddSeriesForm } from '@/components/admin/AddSeriesForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useAppData } from '@/context/AppDataContext';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const navigate = useNavigate();
  const { isAdminAuthenticated, logout } = useAdmin();
  
  if (!isAdminAuthenticated) {
    navigate('/');
    return null;
  }

  const pixKeyFormSchema = z.object({
    pixKey: z.string().min(2, "A chave PIX é obrigatória"),
  });
  
  const { data, updatePixKey } = useAppData();
  const { toast } = useToast();

  const pixKeyForm = useForm<z.infer<typeof pixKeyFormSchema>>({
    resolver: zodResolver(pixKeyFormSchema),
    defaultValues: {
      pixKey: data.pixKey,
    },
  });
  
  function onPixKeySubmit(values: z.infer<typeof pixKeyFormSchema>) {
    updatePixKey(values.pixKey);
    toast({
      title: "Chave PIX atualizada",
      description: "A chave PIX foi atualizada com sucesso.",
    });
  }

  return (
    <div className="page-container max-w-5xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Área Administrativa</h1>
        <Button variant="outline" size="sm" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </Button>
      </div>
      
      <Tabs defaultValue="home" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="media">Mídia</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="home" className="space-y-6">
          <DailyVerseForm />
          <FeaturedVideoForm />
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6">
          <AddSeriesForm />
          <AddEventForm />
          <AddDevotionalForm />
          <AddTestimonyForm />
        </TabsContent>
        
        <TabsContent value="media" className="space-y-6">
          <AddMediaForms />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chave PIX</CardTitle>
              <CardDescription>
                Atualize a chave PIX para doações.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...pixKeyForm}>
                <form onSubmit={pixKeyForm.handleSubmit(onPixKeySubmit)} className="space-y-4">
                  <FormField
                    control={pixKeyForm.control}
                    name="pixKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chave PIX</FormLabel>
                        <FormControl>
                          <Input placeholder="Email, CPF ou chave aleatória" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Atualizar Chave PIX</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
