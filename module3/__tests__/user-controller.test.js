const controller = require('../controllers/userController');
const db = require('../config/index');
const Users = db.users;

describe('Users controller', () => {
  const mockData = [    
    { id: 1, name: 'User1', password: 'password', is_deleted: false },    
    { id: 2, name: 'User2', password: 'password', is_deleted: false },    
    { id: 3, name: 'User3', password: 'password', is_deleted: false } 
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should get all Users', async () => {
    Users.findAll = jest.fn().mockResolvedValue(mockData);
    const req = {};
    const res = { send: jest.fn() };

    await controller.getUsers(req, res);

    expect(Users.findAll).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(mockData);
  });

  it('should get a User by id', async () => {
    const mockId = 1;
    const mockUser = { id: mockId, name: 'User1', permissions: 'read' };
    Users.findByPk = jest.fn().mockResolvedValue(mockUser);
    const req = { params: { id: mockId } };
    const res = { send: jest.fn() };

    await controller.getUser(req, res);

    expect(Users.findByPk).toHaveBeenCalledTimes(1);
    expect(Users.findByPk).toHaveBeenCalledWith(mockId);
    expect(res.send).toHaveBeenCalledWith(mockUser);
  });

  it('should create a new User', async () => {
    const mockUser = { name: 'User4', permissions: 'read,write' };
    const mockCreatedUser = { id: 4, ...mockUser };
    Users.create = jest.fn().mockResolvedValue(mockCreatedUser);
    const req = { body: mockUser };
    const res = { send: jest.fn() };

    await controller.postUser(req, res);

    expect(Users.create).toHaveBeenCalledTimes(1);
    expect(Users.create).toHaveBeenCalledWith(mockUser);
    expect(res.send).toHaveBeenCalledWith(mockCreatedUser);
  });

  it('should update a User by id', async () => {
    const mockId = 1;
    const mockUpdate = { name: 'updated-User', permissions: ['write'] };
    const mockUpdatedRows = 1;
    Users.update = jest.fn().mockResolvedValue(mockUpdatedRows);
    Users.findByPk = jest.fn().mockResolvedValue({ id: mockId, ...mockData[mockId - 1] });
    const req = { params: { id: mockId }, body: mockUpdate };
    const res = { send: jest.fn() };

    await controller.updateUser(req, res);

    expect(Users.update).toHaveBeenCalledTimes(1);
    expect(Users.update).toHaveBeenCalledWith(mockUpdate, { where: { id: mockId } });
    expect(res.send).toHaveBeenCalledWith({ message: 'User was updated successfully.' });
  });

  it('should delete a User by id', async () => {
    const mockId = 1;
    const mockDeletedRows = 1;
    Users.destroy = jest.fn().mockResolvedValue(mockDeletedRows);
    const req = { params: { id: mockId } };
    const res = { send: jest.fn() };

    await controller.deleteUser(req, res);

    expect(Users.destroy).toHaveBeenCalledTimes(1);
    expect(Users.destroy).toHaveBeenCalledWith({ where: { id: mockId } });
    expect(res.send).toHaveBeenCalledWith({ message: 'User was deleted successfully!' });
  });
});