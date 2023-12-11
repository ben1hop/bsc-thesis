export default function getDataSetColor(ind: number): string {
  const index = ind % 5;
  switch (index) {
    case 0:
      return 'secondary';
    case 1:
      return 'primary';
    case 2:
      return 'accent';
    case 3:
      return 'forth';
    case 4:
      return 'fifth';
    default:
      return 'primary';
  }
}
