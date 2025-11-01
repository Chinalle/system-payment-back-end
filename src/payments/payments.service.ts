import { Inject, Injectable } from '@nestjs/common';
import { CompanyService } from 'src/companies/company.service';
import { CompanyMemberService } from 'src/companies/members.service';
import { UserService } from 'src/users/user.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject('STRIPE_CLIENT') private readonly stripe: Stripe,

    private readonly companyService: CompanyService,
    private readonly userService: UserService,
    private readonly companyMember: CompanyMemberService,
  ) {}

  // Retorna o forms seguro do Stripe que segue as normas PCI
  async createOnboardingLink(companyId: string) {
    const company = await this.companyService.findById(companyId);
    // TODO: Criar um novo role que será definido como owner (responsável)
    // TODO: Adicionar coluna na empresa sobre o status de validação da empresa
    // const userOwner = (
    //   await this.companyMember.findAllCompanyMembers(companyId)
    // ).filter((cm) => cm.providerRole === RoleProvider.MANAGER);

    const account = await this.stripe.accounts.create({
      type: 'express',
      country: 'BR',
      business_type: 'company',
      company: {
        name: `${company.name + '-' + company.cnpj}`,
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
}
