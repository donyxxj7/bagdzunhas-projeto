import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Sparkles,
  Heart,
  Phone,
  Instagram,
  MapPin,
  Clock,
  Star,
  Gift,
  ChevronDown,
  CalendarIcon,
  Quote,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { client, urlFor } from "./sanityClient";
import { cn } from "@/lib/utils";
import "./App.css";

// As importações de 'trabalho1', 'trabalho2', 'trabalho3' não são mais necessárias
// import trabalho1 from './assets/trabalho1.jpg';
// import trabalho2 from './assets/trabalho2.jpg';
// import trabalho3 from './assets/trabalho3.jpg';

function App() {
  const { setTheme, theme } = useTheme();

  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    servico: "",
    data: undefined,
    horario: "",
    observacoes: "",
  });

  const [indicacaoData, setIndicacaoData] = useState({
    seuNome: "",
    seuWhatsapp: "",
    nomeAmiga: "",
    whatsappAmiga: "",
  });

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // --- NOVA FORMA DE BUSCAR OS TRABALHOS ---
  const [trabalhos, setTrabalhos] = useState([]);

  useEffect(() => {
    const query = '*[_type == "portfolio"]';
    client.fetch(query).then((data) => {
      setTrabalhos(data);
    });
  }, []);
  // --- FIM DA NOVA FORMA ---

  const servicos = [
    {
      titulo: "Manicure",
      preco: "R$ 35,00",
      descricao:
        "Corte e lixamento das unhas, esmaltação, remoção cuidadosa de cutículas, hidratação das mãos e massagem relaxante.",
      icon: Sparkles,
    },
    {
      titulo: "Manicure + Pedicure",
      preco: "R$ 65,00",
      descricao:
        "O pacote completo! Cuidados para as mãos e pés, incluindo corte, lixamento, remoção de cutículas e esmaltação.",
      icon: Heart,
    },
    {
      titulo: "Spa dos Pés",
      preco: "R$ 40,00",
      descricao:
        "Esfoliação suave, remoção de calosidades, hidratação profunda, massagem relaxante prolongada e máscara nutritiva.",
      icon: Star,
    },
    {
      titulo: "Postiças",
      preco: "R$ 50,00",
      descricao:
        "Corte de cutículas, colagem das unhas postiças, aplicação de decoração simples e acabamento natural.",
      icon: Sparkles,
    },
    {
      titulo: "Alongamento em Gel",
      preco: "R$ 100,00",
      descricao:
        "Aplicação de gel, alongamento, decoração simples inclusa e acabamento brilhante ou mate.",
      icon: Star,
    },
    {
      titulo: "Manutenção em Gel",
      preco: "R$ 80,00",
      descricao:
        "Manutenção completa do alongamento em gel, ajustes e retoque da decoração.",
      icon: Sparkles,
    },
  ];

  // O array 'trabalhos' antigo foi removido daqui.

  const depoimentos = [
    {
      nome: "Juliana S.",
      cidade: "Joinville, SC",
      depoimento:
        "A Ana é simplesmente incrível! As minhas unhas nunca estiveram tão lindas e bem cuidadas. O trabalho dela é impecável e o atendimento é maravilhoso. Super recomendo!",
      estrelas: 5,
    },
    {
      nome: "Fernanda L.",
      cidade: "Joinville, SC",
      depoimento:
        "Fiz o alongamento em gel e estou apaixonada! O acabamento é super natural e duradouro. A Ana é muito detalhista e caprichosa. Virei cliente fiel!",
      estrelas: 5,
    },
    {
      nome: "Carla M.",
      cidade: "Joinville, SC",
      depoimento:
        "O Spa dos Pés é uma experiência relaxante e revigorante. Meus pés ficaram super macios. Atendimento nota mil e um profissionalismo que impressiona. Recomendo de olhos fechados!",
      estrelas: 5,
    },
  ];

  const faqs = [
    {
      pergunta: "Quanto tempo dura o procedimento de alongamento em gel?",
      resposta:
        "O procedimento de aplicação do alongamento em gel leva em média de 2 a 3 horas, dependendo da complexidade da decoração desejada.",
    },
    {
      pergunta: "Qual a durabilidade do esmalte em gel?",
      resposta:
        "A esmaltação em gel é conhecida por sua alta durabilidade, podendo durar de 15 a 21 dias sem lascar, mantendo o brilho e a cor intactos.",
    },
    {
      pergunta: "Como funciona a promoção 'Indique uma Amiga'?",
      resposta:
        "É simples! Você preenche o formulário no site com seus dados e os da sua amiga. Quando sua amiga fizer o primeiro procedimento, você ganha uma esmaltação tradicional grátis no seu próximo agendamento!",
    },
    {
      pergunta: "Quais formas de pagamento você aceita?",
      resposta:
        "Aceito pagamentos via Pix, dinheiro e cartões de débito e crédito. Tudo para facilitar para você!",
    },
  ];

  const antesDepois = [
    {
      antes:
        "https://images.pexels.com/photos/4202893/pexels-photo-4202893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      depois:
        "https://images.pexels.com/photos/9346610/pexels-photo-9346610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      titulo: "Transformação com Alongamento",
    },
    {
      antes:
        "https://images.pexels.com/photos/7014631/pexels-photo-7014631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      depois:
        "https://images.pexels.com/photos/3997388/pexels-photo-3997388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      titulo: "Renovação e Cor",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataFormatada = formData.data
      ? format(formData.data, "dd/MM/yyyy", { locale: ptBR })
      : "Não informada";
    const mensagem = `Olá! Gostaria de agendar:\n\n*Nome:* ${
      formData.nome
    }\n*WhatsApp:* ${formData.whatsapp}\n*Serviço:* ${
      formData.servico
    }\n*Data:* ${dataFormatada}\n*Horário:* ${
      formData.horario
    }\n*Observações:* ${formData.observacoes || "Nenhuma"}`;
    const whatsappUrl = `https://wa.me/${
      import.meta.env.VITE_WHATSAPP_NUMBER
    }?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, "_blank");
    setFormData({
      nome: "",
      whatsapp: "",
      servico: "",
      data: undefined,
      horario: "",
      observacoes: "",
    });
  };

  const handleIndicacao = (e) => {
    e.preventDefault();
    const mensagem = `🎁 *INDICAÇÃO DE AMIGA*\n\n*Meus dados:*\nNome: ${indicacaoData.seuNome}\nWhatsApp: ${indicacaoData.seuWhatsapp}\n\n*Dados da amiga:*\nNome: ${indicacaoData.nomeAmiga}\nWhatsApp: ${indicacaoData.whatsappAmiga}\n\nQuero ganhar uma esmaltação grátis! 💅`;
    const whatsappUrl = `https://wa.me/${
      import.meta.env.VITE_WHATSAPP_NUMBER
    }?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, "_blank");
    setIndicacaoData({
      seuNome: "",
      seuWhatsapp: "",
      nomeAmiga: "",
      whatsappAmiga: "",
    });
  };

  const ThematicDivider = () => (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="my-20 flex items-center"
      aria-hidden="true"
    >
      <div className="flex-grow border-t border-gray-300 dark:border-white/10"></div>
      <Sparkles className="mx-6 h-8 w-8 flex-shrink-0 text-pink-400" />
      <div className="flex-grow border-t border-gray-300 dark:border-white/10"></div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-purple-950">
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-sm"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Alternar tema</span>
        </Button>
      </div>

      <header className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 text-white">
        {/* ... (código do header) ... */}
      </header>

      <main className="container mx-auto px-4">
        <section id="portfolio" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Meus Trabalhos
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg dark:text-gray-300">
              Confira alguns dos meus trabalhos mais recentes
            </p>
            <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {trabalhos.map((trabalho, index) => (
                  <motion.div
                    key={trabalho._id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="group cursor-pointer"
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setIsGalleryOpen(true);
                    }}
                  >
                    <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                      <div className="relative overflow-hidden aspect-[3/4]">
                        <img
                          src={urlFor(trabalho.imagem).url()}
                          alt={trabalho.alt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white font-bold text-xl">
                              {trabalho.titulo}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <DialogContent
                showCloseButton={false}
                overlayClassName="bg-black/20 backdrop-blur-sm"
                className="max-w-3xl p-0 border-0 bg-transparent shadow-none"
              >
                <button
                  onClick={() => setIsGalleryOpen(false)}
                  className="absolute top-2 right-2 z-50 rounded-full bg-black/50 p-2 text-white transition-opacity hover:opacity-80"
                  aria-label="Fechar galeria"
                >
                  <Sparkles className="h-6 w-6" />
                </button>
                <DialogTitle className="sr-only">
                  Galeria de Imagens
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Navegue pelas imagens dos trabalhos clicando nas setas.
                </DialogDescription>
                <Carousel
                  opts={{ startIndex: selectedImageIndex, loop: true }}
                  key={selectedImageIndex}
                >
                  <CarouselContent>
                    {trabalhos.map((trabalho, index) => (
                      <CarouselItem key={trabalho._id || index}>
                        <div className="flex aspect-square items-center justify-center">
                          <img
                            src={urlFor(trabalho.imagem).url()}
                            alt={trabalho.alt}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-12 text-white" />
                  <CarouselNext className="mr-12 text-white" />
                </Carousel>
              </DialogContent>
            </Dialog>
          </motion.div>
        </section>

        {/* ... (Resto do seu código JSX, incluindo os divisores e outras seções) ... */}
      </main>

      {/* ... (Seu footer) ... */}
    </div>
  );
}

export default App;
