import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CompanyService } from 'src/companies/company.service';
import { CompanyMemberService } from 'src/companies/members.service';
import { RoleProvider } from 'src/entities/enum';
import { UserService } from 'src/users/user.service';
import Stripe from 'stripe';

export interface stripeAccount {
  companyName: string | undefined;
  stripeAccountId: string | undefined;
  deletedAccountId?: string | undefined;
}

@Injectable()
export class PaymentsService {
  constructor(
    @Inject('STRIPE_CLIENT') private readonly stripe: Stripe,

    private readonly companyService: CompanyService,
    private readonly userService: UserService,
    private readonly companyMember: CompanyMemberService,
  ) {}

  // Retorna o forms seguro do Stripe que segue as normas PCI
  async createOnboardingLink(userId: string, companyId: string) {
    const company = await this.companyService.findById(companyId);
    // TODO: Criar um novo role que será definido como owner (responsável)
    // TODO: Adicionar coluna na empresa sobre o status de validação da empresa
    // QUE MODULO DO CARALHO, INFERNO!!!
    /** Solição temporária: Somente o manager poderá configurar os dados da empresa
     * no stripe para realizar esta ação o frontend precisará enviar o userId
     * como parâmetro
     * */
    const companyManager = await this.companyMember.findCompanyMember(
      userId,
      companyId,
    );

    if (companyManager.providerRole !== RoleProvider.MANAGER) {
      throw new UnauthorizedException(`User must be a manager`);
    }

    const account = await this.stripe.accounts.create({
      type: 'express',
      country: 'BR',
      business_type: 'company',
      email: companyManager.user.email,
      company: {
        name: company.name,
        tax_id: company.cnpj,
      },
      metadata: {
        companyId: company.id,
        cnpj: company.cnpj,
      },
    });

    await this.companyService.updateStripeAccountId(company.id, account.id);
    console.log('ID do Stripe: ', account.id);

    const accountLink = await this.stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'http://localhost:5173/refresh', // caso de errado
      return_url: 'http://localhost:5173/return', //caso dê certo
      type: 'account_onboarding',
    });

    return await accountLink;
  }

  async handleWebhookEvent(signature: string, rawBody: Buffer) {
    let event: Stripe.Event;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET; // Crie esta variável no seu .env

    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET não está configurado no .env');
    }

    try {
      // Verifique a assinatura para garantir que o evento veio do Stripe
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret,
      );
    } catch (err: any) {
      console.error(`Webhook signature verification failed.`, err);
      throw new BadRequestException(`Webhook Error: ${err}`);
    }

    // Lide com o evento específico
    switch (event.type) {
      case 'account.updated': {
        console.log('requesting event type: ', event.type);
        const account = event.data.object;
        await this.handleAccountUpdated(account);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        // TODO: Lógica para quando um pagamento de cliente for bem-sucedido
        console.log(`Pagamento ${paymentIntent.id} bem-sucedido!`);
        break;
      }

      default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    // Responda ao Stripe com 200 OK
    return { received: true };
  }

  async getStripeStatusAccount(companyId: string) {
    const company = await this.companyService.findById(companyId);
    if (!company.stripeAccountId) {
      throw new BadRequestException(
        'Esta empresa não possui uma conta Stripe vinculada.',
      );
    }

    const account = await this.stripe.accounts.retrieve(
      company.stripeAccountId,
    );

    return {
      charges_enabled: account.charges_enabled,
      payouts_enabled: account.payouts_enabled,
      status:
        account.charges_enabled && account.payouts_enabled
          ? 'ATIVO'
          : 'PENDENTE',
    };
  }

  /** Este método só existirá na fase de desenvolvimento para limpar as
   * dados da conta stripe
   */

  async deleteAllTestAccounts(): Promise<stripeAccount[] | undefined> {
    console.log('iniciando exclusão de constas teste');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    const deletedAccounts: stripeAccount[] = [];
    try {
      for await (const account of this.stripe.accounts.list({ limit: 100 })) {
        try {
          const deletedStripeAccount: stripeAccount = {
            companyName: account.company?.name || '',
            stripeAccountId: account.id || '',
          };
          const deleted = await this.stripe.accounts.del(account.id);
          console.log(`Excluido conta ID: ${deleted.id}`);
          deletedStripeAccount.deletedAccountId = deleted.id;
          if (deleted) deletedAccounts.push(deletedStripeAccount);
          console.table(deletedAccounts);
        } catch (error) {
          console.error('Erro ao excluir conta', account.id);
          console.error(error);
        }
      }
    } catch (error) {
      console.error('Erro ao listar contas');
      console.error(error);
    }
    return deletedAccounts;
  }

  async deleteStripeAccount(companyId: string, stripeAccountId?: string) {
    if (companyId) {
      const company = await this.companyService.findById(companyId);

      if (!company) throw new NotFoundException('Not Found');

      if (!company.stripeAccountId)
        throw new NotFoundException('Stripe Account id must be valid');

      const deleted = await this.stripe.accounts.del(company.stripeAccountId);

      if (!deleted) throw new Error('COuld not delete account');

      return deleted;
    }

    if (stripeAccountId) {
      const deleted = await this.stripe.accounts.del(stripeAccountId);
      return deleted;
    }
  }

  /**
   * - stripeClientId
   * - name
   * - email
   * **/
  async createClientAccountLink(userId: string) {
    if (!userId) throw new BadRequestException('');

    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const data = await this.stripe.customers.create({
      name: user.fullName,
      email: user.email,
      metadata: {
        userId: user.id,
        email: user.email,
      },
    });

    const accountLink = this.stripe.accountLinks.create({
      account: data.id,
      type: 'account_onboarding',
    });

    return {
      data,
      accountLink,
    };
  }

  async deleteCustomerStripeAccount(userCustumerId: string) {
    const deletedUser = await this.stripe.customers.del(userCustumerId);
    console.log('deletedUser', deletedUser);
    if (!deletedUser) throw new Error('');
    return deletedUser;
  }

  private handleAccountUpdated(account: Stripe.Account) {
    const { id, charges_enabled, payouts_enabled } = account;

    const isFullyEnabled = charges_enabled && payouts_enabled;
    console.log(
      'charges_enable',
      charges_enabled,
      'payout_enable',
      payouts_enabled,
    );

    console.log(`Webhook 'account.updated': ID=${id}, Ativa=${isFullyEnabled}`);

    try {
      // Busque a empresa no seu DB pelo stripeAccountId
      // const company = await this.companyService.findByStripeAccountId(id);
      if (account) {
        // ATUALIZE A COLUNA DE STATUS NO SEU BANCO DE DADOS
        // (Você precisa criar esta coluna/lógica no seu CompanyService)
        // ex: await this.companyService.updatePaymentStatus(company.id, isFullyEnabled);
        console.log(
          `Atualizando status da empresa ${account.company?.name} para ${isFullyEnabled}`,
        );
      }
    } catch (error) {
      console.error(
        `Erro ao atualizar status da empresa para conta ${id}`,
        error,
      );
    }
  }
}
