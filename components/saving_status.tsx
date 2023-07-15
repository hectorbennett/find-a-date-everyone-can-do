import { useEffect, useRef, useState } from "react";
import { Text } from "@mantine/core";
import AppContext from "@/app/app";

export default function SavingStatus() {
  const { isSaving, isSaved, isError } = AppContext.useContainer();

  let savingTimeoutHandle = useRef(setTimeout(() => {}, 0));
  let savedTimeoutHandle = useRef(setTimeout(() => {}, 0));

  const [showSavingSpinner, setShowSavingSpinner] = useState(false);
  const [showIsSavedNote, setShowIsSavedNote] = useState(false);

  useEffect(() => {
    if (!isSaving) {
      return;
    }
    clearTimeout(savingTimeoutHandle.current);
    setShowSavingSpinner(true);
    savingTimeoutHandle.current = setTimeout(() => {
      setShowSavingSpinner(false);
    }, 1000);
  }, [isSaving]);

  useEffect(() => {
    clearTimeout(savedTimeoutHandle.current);
    if (isSaved && !showSavingSpinner) {
      setShowIsSavedNote(true);
      savingTimeoutHandle.current = setTimeout(() => {
        setShowIsSavedNote(false);
      }, 3000);
    }
  }, [isSaved, showIsSavedNote, showSavingSpinner]);

  if (!showSavingSpinner && showIsSavedNote) {
    return (
      <Text c="dimmed" fz="sm" p="xs" align="right">
        All changes saved
      </Text>
    );
  }

  return null;
}
