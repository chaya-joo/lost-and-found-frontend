export default function formatDate(dateString: string) {
  const dateParts = dateString.split('T')[0].split('-');
  const day = dateParts[2];
  const month = dateParts[1];
  const year = dateParts[0];
  return `${day}/${month}/${year}`;
}