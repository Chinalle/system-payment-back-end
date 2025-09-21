export enum Role {
    CLIENT = 'client',
    PROVIDER = 'manager',
    ADMIN = 'admin',
}

export enum RoleProvider {
    COLLABORATOR = 'collaborator',
    SUPERVISOR = 'supervisor',
    COORDINATOR = 'coordinator',
}

export enum StatusContract {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELED = 'canceled',
}

export enum StatusPayment {
    PENDING = 'pending',
    APPROVED = 'approved',
    DECLINED = 'declined',
    CANCELED = 'canceled',
}

export enum PaymentMethod {
    CREDIT_CARD = 'credit_card',
    DEBIT_CARD = 'debit_card',
    PIX = 'pix',
    PAYMENT_SLIP = 'payment_slip',
}