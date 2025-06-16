/* eslint-disable no-undef */
describe('Produtos', () => {
	it('Existe produto dashboard', () => {
		//Produto
		cy.visit('http://localhost:3000');
		cy.contains('Produtos').click();
		cy.url().should('include', '/mdp/produtos');
	});

	it("Adicionar Produto", () => {
		//Adicionar Produto
		cy.contains('Adicionar Produto').click();
		cy.get('input[name=descricao]').type('ezclap');
		cy.get('#demo-simple-select').click();
		cy.contains('Sad').click();
		cy.contains('Add Produto').click();
		cy.get('p[class="my-auto"]').contains('ezclap');
	});

	it("Remover Produto", () => {
		//Eliminar Produto
		cy.get('button[id="delButton"]').first().click();
		cy.contains('Yes').click();
		cy.visit('/mdp/produtos');
	});

	it("Editar Produto", () => {
		//Editar Produto
		cy.get('button[id="editProduto"]').first().click();
		cy.get('#demo-simple-select').click();
		cy.contains('Sad').click();
		cy.contains('Add Produto').click();
		cy.visit('/mdp/produtos');

		//Remover Plano Fabrico
		cy.visit('/mdp/planos_fabrico');
		cy.get('button[id="delButton"]').last().click();
		cy.contains('Yes').click();

		//Remover Operacoes
		cy.visit('mdf/operacoes');
		cy.get('button[id="delButton"]').last().click();
		cy.contains('Yes').click()
	})
});
