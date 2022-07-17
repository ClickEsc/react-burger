describe('Страница доступна: Конструктор', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('По умолчанию открывается страница Конструктор', function () {
    cy.contains('Соберите бургер');
  });

  it('По клику на ингредиент открывается модальное окно с описанием ингредиента', function () {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента');
    cy.get('[data-at=btn-close').click();
    cy.contains('Соберите бургер');
  });

  it('Ингредиенты перетаскиваются в конструктор и могут меняться местами в конструкторе', function () {
    cy.get('[data-at=ingredients]').as('ingredients');
    cy.get('[data-at=constructor]').as('constructor');

    cy
      .get('@ingredients').first()
      .trigger('dragstart')
      .trigger('dragleave');

    cy
      .get('@constructor')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend');

    cy.get('[data-at=constructor-item]').as('item');
    cy.get('@item');
  });

  it(`По клику на кнопку Оформить заказ
   - открывается модальное окно с информацией по заказу (если пользователь авторизован)
   - переход на страницу авторизации --> авторизация --> модальное окно с информацией по заказу`, () => {
    cy.get('button').contains('Оформить заказ').should('not.be.disabled').click();
    cy.url().then(($url) => {
      if ($url.includes("/login")) {
        cy.get('input[name="email"]').type('test1234@test1234.ru');
        cy.get('input[name="password"]').type('test1234');
        cy.get('button').contains('Войти').click();
        cy.contains('Соберите бургер');
        cy.get('button').contains('Оформить заказ').should('not.be.disabled').click();
      }
      cy.contains('Загрузка...');
    })
  });

  it('Модальное окно закрывается', function () {
    cy.get('[data-at=btn-close').click();
    cy.contains('Соберите бургер');
  });
});