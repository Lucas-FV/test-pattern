const { User } = require('../../domain/User');

class UserMother {
  static umUsuarioPadrao() {
    return new User({
      id: 1,
      nome: 'João Padrão',
      email: 'joao@email.com',
      tipo: 'PADRAO'
    });
  }

static umUsuarioPremium() {
    const user = new User({
      id: 2,
      nome: 'Maria Premium',
      email: 'premium@email.com',
      tipo: 'PREMIUM'
    });
    
    user.isPremium = jest.fn().mockReturnValue(true); 
    
    user.email = 'premium@email.com'; 
    
    return user;
  }
}

module.exports = UserMother;