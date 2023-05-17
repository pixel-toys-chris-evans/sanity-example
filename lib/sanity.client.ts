import { apiVersion, dataset, projectId, useCdn } from "./sanity.api";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token:
    "skrfg0BJG8gE8rBf2nKQLtIMqJIe1T9ojP90qrnkOwMw9aTUFDjFQWZYsKmD7yfUdmowuEgPyBlKmtpKEDUtQpo0KewiF4UAsl8tCoRkX0ojjqQ4Cy5TpfsKHUFXD1b35dytAlJxhQb4SSzMDTwy5u3k0dCI6QY3xgHD6jahx0Qgksh5Fj0X",
});
