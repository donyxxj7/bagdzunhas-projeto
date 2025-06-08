document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("indicacao-form");
  const btnIndicar = form.querySelector('.btn-indicar');
  
  if (form && btnIndicar) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const dados = {
        cliente: {
          nome: document.getElementById('nome-indicacao')?.value.trim(),
          telefone: document.getElementById('whatsapp-indicacao')?.value.trim()
        },
        indicada: {
          nome: document.getElementById('amiga-nome-indicacao')?.value.trim(),
          telefone: document.getElementById('amiga-whatsapp-indicacao')?.value.trim()
        }
      };

      if (!dados.cliente.nome || !dados.cliente.telefone || !dados.indicada.nome || !dados.indicada.telefone) {
        showFeedback("Por favor, preencha todos os campos da indicação.", "error");
        return;
      }

      const telCliente = dados.cliente.telefone.replace(/\D/g, "");
      const telIndicada = dados.indicada.telefone.replace(/\D/g, "");
      
      if (telCliente.length < 10 || telIndicada.length < 10) {
        showFeedback("Os números de telefone precisam ter o DDD.", "error");
        return;
      }

      const mensagem = `*Olá, quero fazer uma Indicação de Cliente!*%0A%0A` +
        `*Meus Dados:*%0A` +
        `Nome: ${encodeURIComponent(dados.cliente.nome)}%0A` +
        `WhatsApp: ${telCliente}%0A%0A` +
        `*Dados da Amiga Indicada:*%0A` +
        `Nome: ${encodeURIComponent(dados.indicada.nome)}%0A` +
        `WhatsApp: ${telIndicada}`;

      const whatsappUrl = `https://wa.me/5547984887462?text=${mensagem}`;
      
      window.open(whatsappUrl, '_blank');
      showFeedback("Obrigada pela indicação! Abrindo o WhatsApp...", "success");
      form.reset();
    });
  }
});

// A função showFeedback já está no scripts.js, então não precisa ser repetida
// se ambos os scripts forem carregados na mesma página.