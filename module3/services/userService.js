module.exports = userRepository => ({
  createOrUpdate({ id, login, password, age, isDeleted }) {
    return userRepository.createOrUpdate({
      id,
      login,
      password,
      age,
      isDeleted,
    });
  },
});