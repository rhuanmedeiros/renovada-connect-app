
import { useState } from 'react';
import { Calendar as CalendarIcon, Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAppData } from '@/context/AppDataContext';
import { formatDatePtBr, formatDateTimePtBr } from '@/utils/dateUtils';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Agenda = () => {
  const { data } = useAppData();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reminders, setReminders] = useState<string[]>([]);

  // Find dates that have events
  const eventDates = data.events.map(event => new Date(event.date));
  
  // Filter events for the selected date if any
  const filteredEvents = date
    ? data.events.filter(event => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getFullYear() === date.getFullYear()
        );
      })
    : [];

  const toggleReminder = (eventId: string) => {
    if (reminders.includes(eventId)) {
      setReminders(reminders.filter(id => id !== eventId));
      toast({
        title: "Lembrete removido",
        description: "Você não receberá notificações para este evento.",
      });
    } else {
      setReminders([...reminders, eventId]);
      toast({
        title: "Lembrete adicionado",
        description: "Você será notificado antes do evento.",
      });
    }
  };

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Agenda de Eventos</h1>
      
      <div className="flex justify-center mb-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                formatDatePtBr(date.toISOString())
              ) : (
                <span>Selecione uma data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 pointer-events-auto">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="p-3 pointer-events-auto"
              modifiers={{
                hasEvent: (date) => 
                  eventDates.some(eventDate => 
                    eventDate.getDate() === date.getDate() &&
                    eventDate.getMonth() === date.getMonth() &&
                    eventDate.getFullYear() === date.getFullYear()
                  ),
              }}
              modifiersStyles={{
                hasEvent: {
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(128, 90, 213, 0.1)',
                  color: 'hsl(var(--primary))',
                },
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {filteredEvents.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">
            Eventos em {date ? formatDatePtBr(date.toISOString()) : "data selecionada"}
          </h2>
          
          {filteredEvents.map(event => (
            <Card key={event.id} className="card-hover">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-church-600 text-sm">
                      {formatDateTimePtBr(event.date)}
                    </p>
                    <p className="mt-2 text-muted-foreground">{event.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleReminder(event.id)}
                    className={cn(
                      reminders.includes(event.id) 
                        ? "text-church-600" 
                        : "text-muted-foreground"
                    )}
                  >
                    {reminders.includes(event.id) ? (
                      <Bell className="h-5 w-5" />
                    ) : (
                      <BellOff className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {date 
              ? "Não há eventos programados para esta data." 
              : "Selecione uma data para ver os eventos."
            }
          </p>
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Todos os próximos eventos</h2>
        
        {data.events
          .filter(event => new Date(event.date) >= new Date())
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map(event => (
            <Card key={event.id} className="card-hover mb-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-church-600 text-sm">
                      {formatDateTimePtBr(event.date)}
                    </p>
                    <p className="mt-2 text-muted-foreground">{event.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleReminder(event.id)}
                    className={cn(
                      reminders.includes(event.id) 
                        ? "text-church-600" 
                        : "text-muted-foreground"
                    )}
                  >
                    {reminders.includes(event.id) ? (
                      <Bell className="h-5 w-5" />
                    ) : (
                      <BellOff className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Agenda;
