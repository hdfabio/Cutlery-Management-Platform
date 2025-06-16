describe('Teste Linha producao', function () {
	it('Visits MyOwnCuttlery', function () {
		cy.visit('http://localhost:3000/')
	})

	it('Cria linha producao', function () {
		cy.contains("Linhas de Produção").click()
		cy.contains("Adicionar Linha de Produção").click()
		cy.get('input[name="descricao"]')
			.type("Nova Descrição E2E")
		cy.get('#select-plano-fabrico').click()
		cy.contains("Maquina1").click();
		cy.contains("Add Linha de Produção").click({force: true})
	});


	it("Detalhes Linha de Produção", () => {
		cy.contains("Linhas de Produção").click()
		cy.get("#linhaInfoId").click()
		cy.get("#closeId").click()
	});

	it("Remover Linha de Produção", () => {
		cy.contains("Linhas de Produção").click()
		cy.get('#delButton').last().click();
		cy.contains("Yes").click();
	});


})
