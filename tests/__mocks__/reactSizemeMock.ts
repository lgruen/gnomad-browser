export const withSize = () => (child: (args: any) => any) => (args: any) =>
  child({ size: { width: 300, height: 100 }, ...args })
