const formatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

export function formatDate(value) {
  return formatter.format(new Date(value));
}
