describe('Teste MDF E3E', function () {
	it('Visits MyOwnCuttlery', function () {
		cy.visit('http://localhost:3000/')
	})

	it('Cria tipo de maquina', function () {
		cy.contains("Tipos de Máquina").click()
		cy.contains("Adicionar Tipo de Maquina").click()
		cy.get('input[name="descricao"]')
			.type("Nova Descrição E2E")
		cy.get('#select-plano-fabrico').click()
		cy.contains("Nova Descrição 1").click()
		cy.contains("Add TipoMaquina").click({force: true})
	});

	it('detalhes tipo de  maquina', function () {
		cy.contains("Tipos de Máquina").click()
		cy.get("#tipoInfoId").click()
		cy.get("#closeId").click()
	});


	it('altera tipo de maquina - adiciona operação', function () {
		cy.contains("Tipos de Máquina").click()

		cy.get('#addOpId').first().click();
		cy.get('#demo-controlled-open-select').click()
		cy.contains("Nova Descrição 2").click()
		cy.contains("Submit").click({force: true})
	});

	it('altera tipo de maquina - Substitui operações', function () {
		cy.contains("Tipos de Máquina").click()
		cy.get('#addOpId').first().click();
		cy.contains("Alterar operações").click()
		cy.get('#demo-controlled-open-select').click()
		cy.contains("Nova Descrição 3").click()
		cy.contains("Submit").click({force: true})
	});


	it("Remover tipo de máquina", () => {
		cy.contains("Tipos de Máquina").click()
		cy.get('button[id="delButton"]').first().click();
		cy.contains("Yes").click()
	});


	//Tipos de maquina para futuros testes
	it('Cria tipo de maquina2', function () {
		cy.contains("Tipos de Máquina").click()
		cy.contains("Adicionar Tipo de Maquina").click()
		cy.get('input[name="descricao"]')
			.type("tipo1")
		cy.get('#select-plano-fabrico').click()
		cy.contains("Nova Descrição 1").click()
		cy.contains("Add TipoMaquina").click({force: true})
	});

	it('Cria tipo de maquina3', function () {
		cy.contains("Tipos de Máquina").click()
		cy.contains("Adicionar Tipo de Maquina").click()
		cy.get('input[name="descricao"]')
			.type("tipo2")
		cy.get('#select-plano-fabrico').click()
		cy.contains("Nova Descrição 1").click()
		cy.contains("Add TipoMaquina").click({force: true})
	});

})

