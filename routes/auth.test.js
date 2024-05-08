const { signUp } = require('./auth');
const { signIn } = require('./auth');
const db = require('../models/index');

describe('signUp function', () => {
    it('should sign up a new user with valid data', async () => {
      // Mock req, res, and next
      const req = { body: { username: 'testuser', password: 'testpassword123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
  
      // Mock User.create method
      db.User.create = jest.fn().mockResolvedValueOnce({ id: '123', username: 'testuser' });
  
      // Mock jwt.sign method
      const jwtMock = jest.spyOn(require('jsonwebtoken'), 'sign');
      jwtMock.mockReturnValueOnce('mocked_token');
  
      // Call the function
      await signUp(req, res, next);
  
      // Expectations
      expect(db.User.create).toHaveBeenCalledWith(req.body);
      expect(jwtMock).toHaveBeenCalledWith(
        { id: '123', username: 'testuser' },
        process.env.SECRET_KEY
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: '123',
        username: 'testuser',
        token: 'mocked_token'
      });
      expect(next).not.toHaveBeenCalled();
    });
  
    it('should return an error if password is less than 10 characters', async () => {
      // Mock req, res, and next with short password
      const req = { body: { username: 'testuser', password: 'short' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
  
      // Call the function
      await signUp(req, res, next);
  
      // Expectations
      expect(next).toHaveBeenCalledWith({
        status: 400,
        message: 'Password must be at least 10 characters long'
      });
    });
});
  