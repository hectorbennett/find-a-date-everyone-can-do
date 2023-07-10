import { useNavigatorShare } from "@/app/utils";
import { Button } from "@mantine/core";
import { IconShare } from "@tabler/icons-react";

export default function ShareButton() {
  const { isLoading, canShare, shareData } = useNavigatorShare();
  if (isLoading || !canShare) {
    return null;
  }

  const share = async () => {
    try {
      await navigator.share(shareData);
    } catch (e: any) {
      if (e.toString().includes("AbortError")) {
        return;
      }
    }
  };
  return (
    <Button leftIcon={<IconShare />} onClick={share}>
      Invite
    </Button>
  );
}
