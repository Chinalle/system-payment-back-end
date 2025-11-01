export enum Role {
  CLIENT = 'client',
  PROVIDER = 'provider',
  ADMIN = 'admin',
}

export enum RoleProvider {
  MANAGER = 'manager',
  COLLABORATOR = 'collaborator',
}

export enum QuotationRequest {
  PENDING = 'pending',
  ANSWERED = 'answered',
  CANCELED = 'canceled',
}

export enum Quotation {
  PROPOSED = 'pending',
  ACCEPTED = 'answered',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
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
