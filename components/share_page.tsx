import {
  CopyButton as MantineCopyButton,
  ActionIcon,
  Tooltip,
  Input,
} from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

import Card from "./card";

function CopyButton() {
  return (
    <MantineCopyButton value={window.location.href} timeout={2000}>
      {({ copied, copy }) => (
        <Input
          component="div"
          onClick={copy}
          rightSection={
            <Tooltip
              label={copied ? "Copied" : "Copy"}
              withArrow
              position="right"
              opened={copied}
            >
              <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
              </ActionIcon>
            </Tooltip>
          }
        >
          {window.location.href}
        </Input>
      )}
    </MantineCopyButton>
  );
}

export default function SharePage() {
  return (
    <Card
      title="Invite others"
      note="Invite other guests to select their dates by sharing the current url."
    >
      <CopyButton />
    </Card>
  );
}
