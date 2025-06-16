describe('Teste Operacoes', function () {
	it('Visits MyOwnCuttlery', function () {
		cy.visit('http://localhost:3000/')
	})

	it("Remover Operação1", () => {
		cy.contains("Operações").click()
		cy.get('button[id="delButton"]').first().click();
		cy.contains("Yes").click()
	});

	it("Remover Operação2", () => {
		cy.contains("Operações").click()
		cy.get('button[id="delButton"]').first().click();
		cy.contains("Yes").click()
	});

	it("Remover Operação3", () => {
		cy.contains("Operações").click()
		cy.get('button[id="delButton"]').first().click();
		cy.contains("Yes").click()
	});

	it("Remover tipo de máquina1", () => {
		cy.contains("Tipos de Máquina").click()
		cy.get('button[id="delButton"]').first().click();
		cy.contains("Yes").click()
	});

	it("Remover tipo de máquina2", () => {
		cy.contains("Tipos de Máquina").click()
		cy.get('button[id="delButton"]').first().click();
		cy.contains("Yes").click()
	});

	it("Remover máquina", () => {
		cy.contains("Máquinas").click();
		cy.url().should('include', '/mdf/maquinas');

		cy.get('#delButton').last().click();
		cy.contains("Yes").click();
	});


})
