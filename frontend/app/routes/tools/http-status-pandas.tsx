import type { Route } from "./+types/http-status-pandas";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import HttpStatusPandas from "~/components/httpStatusPandas";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("http-status-pandas");
}

export default function Page() {
  return (
    <ToolPage slug="http-status-pandas">
      <HttpStatusPandas />
    </ToolPage>
  );
}
