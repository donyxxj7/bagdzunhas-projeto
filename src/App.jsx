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

  // --- Busca os dados do portfólio do Sanity ---
  const [trabalhos, setTrabalhos] = useState([]);

  useEffect(() => {
    // A query busca todos os documentos do tipo 'portfolio'
    const query = '*[_type == "portfolio"]';
    client.fetch(query).then((data) => {
      setTrabalhos(data);
    });
  }, []);

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
      antes: "https://i.imgur.com/0MlfDJM.jpg",
      depois: "https://i.imgur.com/FZZkxwU.jpg",
      titulo: "Aplicação de Postiças com Arte", // Título atualizado
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
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="w-16 h-16" />
              </motion.div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              Ana Bagdzinski
            </h1>
            <p className="text-2xl md:text-3xl mb-6 font-light">
              Manicure Profissional
            </p>
            <p className="text-xl md:text-2xl mb-8 italic">
              Transformando unhas em obras de arte! 💅✨
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-white text-pink-600 hover:bg-pink-50 text-lg px-8 py-6 rounded-full shadow-xl"
                onClick={() =>
                  document
                    .getElementById("agendamento")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                <Phone className="mr-2" />
                Agendar Horário
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full"
                onClick={() =>
                  document
                    .getElementById("portfolio")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                <Sparkles className="mr-2" />
                Ver Trabalhos
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
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
                {trabalhos &&
                  trabalhos.map((trabalho, index) => (
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
                      <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-0 flex flex-col h-full bg-white/80 dark:bg-black/20 dark:border dark:border-white/10">
                        <div className="relative overflow-hidden aspect-[3/4] w-full">
                          <img
                            src={urlFor(trabalho.imagem).url()}
                            alt={trabalho.alt}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        <div className="p-4 mt-auto">
                          <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                            {trabalho.titulo}
                          </h3>
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
                    {trabalhos &&
                      trabalhos.map((trabalho, index) => (
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

        <ThematicDivider />

        <section id="antes-depois" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Antes e Depois
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg dark:text-gray-300">
              A mágica da transformação em cada detalhe
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <Carousel opts={{ loop: true }} className="w-full">
              <CarouselContent>
                {antesDepois.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="shadow-lg border-0 bg-white/50 backdrop-blur dark:bg-black/20 dark:border dark:border-white/10 overflow-hidden">
                        <CardHeader>
                          <CardTitle className="text-center text-2xl">
                            {item.titulo}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                          <div className="relative">
                            <img
                              src={item.antes}
                              alt="Antes"
                              className="rounded-lg aspect-square object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-bold py-1 px-2 rounded-full">
                              ANTES
                            </div>
                          </div>
                          <div className="relative">
                            <img
                              src={item.depois}
                              alt="Depois"
                              className="rounded-lg aspect-square object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                              DEPOIS
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </motion.div>
        </section>

        <ThematicDivider />

        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Serviços
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg dark:text-gray-300">
              Cuidados especiais para suas unhas
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {servicos.map((servico, index) => {
              const Icon = servico.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur dark:bg-black/20 dark:border dark:border-white/10">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="w-8 h-8 text-pink-500 dark:text-pink-400" />
                        <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                          {servico.preco}
                        </span>
                      </div>
                      <CardTitle className="text-2xl">
                        {servico.titulo}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed dark:text-gray-300">
                        {servico.descricao}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        <ThematicDivider />

        <section id="faq" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Perguntas Frequentes
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg dark:text-gray-300">
              Tirando todas as suas dúvidas
            </p>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-pink-200/80 dark:border-white/10"
                  >
                    <AccordionTrigger className="text-left text-lg hover:no-underline">
                      {faq.pergunta}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-700 dark:text-gray-300">
                      {faq.resposta}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </section>

        <ThematicDivider />

        <section id="agendamento" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Agende seu Horário
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg dark:text-gray-300">
              Preencha o formulário e entraremos em contato
            </p>
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur dark:bg-black/20 dark:border dark:border-white/10">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="nome" className="text-base">
                      Nome Completo *
                    </Label>
                    <Input
                      id="nome"
                      required
                      value={formData.nome}
                      onChange={(e) =>
                        setFormData({ ...formData, nome: e.target.value })
                      }
                      className="mt-2 h-12"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp" className="text-base">
                      WhatsApp *
                    </Label>
                    <Input
                      id="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      className="mt-2 h-12"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="servico" className="text-base">
                      Serviço Desejado *
                    </Label>
                    <Select
                      required
                      value={formData.servico}
                      onValueChange={(value) => {
                        if (value) {
                          setFormData({ ...formData, servico: value });
                        }
                      }}
                    >
                      <SelectTrigger id="servico" className="mt-2 h-12 w-full">
                        <SelectValue placeholder="Selecione um serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {servicos.map((s, i) => (
                          <SelectItem key={i} value={s.titulo}>
                            {s.titulo} - {s.preco}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="data" className="text-base">
                        Data Preferencial *
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "mt-2 h-12 w-full justify-start text-left font-normal border-input",
                              !formData.data && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.data ? (
                              format(formData.data, "PPP", { locale: ptBR })
                            ) : (
                              <span>Escolha uma data</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.data}
                            onSelect={(date) =>
                              setFormData({ ...formData, data: date })
                            }
                            locale={ptBR}
                            initialFocus
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label htmlFor="horario" className="text-base">
                        Horário Preferencial *
                      </Label>
                      <Input
                        id="horario"
                        type="text"
                        required
                        value={formData.horario}
                        onChange={(e) =>
                          setFormData({ ...formData, horario: e.target.value })
                        }
                        className="mt-2 h-12"
                        placeholder="Ex: 14:30"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="observacoes" className="text-base">
                      Observações
                    </Label>
                    <Textarea
                      id="observacoes"
                      value={formData.observacoes}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          observacoes: e.target.value,
                        })
                      }
                      className="mt-2"
                      placeholder="Alguma observação especial?"
                      rows={4}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-14 text-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    <Phone className="mr-2" />
                    Enviar pelo WhatsApp
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <ThematicDivider />

        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-12">
              <Gift className="w-16 h-16 mx-auto mb-4 text-pink-500 dark:text-pink-400" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Indique uma Amiga
              </h2>
              <p className="text-2xl font-bold text-pink-600 mb-2 dark:text-pink-400">
                GANHE UMA ESMALTAÇÃO GRÁTIS!
              </p>
              <p className="text-gray-600 text-lg dark:text-gray-300">
                Compartilhe o amor pelas unhas perfeitas
              </p>
            </div>
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur dark:bg-black/20 dark:border dark:border-white/10">
              <CardContent className="pt-6">
                <form onSubmit={handleIndicacao} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-pink-600 dark:text-pink-400">
                      Seus Dados
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="seuNome" className="text-base">
                          Seu Nome Completo *
                        </Label>
                        <Input
                          id="seuNome"
                          required
                          value={indicacaoData.seuNome}
                          onChange={(e) =>
                            setIndicacaoData({
                              ...indicacaoData,
                              seuNome: e.target.value,
                            })
                          }
                          className="mt-2 h-12"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <Label htmlFor="seuWhatsapp" className="text-base">
                          Seu WhatsApp *
                        </Label>
                        <Input
                          id="seuWhatsapp"
                          required
                          value={indicacaoData.seuWhatsapp}
                          onChange={(e) =>
                            setIndicacaoData({
                              ...indicacaoData,
                              seuWhatsapp: e.target.value,
                            })
                          }
                          className="mt-2 h-12"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-6 border-pink-200 dark:border-white/10">
                    <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
                      Dados da Amiga
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="nomeAmiga" className="text-base">
                          Nome Completo da Amiga *
                        </Label>
                        <Input
                          id="nomeAmiga"
                          required
                          value={indicacaoData.nomeAmiga}
                          onChange={(e) =>
                            setIndicacaoData({
                              ...indicacaoData,
                              nomeAmiga: e.target.value,
                            })
                          }
                          className="mt-2 h-12"
                          placeholder="Nome da sua amiga"
                        />
                      </div>
                      <div>
                        <Label htmlFor="whatsappAmiga" className="text-base">
                          WhatsApp da Amiga *
                        </Label>
                        <Input
                          id="whatsappAmiga"
                          required
                          value={indicacaoData.whatsappAmiga}
                          onChange={(e) =>
                            setIndicacaoData({
                              ...indicacaoData,
                              whatsappAmiga: e.target.value,
                            })
                          }
                          className="mt-2 h-12"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Gift className="mr-2" />
                    Enviar Indicação
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <ThematicDivider />

        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Sobre Mim
            </h2>
            <Card className="shadow-2xl border-0 dark:bg-black/20 dark:border dark:border-white/10">
              <CardContent className="p-8 md:p-12">
                <div className="flex justify-center mb-6">
                  <Heart className="w-12 h-12 text-pink-500 dark:text-pink-400" />
                </div>
                <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  <p>
                    Olá! Sou{" "}
                    <strong className="text-pink-600 dark:text-pink-400">
                      Ana Olívia da Silva de Lima
                    </strong>
                    , tenho 17 anos e sou natural de{" "}
                    <strong>São Mateus do Sul</strong>, no Paraná. Depois de
                    viver em São Paulo, hoje sigo meu sonho em Joinville:
                    transformar unhas em arte. 💅
                  </p>
                  <p>
                    Sempre fui apaixonada pelo mundo das cores e acredito que as
                    unhas mostram mais do que estilo — elas expressam
                    sentimentos, humor e personalidade. 💖
                  </p>
                  <p>
                    Amo o que faço e coloco muito carinho em cada detalhe. Para
                    mim, atender é cuidar com amor, delicadeza e criatividade.
                  </p>
                </div>
                <div className="mt-10 pt-8 border-t border-pink-200 dark:border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center">
                      <MapPin className="w-8 h-8 text-pink-500 dark:text-pink-400 mb-2" />
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Localização
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Joinville, SC
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Clock className="w-8 h-8 text-pink-500 dark:text-pink-400 mb-2" />
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Horário
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Sob agendamento
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Star className="w-8 h-8 text-pink-500 dark:text-pink-400 mb-2" />
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Experiência
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Profissional dedicada
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <ThematicDivider />

        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              O que dizem minhas clientes
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg dark:text-gray-300">
              Amor e carinho em cada depoimento 💖
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Carousel opts={{ loop: true }} className="w-full">
              <CarouselContent>
                {depoimentos.map((depoimento, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/2"
                  >
                    <div className="p-4 h-full">
                      <Card className="h-full flex flex-col justify-between shadow-lg border-0 bg-white/50 backdrop-blur dark:bg-black/20 dark:border dark:border-white/10">
                        <CardContent className="pt-6">
                          <Quote className="w-8 h-8 text-pink-300 dark:text-pink-600 mb-4" />
                          <p className="text-gray-700 dark:text-gray-300 italic">
                            "{depoimento.depoimento}"
                          </p>
                        </CardContent>
                        <CardHeader>
                          <div className="flex items-center">
                            <div className="flex-grow">
                              <CardTitle>{depoimento.nome}</CardTitle>
                              <CardDescription className="dark:text-gray-400">
                                {depoimento.cidade}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(depoimento.estrelas)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                                />
                              ))}
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </motion.div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-pink-600 via-pink-500 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Sparkles className="w-12 h-12" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Ana Bagdzinski</h3>
            <p className="text-xl mb-6 italic">
              Transformando unhas em obras de arte!
            </p>
            <div className="flex justify-center gap-6 mb-8">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/20 border-white text-white hover:bg-white hover:text-pink-600 rounded-full"
                onClick={() =>
                  window.open(
                    `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`,
                    "_blank"
                  )
                }
              >
                <Phone className="mr-2" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/20 border-white text-white hover:bg-white hover:text-pink-600 rounded-full"
                onClick={() =>
                  window.open("https://instagram.com/bagdz.manicure", "_blank")
                }
              >
                <Instagram className="mr-2" />
                Instagram
              </Button>
            </div>
            <div className="border-t border-white/30 pt-6">
              <p className="text-sm opacity-90">
                © 2025 Ana Bagdzinski - Todos os direitos reservados
              </p>
              <p className="text-sm opacity-75 mt-2">
                Joinville, Santa Catarina
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
