/* eslint-disable no-undef */
describe('Sidebar', () => {

	it('Hyperlinks da sidebar', () => {
		cy.visit("http://localhost:3000/");

		cy.get("#linkToMdf").click();
		cy.get('#linkToLinhasProducao').click()
		cy.get('#linkToMaquina').click();
		cy.get('#linkToTipoMaquina').click();
		cy.get('#linkToOperacoes').click();

		cy.get("#linkToMdp").click();
		cy.get('#linkToProdutos').click();
		cy.get('#linkToPlanosFabrico').click();

		cy.get("#homeLink").click();
	});

	it('Footer', () => {
		cy.get("#linkFacebook").click();
		cy.visit("http://localhost:3000/");
		cy.get("#linkPaginaIsep").click();
		cy.visit("http://localhost:3000/");
	});

});
