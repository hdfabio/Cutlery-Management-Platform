/* eslint-disable no-undef */
describe('Máquinas', function () {

	it('Cria máquina', function () {
		cy.visit('http://localhost:3000/');

		cy.contains("Máquinas").click();
		cy.url().should('include', '/mdf/maquinas');

		cy.contains("Adicionar Maquina").click();
		cy.get('input[name="descricao"]')
			.type("Nova Descrição E2E");
		cy.get('input[name="localizacao"]')
			.type("Nova localizacao E2E");
		cy.get('#demo-simple-select').click();
		cy.contains("tipo1").click();
		cy.contains("Add Maquina").click();
	});

	it("Alterar máquina", () => {
		cy.contains("Máquinas").click();
		cy.get('#ButaoModificarId').first().click();
		cy.get('#demo-simple-select').click();
		cy.contains("tipo2").click();
		cy.contains("Edit Maquina").click();
	});

	it("Remover máquina", () => {
		cy.contains("Máquinas").click();
		cy.url().should('include', '/mdf/maquinas');

		cy.get('#delButton').last().click();
		cy.contains("Yes").click();
	});

	it("Pesquisa maquinas de um tipo de maquina", () => {
		cy.get('#demo-customized-select').click();
		cy.contains("tipo1").click();

		cy.get('#searchButton').click();
		cy.contains("Close").click()
	})

	//para futuros testes
	it('Cria máquina2', function () {
		cy.visit('http://localhost:3000/');

		cy.contains("Máquinas").click();
		cy.url().should('include', '/mdf/maquinas');

		cy.contains("Adicionar Maquina").click();
		cy.get('input[name="descricao"]')
			.type("Maquina1");
		cy.get('input[name="localizacao"]')
			.type("Nova localizacao E2E");
		cy.get('#demo-simple-select').click();
		cy.contains("tipo1").click();
		cy.contains("Add Maquina").click();
	});

});
