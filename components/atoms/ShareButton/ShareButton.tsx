/**
 * ShareButton.tsx
 */

import { Button } from "@mantine/core";
import { IconShare } from "@tabler/icons-react";

/**
 * Share button props.
 */
interface ShareButtonProps {
  /** on click callback. */
  onClickShare: () => void;
}

/**
 * Share Button component
 */
export function ShareButton({ onClickShare }: ShareButtonProps) {
  return (
    <Button leftIcon={<IconShare />} onClick={onClickShare}>
      Invite
    </Button>
  );
}
