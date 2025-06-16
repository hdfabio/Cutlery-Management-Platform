/* eslint-disable no-undef */
describe('Plano de Fabrico', () => {
	it('Criar operação', () => {
		//Criar Operacoes
		cy.visit('mdf/operacoes');
		cy.contains('Adicionar Operação').click();
		cy.get('input[id=descricao]').type('operacaoEspecial');
		cy.get('input[id=duracao]').type('24');
		cy.contains('Add Operação').click();

		//Criar Plano Fabrico
		cy.visit('/mdp/planos_fabrico');
		cy.contains('Adicionar Plano de Fabrico').click();
		cy.get('input[name=descricao').type('Sad');
		cy.get('#select-plano-fabrico').click({force: true});
		cy.contains('operacaoEspecial').click();
		cy.contains('Add Plano de Fabrico').click({force: true});


		//PlanoFabrico
		cy.visit('/mdp/planos_fabrico');
		cy.contains('Adicionar Plano de Fabrico').click();
		cy.get('input[name=descricao').type('ggez');
		cy.get('#select-plano-fabrico').click({force: true});
		cy.contains('operacaoEspecial').click();
		cy.contains('Add Plano de Fabrico').click({force: true});


		//Remover Plano Fabrico
		cy.visit('/mdp/planos_fabrico');
		cy.get('button[id="delButton"]').last().click();
		cy.contains('Yes').click()
	});

	it('Criar plano de fabrico', () => {
		//Criar Plano Fabrico
		cy.visit('/mdp/planos_fabrico');
		cy.contains('Adicionar Plano de Fabrico').click();
		cy.get('input[name=descricao').type('Sad');
		cy.get('#select-plano-fabrico').click({force: true});
		cy.contains('operacaoEspecial').click();
		cy.contains('Add Plano de Fabrico').click({force: true});

		//PlanoFabrico
		cy.visit('/mdp/planos_fabrico');
		cy.contains('Adicionar Plano de Fabrico').click();
		cy.get('input[name=descricao').type('ggez');
		cy.get('#select-plano-fabrico').click({force: true});
		cy.contains('operacaoEspecial').click();
		cy.contains('Add Plano de Fabrico').click({force: true});
	});

	it("Remover plano de fabrico", () => {
		//Remover Plano Fabrico
		cy.visit('/mdp/planos_fabrico');
		cy.get('button[id="delButton"]').last().click();
		cy.contains('Yes').click()
	});
});
