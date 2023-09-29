export const formatDate = isoDateString => {
  const options = { day: 'numeric', month: 'long' };
  return new Date(isoDateString).toLocaleDateString('es-ES', options);
};
