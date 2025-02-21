import { Message } from "semantic-ui-react";

interface Props {
  errors: string[];
}

export default function ValidationError({ errors }: Props) {
  console.log(errors);
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err, i) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
}
