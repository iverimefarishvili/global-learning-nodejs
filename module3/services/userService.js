module.exports = userRepository => ({
  createOrUpdate({ id, login, password, age, is_deleted }) {
    return userRepository.createOrUpdate({
      id,
      login,
      password,
      age,
      is_deleted,
    });
  },
});