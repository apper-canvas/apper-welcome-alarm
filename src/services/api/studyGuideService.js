import studyGuidesData from '../mockData/studyGuides.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let data = [...studyGuidesData];

export const getAll = async () => {
  await delay(300);
  return [...data];
};

export const getById = async (id) => {
  await delay(200);
  const item = data.find(item => item.id === id);
  if (!item) {
    throw new Error('Study guide not found');
  }
  return { ...item };
};

export const create = async (item) => {
  await delay(400);
  const newItem = {
    ...item,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  data.push(newItem);
  return { ...newItem };
};

export const update = async (id, updates) => {
  await delay(350);
  const index = data.findIndex(item => item.id === id);
  if (index === -1) {
    throw new Error('Study guide not found');
  }
  data[index] = { 
    ...data[index], 
    ...updates, 
    updatedAt: new Date().toISOString() 
  };
  return { ...data[index] };
};

export const delete_ = async (id) => {
  await delay(300);
  const index = data.findIndex(item => item.id === id);
  if (index === -1) {
    throw new Error('Study guide not found');
  }
  const deleted = data.splice(index, 1)[0];
  return { ...deleted };
};

// Alias for better naming
export const deleteById = delete_;
export { delete_ as delete };