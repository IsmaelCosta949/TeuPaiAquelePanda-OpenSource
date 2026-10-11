import type { Route } from "./+types/conversor-de-timestamp";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import TimestampConverter from "~/components/timestampConverter";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("conversor-de-timestamp");
}

export default function Page() {
  return (
    <ToolPage
      slug="conversor-de-timestamp"
    >
      <TimestampConverter />
    </ToolPage>
  );
}
