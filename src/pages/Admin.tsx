import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
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
import { useAdmin } from '@/context/AdminContext';
import { useAppData } from '@/context/AppDataContext';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, LogOut } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const { isAdminAuthenticated, logout } = useAdmin();
  const { data, updateDailyVerse, updateFeaturedVideo, addEvent, addDevotional, addTestimony, addPhoto, addVideo, addKidsContent, addYouthContent, updatePixKey } = useAppData();
  const { toast } = useToast();
  
  if (!isAdminAuthenticated) {
    navigate('/');
    return null;
  }
  
  const verseFormSchema = z.object({
    text: z.string().min(2, "O texto do versículo é obrigatório"),
    reference: z.string().min(2, "A referência do versículo é obrigatória"),
  });
  
  const verseForm = useForm<z.infer<typeof verseFormSchema>>({
    resolver: zodResolver(verseFormSchema),
    defaultValues: {
      text: data.dailyVerse.text,
      reference: data.dailyVerse.reference,
    },
  });
  
  function onVerseSubmit(values: z.infer<typeof verseFormSchema>) {
    updateDailyVerse({
      text: values.text,
      reference: values.reference
    });
    toast({
      title: "Versículo atualizado",
      description: "O versículo do dia foi atualizado com sucesso.",
    });
  }
  
  const videoFormSchema = z.object({
    id: z.string().min(2, "O ID do vídeo é obrigatório"),
    title: z.string().min(2, "O título do vídeo é obrigatório"),
  });
  
  const videoForm = useForm<z.infer<typeof videoFormSchema>>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      id: data.featuredVideo.id,
      title: data.featuredVideo.title,
    },
  });
  
  function onVideoSubmit(values: z.infer<typeof videoFormSchema>) {
    updateFeaturedVideo({
      id: values.id,
      title: values.title,
      thumbnail: `https://img.youtube.com/vi/${values.id}/hqdefault.jpg`,
    });
    toast({
      title: "Vídeo atualizado",
      description: "O vídeo em destaque foi atualizado com sucesso.",
    });
  }
  
  const eventFormSchema = z.object({
    title: z.string().min(2, "O título é obrigatório"),
    date: z.string().min(2, "A data é obrigatória"),
    description: z.string().min(2, "A descrição é obrigatória"),
  });
  
  const eventForm = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      date: "",
      description: "",
    },
  });
  
  function onEventSubmit(values: z.infer<typeof eventFormSchema>) {
    addEvent({
      title: values.title,
      date: values.date,
      description: values.description
    });
    eventForm.reset();
    toast({
      title: "Evento adicionado",
      description: "O evento foi adicionado com sucesso.",
    });
  }
  
  const devotionalFormSchema = z.object({
    title: z.string().min(2, "O título é obrigatório"),
    verse: z.string().min(2, "O versículo é obrigatório"),
    reference: z.string().min(2, "A referência é obrigatória"),
    content: z.string().min(2, "O conteúdo é obrigatório"),
    date: z.string().min(2, "A data é obrigatória"),
  });
  
  const devotionalForm = useForm<z.infer<typeof devotionalFormSchema>>({
    resolver: zodResolver(devotionalFormSchema),
    defaultValues: {
      title: "",
      verse: "",
      reference: "",
      content: "",
      date: new Date().toISOString().split('T')[0],
    },
  });
  
  function onDevotionalSubmit(values: z.infer<typeof devotionalFormSchema>) {
    addDevotional({
      title: values.title,
      verse: values.verse,
      reference: values.reference,
      content: values.content,
      date: values.date
    });
    devotionalForm.reset();
    toast({
      title: "Devocional adicionado",
      description: "O devocional foi adicionado com sucesso.",
    });
  }
  
  const testimonyFormSchema = z.object({
    content: z.string().min(2, "O conteúdo do testemunho é obrigatório"),
    author: z.string().min(2, "O autor do testemunho é obrigatório"),
  });
  
  const testimonyForm = useForm<z.infer<typeof testimonyFormSchema>>({
    resolver: zodResolver(testimonyFormSchema),
    defaultValues: {
      content: "",
      author: "",
    },
  });
  
  function onTestimonySubmit(values: z.infer<typeof testimonyFormSchema>) {
    addTestimony({
      content: values.content,
      author: values.author
    });
    testimonyForm.reset();
    toast({
      title: "Testemunho adicionado",
      description: "O testemunho foi adicionado com sucesso.",
    });
  }
  
  const photoFormSchema = z.object({
    url: z.string().min(2, "A URL da foto é obrigatória"),
    alt: z.string().min(2, "A descrição da foto é obrigatória"),
  });
  
  const photoForm = useForm<z.infer<typeof photoFormSchema>>({
    resolver: zodResolver(photoFormSchema),
    defaultValues: {
      url: "",
      alt: "",
    },
  });
  
  function onPhotoSubmit(values: z.infer<typeof photoFormSchema>) {
    addPhoto({
      url: values.url,
      alt: values.alt
    });
    photoForm.reset();
    toast({
      title: "Foto adicionada",
      description: "A foto foi adicionada com sucesso à galeria.",
    });
  }
  
  const videoMediaFormSchema = z.object({
    id: z.string().min(2, "O ID do vídeo é obrigatório"),
    title: z.string().min(2, "O título do vídeo é obrigatório"),
  });
  
  const videoMediaForm = useForm<z.infer<typeof videoMediaFormSchema>>({
    resolver: zodResolver(videoMediaFormSchema),
    defaultValues: {
      id: "",
      title: "",
    },
  });
  
  function onVideoMediaSubmit(values: z.infer<typeof videoMediaFormSchema>) {
    addVideo({
      title: values.title,
      thumbnail: `https://img.youtube.com/vi/${values.id}/hqdefault.jpg`,
    });
    videoMediaForm.reset();
    toast({
      title: "Vídeo adicionado",
      description: "O vídeo foi adicionado com sucesso à galeria.",
    });
  }
  
  const kidsContentSchema = z.object({
    title: z.string().min(2, "O título do conteúdo é obrigatório"),
    type: z.enum(["video", "pdf", "story"], {
      required_error: "O tipo de conteúdo é obrigatório",
    }),
    url: z.string().min(2, "A URL do conteúdo é obrigatória"),
    thumbnail: z.string().optional(),
  });
  
  const kidsContentForm = useForm<z.infer<typeof kidsContentSchema>>({
    resolver: zodResolver(kidsContentSchema),
    defaultValues: {
      title: "",
      type: "story",
      url: "",
      thumbnail: "",
    },
  });
  
  function onKidsContentSubmit(values: z.infer<typeof kidsContentSchema>) {
    addKidsContent({
      title: values.title,
      type: values.type,
      url: values.url,
      thumbnail: values.thumbnail
    });
    kidsContentForm.reset();
    toast({
      title: "Conteúdo infantil adicionado",
      description: "O conteúdo foi adicionado com sucesso.",
    });
  }
  
  const youthContentSchema = z.object({
    title: z.string().min(2, "O título do conteúdo é obrigatório"),
    type: z.enum(["video", "devotional"], {
      required_error: "O tipo de conteúdo é obrigatório",
    }),
    url: z.string().optional(),
    content: z.string().optional(),
    verse: z.string().optional(),
    thumbnail: z.string().optional(),
  });
  
  const youthContentForm = useForm<z.infer<typeof youthContentSchema>>({
    resolver: zodResolver(youthContentSchema),
    defaultValues: {
      title: "",
      type: "devotional",
      url: "",
      content: "",
      verse: "",
      thumbnail: "",
    },
  });
  
  function onYouthContentSubmit(values: z.infer<typeof youthContentSchema>) {
    addYouthContent({
      title: values.title,
      type: values.type,
      url: values.url,
      content: values.content,
      verse: values.verse,
      thumbnail: values.thumbnail
    });
    youthContentForm.reset();
    toast({
      title: "Conteúdo para jovens adicionado",
      description: "O conteúdo foi adicionado com sucesso.",
    });
  }
  
  const pixKeyFormSchema = z.object({
    pixKey: z.string().min(2, "A chave PIX é obrigatória"),
  });
  
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

  const formSchema = z.object({
    title: z.string().min(2, "O título da série é obrigatório"),
    description: z.string().min(2, "A descrição é obrigatória"),
    coverImage: z.string().min(2, "A URL da imagem de capa é obrigatória"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      coverImage: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Add logic to handle series form submission
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
          <Card>
            <CardHeader>
              <CardTitle>Versículo do Dia</CardTitle>
              <CardDescription>
                Atualize o versículo que aparece na página inicial.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...verseForm}>
                <form onSubmit={verseForm.handleSubmit(onVerseSubmit)} className="space-y-4">
                  <FormField
                    control={verseForm.control}
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
                    control={verseForm.control}
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
          
          <Card>
            <CardHeader>
              <CardTitle>Vídeo em Destaque</CardTitle>
              <CardDescription>
                Atualize o vídeo que aparece na página inicial.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...videoForm}>
                <form onSubmit={videoForm.handleSubmit(onVideoSubmit)} className="space-y-4">
                  <FormField
                    control={videoForm.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID do YouTube</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: dQw4w9WgXcQ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={videoForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do Vídeo</FormLabel>
                        <FormControl>
                          <Input placeholder="Título do vídeo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Atualizar Vídeo</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Série</CardTitle>
              <CardDescription>
                Adicione uma nova série de mensagens.
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
                        <FormLabel>Título da Série</FormLabel>
                        <FormControl>
                          <Input placeholder="Título da série" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Breve descrição da série"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL da Imagem de Capa</FormLabel>
                        <FormControl>
                          <Input placeholder="Link para a imagem de capa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">
                    <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Série
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Evento</CardTitle>
              <CardDescription>
                Adicione um novo evento ao calendário.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...eventForm}>
                <form onSubmit={eventForm.handleSubmit(onEventSubmit)} className="space-y-4">
                  <FormField
                    control={eventForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do Evento</FormLabel>
                        <FormControl>
                          <Input placeholder="Título do evento" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={eventForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data e Hora</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={eventForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Descrição do evento" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">
                    <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Evento
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Devocional</CardTitle>
              <CardDescription>
                Adicione um novo devocional.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...devotionalForm}>
                <form onSubmit={devotionalForm.handleSubmit(onDevotionalSubmit)} className="space-y-4">
                  <FormField
                    control={devotionalForm.control}
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
                    control={devotionalForm.control}
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
                    control={devotionalForm.control}
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
                    control={devotionalForm.control}
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
                    control={devotionalForm.control}
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
          
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Testemunho</CardTitle>
              <CardDescription>
                Adicione um novo testemunho à página de oração.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...testimonyForm}>
                <form onSubmit={testimonyForm.handleSubmit(onTestimonySubmit)} className="space-y-4">
                  <FormField
                    control={testimonyForm.control}
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
                    control={testimonyForm.control}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Conteúdo Infantil</CardTitle>
                <CardDescription>
                  Adicione histórias bíblicas, vídeos ou PDFs para colorir.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...kidsContentForm}>
                  <form onSubmit={kidsContentForm.handleSubmit(onKidsContentSubmit)} className="space-y-4">
                    <FormField
                      control={kidsContentForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título</FormLabel>
                          <FormControl>
                            <Input placeholder="Título do conteúdo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={kidsContentForm.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo</FormLabel>
                          <FormControl>
                            <select 
                              className="w-full p-2 border rounded bg-background"
                              {...field}
                            >
                              <option value="story">História</option>
                              <option value="video">Vídeo</option>
                              <option value="pdf">PDF</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={kidsContentForm.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL</FormLabel>
                          <FormControl>
                            <Input placeholder="Link para o conteúdo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={kidsContentForm.control}
                      name="thumbnail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Thumbnail (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="URL da imagem de capa" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">
                      <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Conteúdo
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Conteúdo para Jovens</CardTitle>
                <CardDescription>
                  Adicione devocionais ou vídeos para jovens.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...youthContentForm}>
                  <form onSubmit={youthContentForm.handleSubmit(onYouthContentSubmit)} className="space-y-4">
                    <FormField
                      control={youthContentForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título</FormLabel>
                          <FormControl>
                            <Input placeholder="Título do conteúdo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={youthContentForm.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo</FormLabel>
                          <FormControl>
                            <select 
                              className="w-full p-2 border rounded bg-background"
                              {...field}
                            >
                              <option value="devotional">Devocional</option>
                              <option value="video">Vídeo</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {youthContentForm.watch("type") === "devotional" && (
                      <>
                        <FormField
                          control={youthContentForm.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Conteúdo</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Texto do devocional" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={youthContentForm.control}
                          name="verse"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Versículo (opcional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Referência do versículo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    
                    {youthContentForm.watch("type") === "video" && (
                      <>
                        <FormField
                          control={youthContentForm.control}
                          name="url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>URL do Vídeo</FormLabel>
                              <FormControl>
                                <Input placeholder="Link para o vídeo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={youthContentForm.control}
                          name="thumbnail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Thumbnail (opcional)</FormLabel>
                              <FormControl>
                                <Input placeholder="URL da imagem de capa" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    
                    <Button type="submit">
                      <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Conteúdo
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="media" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Foto</CardTitle>
                <CardDescription>
                  Adicione uma nova foto à galeria.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...photoForm}>
                  <form onSubmit={photoForm.handleSubmit(onPhotoSubmit)} className="space-y-4">
                    <FormField
                      control={photoForm.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL da Foto</FormLabel>
                          <FormControl>
                            <Input placeholder="Link da imagem" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={photoForm.control}
                      name="alt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Input placeholder="Descrição da foto" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">
                      <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Foto
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Vídeo</CardTitle>
                <CardDescription>
                  Adicione um novo vídeo à galeria.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...videoMediaForm}>
                  <form onSubmit={videoMediaForm.handleSubmit(onVideoMediaSubmit)} className="space-y-4">
                    <FormField
                      control={videoMediaForm.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID do YouTube</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: dQw4w9WgXcQ" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={videoMediaForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título do Vídeo</FormLabel>
                          <FormControl>
                            <Input placeholder="Título do vídeo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">
                      <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Vídeo
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
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
