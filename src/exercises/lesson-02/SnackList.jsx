export default function SnackList() {
  const snacks = [
    { name: 'Bananas', rank: 3 },
    { name: 'Cereal', rank: 2 },
    { name: 'Doritos', rank: 1 },
  ];

  const sortedSnacks = snacks.toSorted((a, b) => a.rank - b.rank);

  return (
    <ol>
      {sortedSnacks.map((snack) => (
        <li key={snack.name}>{snack.name}</li>
      ))}
    </ol>
  );
}
