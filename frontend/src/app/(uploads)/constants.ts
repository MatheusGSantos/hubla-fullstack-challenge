export const TABLE_COLUMNS = [
  { label: "ID", className: "w-[100px]" },
  { label: "File Name" },
  {
    label: "Uploaded at",
    className: "w-[250px]",
    transform: (value: string) => {
      try {
        const date = new Date(value);

        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      } catch {
        return value;
      }
    },
  },
];
