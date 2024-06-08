
type ChoiceProps = {
  condition: boolean;
  children: React.ReactNode;
};

export const Choice = {
  When: ({ condition, children }: ChoiceProps) => (condition ? children : null),
  Then: ({ condition, children }: ChoiceProps) => (!condition ? children : null),
  And: ({ condition, children }: ChoiceProps) => condition && children,
};