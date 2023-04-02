const controller = require('../controllers/groupController');
const db = require('../config/index');
const Groups = db.groups;

describe('Groups controller', () => {
  const mockData = [    { id: 1, name: 'group1', permissions: 'read' },    { id: 2, name: 'group2', permissions: 'write' },    { id: 3, name: 'group3', permissions: 'read,write' },  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should get all groups', async () => {
    Groups.findAll = jest.fn().mockResolvedValue(mockData);
    const req = {};
    const res = { send: jest.fn() };

    await controller.getGroups(req, res);

    expect(Groups.findAll).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(mockData);
  });

  it('should get a group by id', async () => {
    const mockId = 1;
    const mockGroup = { id: mockId, name: 'group1', permissions: 'read' };
    Groups.findByPk = jest.fn().mockResolvedValue(mockGroup);
    const req = { params: { id: mockId } };
    const res = { send: jest.fn() };

    await controller.getGroup(req, res);

    expect(Groups.findByPk).toHaveBeenCalledTimes(1);
    expect(Groups.findByPk).toHaveBeenCalledWith(mockId);
    expect(res.send).toHaveBeenCalledWith(mockGroup);
  });

  it('should create a new group', async () => {
    const mockUser = { name: 'group4', permissions: 'read,write' };
    const mockCreatedGroup = { id: 4, ...mockUser };
    Groups.create = jest.fn().mockResolvedValue(mockCreatedGroup);
    const req = { body: mockUser };
    const res = { send: jest.fn() };

    await controller.postGroup(req, res);

    expect(Groups.create).toHaveBeenCalledTimes(1);
    expect(Groups.create).toHaveBeenCalledWith(mockUser);
    expect(res.send).toHaveBeenCalledWith(mockCreatedGroup);
  });

  it('should update a group by id', async () => {
    const mockId = 1;
    const mockUpdate = { name: 'updated-group', permissions: ['write'] };
    const mockUpdatedRows = 1;
    Groups.update = jest.fn().mockResolvedValue(mockUpdatedRows);
    Groups.findByPk = jest.fn().mockResolvedValue({ id: mockId, ...mockData[mockId - 1] });
    const req = { params: { id: mockId }, body: mockUpdate };
    const res = { send: jest.fn() };

    await controller.updateGroup(req, res);

    expect(Groups.update).toHaveBeenCalledTimes(1);
    expect(Groups.update).toHaveBeenCalledWith(mockUpdate, { where: { id: mockId } });
    expect(res.send).toHaveBeenCalledWith({ message: 'User was updated successfully.' });
  });

  it('should delete a group by id', async () => {
    const mockId = 1;
    const mockDeletedRows = 1;
    Groups.destroy = jest.fn().mockResolvedValue(mockDeletedRows);
    const req = { params: { id: mockId } };
    const res = { send: jest.fn() };

    await controller.deleteGroup(req, res);

    expect(Groups.destroy).toHaveBeenCalledTimes(1);
    expect(Groups.destroy).toHaveBeenCalledWith({ where: { id: mockId } });
    expect(res.send).toHaveBeenCalledWith({ message: 'User was deleted successfully!' });
  });
});