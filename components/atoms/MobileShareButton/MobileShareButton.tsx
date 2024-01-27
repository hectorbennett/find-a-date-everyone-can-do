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
 * Share Button component for mobile.
 */
export function MobileShareButton({ onClickShare }: ShareButtonProps) {
  return (
    <Button leftIcon={<IconShare />} onClick={onClickShare}>
      Invite
    </Button>
  );
}
