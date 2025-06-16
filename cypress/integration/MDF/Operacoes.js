describe('Teste Operacoes', function () {
	it('Visits MyOwnCuttlery', function () {
		cy.visit('http://localhost:3000/')
	})

	it('Cria operação', function () {
		cy.contains("Operações").click()
		cy.contains("Adicionar Operação").click()
		cy.get('input[name="descricao"]')
			.type("Nova Descrição E2E")
		cy.get('input[name="duracao"]')
			.type("60")
		cy.contains("Add Operação").click()

	});

	it("Alterar operação", () => {
		cy.contains("Operações").click()
		cy.get('#btnModId').first().click()
		cy.get('input[name="duracao"]').clear()
		cy.get('input[name="duracao"]').type("59")
		//cy.get('#exampleModalCenterTitle').click()
		cy.get('#altId').click()
	});

	it("Detalhes operação", () => {
		cy.contains("Operações").click()
		cy.get("#btnInfoOp").click()
		cy.get("#closeId").click()
	});


	it("Remover Operação", () => {
		cy.contains("Operações").click()
		cy.get('button[id="delButton"]').first().click();
		cy.contains("Yes").click()
	});

	it('Cria operação2', function () {
		cy.contains("Operações").click()
		cy.contains("Adicionar Operação").click()
		cy.get('input[name="descricao"]')
			.type("Nova Descrição 1")
		cy.get('input[name="duracao"]')
			.type("60")
		cy.contains("Add Operação").click()
	});

	it('Cria operação3', function () {
		cy.contains("Operações").click()
		cy.contains("Adicionar Operação").click()
		cy.get('input[name="descricao"]')
			.type("Nova Descrição 2")
		cy.get('input[name="duracao"]')
			.type("60")
		cy.contains("Add Operação").click()
	});

	it('Cria operação4', function () {
		cy.contains("Operações").click()
		cy.contains("Adicionar Operação").click()
		cy.get('input[name="descricao"]')
			.type("Nova Descrição 3")
		cy.get('input[name="duracao"]')
			.type("60")
		cy.contains("Add Operação").click()
	});


})
