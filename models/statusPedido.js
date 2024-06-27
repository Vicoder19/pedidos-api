// models/orderStatus.js

// Definição dos status de pedido como constantes
const STATUS_PEDIDO = {
    PENDENTE: { code: 0, name: 'Pendente' },
    ACEITO: { code: 1, name: 'Aceito' },
    EM_PREPARACAO: { code: 2, name: 'Em Preparação' },
    PRONTO_ENTREGA: { code: 3, name: 'Pronto para Entrega' },
    ENTREGA_ANDAMENTO: { code: 4, name: 'Entrega em Andamento' },
    ENTREGUE: { code: 5, name: 'Entregue' },
    FINALIZADO: { code: 6, name: 'Finalizado' },
    CANCELADO: { code: 7, name: 'Cancelado' },
  };
  
  module.exports = STATUS_PEDIDO;
  