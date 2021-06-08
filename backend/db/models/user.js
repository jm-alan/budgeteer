'use strict';
const {
  Model,
  Op,
  ValidationError,
  ValidationErrorItem
} = require('sequelize');
const { hashSync, compareSync } = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    validatePass (password) {
      return compareSync(password, this.password) ? this.info : null;
    }

    get info () {
      const { username, email } = this;
      return { username, email };
    }

    static async LogIn ({ identification, password }) {
      if (!identification || !password) return null;
      const potentialUser = await User.findOne({
        where: {
          [Op.or]: [
            { username: identification },
            { email: identification }
          ]
        }
      });
      return potentialUser && potentialUser.validatePass(password);
    }

    static async SignUp ({ username, email, password }) {
      const newUser = new User({ username, email, password });
      return (await newUser.save()).info;
    }

    static associate (models) {
      [models.Account, models.Item].forEach(model => {
        User.hasMany(model, { foreignKey: 'ownerId' });
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: ['[a-zA-Z0-9_]{8,30}'],
          msg: 'Username must be between 8 and 30 characters, and may only contain the letters A-Z, the numbers 0-9, or an underscore.'
        },
        not: {
          args: 'email',
          msg: 'Username cannot be an email'
        },
        set (val) {
          if (!val.match(/[a-zA-Z0-9_]{8,30}/)) {
            const errors = [];
            if (val.length < 8) errors.push(new ValidationErrorItem('Username must be at least 8 characters'));
            if (val.length > 30) errors.push(new ValidationErrorItem('Username may not exceed 30 characters'));
            if (val.match(/[^a-zA-Z0-9_]/g)) errors.push('Username may only contain the letters A-Z, the numbers 0-9, or an underscore');
            throw new ValidationError('Invalid username', errors);
          } else this.setDataValue('username', val);
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: ['^[a-zA-Z0-9+-_~]{1,64}@(?=.{1,64}\\.)\\w+[a-zA-Z-]\\w+\\.\\w{1,63}$'],
          msg: 'Please provide a valid email address.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      set (val) {
        if (!val.match(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[0-9])(?=\S*[!@#$%^&*()`~-])[a-zA-Z0-9!@#$%^&*()`~-]{8,}$/)) {
          const errors = [];
          if (val.length < 8) errors.push(new ValidationErrorItem('Password must be at least 8 characters.'));
          if (val.match(/\s/g)) errors.push(new ValidationErrorItem('Password must not contain spaces.'));
          if (!val.match(/(?=\S*[A-Z])/)) errors.push(new ValidationErrorItem('Password must contain at least 1 uppercase letter.'));
          if (!val.match(/(?=\S*[a-z])/)) errors.push(new ValidationErrorItem('Password must contain at least 1 lowercase letter.'));
          if (!val.match(/(?=\S*[0-9])/)) errors.push(new ValidationErrorItem('Password must contain at least 1 of these symbols: !@#$%^&*()`~-'));
          if (!val.match(/^[a-zA-Z0-9!@#$%^&*()`~-]+$/)) errors.push(new ValidationErrorItem('Password may only contain letters, numbers, and these symbols: !@#$%^&*()`~-'));
          throw new ValidationError('Invalid password.', errors);
        } else this.setDataValue('password', hashSync(val));
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};
