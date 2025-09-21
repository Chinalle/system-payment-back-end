export enum TipoPerfil {
    CLIENTE = 'cliente',
    PRESTADOR = 'gerente',
    ADMIN = 'admin',
}

export enum PerfilPrestador {
    COLABORADOR = 'colaborador',
    SUPERVISOR = 'supervisor',
    COORDENADOR = 'coordenador',
}

export enum StatusContrato {
    PENDENTE = 'pendente',
    EM_ANDAMENTO = 'em_andamento',
    CONCLUIDO = 'concluido',
    CANCELADO = 'cancelado',
}

export enum StatusPagamento {
    PENDENTE = 'pendente',
    APROVADO = 'aprovado',
    RECUSADO = 'recusado',
    CANCELADO = 'cancelado',
}

export enum MetodoPagamento {
    CARTAO_CREDITO = 'cartao_credito',
    CARTAO_DEBITO = 'cartao_debito',
    PIX = 'pix',
    BOLETO = 'boleto',
}