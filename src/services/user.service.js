const users = [];

export function resetUsers() {
  users.length = 0;
}

export function getAll() {
  return users;
}

export function getById(id) {
  return users.find((user) => user.id === id) ?? null;
}

export function create({ name }) {
  const id = users.length ? Math.max(...users.map((item) => item.id)) + 1 : 1;
  const user = { id, name };

  users.push(user);

  return user;
}

export function update({ id, name }) {
  const user = users.find((item) => item.id === id);

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
}

export function deleteById(id) {
  const index = users.findIndex((item) => item.id === id);

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
}

export const userService = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
