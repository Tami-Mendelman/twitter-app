import type { ChangeEvent } from "react";
import { isNil } from "lodash/fp";
import type { CreatePostPayload } from "@libs/types/post.type.js";

export const handleMediaChange = (
  event: ChangeEvent<HTMLInputElement>,
  setValue: (field: keyof CreatePostPayload, value: string) => void,
): void => {
  const file = event.target.files?.[0];
  if (isNil(file)) return;
  const reader = new FileReader();
  reader.onload = () => setValue("media", String(reader.result));
  reader.readAsDataURL(file);
};
