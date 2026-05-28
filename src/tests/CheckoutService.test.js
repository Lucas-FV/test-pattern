const { CheckoutService } = require('../services/CheckoutService');
const CarrinhoBuilder = require('./builders/CarrinhoBuilder');
const UserMother = require('./builders/UserMother');

describe('CheckoutService', () => {
  
  describe('quando o pagamento falha', () => {
    it('deve retornar null', async () => {
      
      // Arrange
      const carrinho = new CarrinhoBuilder().build();

      const gatewayStub = { 
        cobrar: jest.fn().mockResolvedValue({ success: false }) 
      };
      const repositoryDummy = { salvar: jest.fn() };
      const emailDummy = { enviarEmail: jest.fn() };

      const checkoutService = new CheckoutService(gatewayStub, repositoryDummy, emailDummy);

      // Act
      const pedido = await checkoutService.processarPedido(carrinho);

      // Assert
      expect(pedido).toBeNull();
      
    });
  });

  describe('quando um cliente Premium finaliza a compra', () => {
    it('deve aplicar desconto e enviar e-mail de aprovacao', async () => {
      
      // Arrange
      const usuarioPremium = UserMother.umUsuarioPremium();
      const carrinho = new CarrinhoBuilder()
        .comUser(usuarioPremium)
        .comItens([{ nome: 'Produto Caro', preco: 200.0, quantidade: 1 }])
        .build();

      const gatewayStub = { 
        cobrar: jest.fn().mockResolvedValue({ success: true }) 
      };
      const repositoryStub = { 
        salvar: jest.fn().mockResolvedValue({ id: 123, status: 'APROVADO' }) 
      };
      const emailMock = { 
        enviarEmail: jest.fn() 
      };

      const checkoutService = new CheckoutService(gatewayStub, repositoryStub, emailMock);

      // Act
      await checkoutService.processarPedido(carrinho);

      // Assert
      expect(gatewayStub.cobrar).toHaveBeenCalledWith(180, undefined);
      expect(emailMock.enviarEmail).toHaveBeenCalledTimes(1);
      expect(emailMock.enviarEmail).toHaveBeenCalledWith(
        'premium@email.com', 
        'Seu Pedido foi Aprovado!', 
        expect.anything()
      );
      
    });
  });

});