/**
 * DesktopShareButton
 */

import {
  CopyButton as MantineCopyButton,
  ActionIcon,
  Tooltip,
  Input,
  Box,
} from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { Card } from "@/components/atoms";

/** props for the copy url button */
interface CopyUrlButtonProps {
  /** The url */
  url: string;
}

/**
 * The copy url button
 */
function CopyUrlButton({ url }: CopyUrlButtonProps) {
  return (
    <MantineCopyButton value={url} timeout={2000}>
      {({ copied, copy }) => (
        <Input
          component="div"
          onClick={copy}
          styles={{
            input: {
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
          rightSection={
            <Tooltip
              label={copied ? "Copied" : "Copy"}
              withArrow
              position="right"
              opened={copied}
            >
              <ActionIcon
                color={copied ? "teal" : "gray"}
                onClick={copy}
                aria-label="Copy url to clipboard"
              >
                {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
              </ActionIcon>
            </Tooltip>
          }
        >
          {url}
        </Input>
      )}
    </MantineCopyButton>
  );
}

/**
 * Share button for desktop.
 */
export function DesktopShareButton({ url }: CopyUrlButtonProps) {
  return (
    <Card
      title="Invite others"
      note="Invite other guests to select their dates by sharing the current url."
    >
      <Box p="xs">
        <CopyUrlButton url={url} />
      </Box>
    </Card>
  );
}
