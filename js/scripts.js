document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("agendamento-form");
  const btnAgendar = form.querySelector(".btn-agendar");

  if (form && btnAgendar) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("nome-agendamento")?.value.trim();
      const whatsapp = document.getElementById("whatsapp-agendamento")?.value.trim();
      const servico = document.getElementById("servico-agendamento")?.value;
      const data = document.getElementById("data-agendamento")?.value;
      const hora = document.getElementById("hora-agendamento")?.value;

      if (!nome || !whatsapp || !servico || !data || !hora) {
        showFeedback("Por favor, preencha todos os campos para agendar.", "error");
        return;
      }

      const telefoneFormatado = whatsapp.replace(/\D/g, "");
      if (telefoneFormatado.length < 10) {
        showFeedback("Por favor, insira um WhatsApp válido com DDD.", "error");
        return;
      }
      
      // Formatar data e hora atual
      const agora = new Date();
      const dataPedido =
        agora.toLocaleDateString("pt-BR") +
        " às " +
        agora.getHours().toString().padStart(2, "0") +
        ":" +
        agora.getMinutes().toString().padStart(2, "0");

      let dataFormatada = "Não especificada";
      if (data) {
        const [ano, mes, dia] = data.split("-");
        dataFormatada = `${dia}/${mes}/${ano}`;
      }
      
      const mensagem =
        `*Oi Ana, tudo bem? Você estaria disponibilidade esse horário:*%0A%0A` +
        `*Cliente:* ${encodeURIComponent(nome)}%0A` +
        `*WhatsApp:* ${telefoneFormatado}%0A` +
        `*Serviço:* ${servico || "Não especificado"}%0A` +
        `*Data desejada:* ${dataFormatada}%0A` +
        `*Horário desejado:* ${hora || "Não especificado"}%0A` +
        `*Pedido feito em:* ${encodeURIComponent(dataPedido)}`;

      const whatsappUrl = `https://wa.me/5547984887462?text=${mensagem}`;

      const originalHTML = btnAgendar.innerHTML;
      btnAgendar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
      btnAgendar.disabled = true;

      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        showFeedback("Você está sendo redirecionada para o WhatsApp!", "success");
        form.reset();

        setTimeout(() => {
          btnAgendar.innerHTML = originalHTML;
          btnAgendar.disabled = false;
        }, 3000);
      }, 500);
    });
  }
});

// Função de Feedback Genérica
function showFeedback(message, type) {
  const feedbackElement = document.getElementById("feedback-msg");
  if (feedbackElement) {
    feedbackElement.className = `msg-feedback ${type}`; // 'success' ou 'error'
    feedbackElement.textContent = message;
    feedbackElement.style.display = "block";

    // Rola para a mensagem
    feedbackElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Esconde a mensagem após 7 segundos
    setTimeout(() => {
      feedbackElement.style.display = "none";
    }, 7000);
  }
}