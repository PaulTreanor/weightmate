import { Resource } from "sst";
import { Example } from "@weightmate-backend/core/example";

console.log(`${Example.hello()} Linked to ${Resource.MyBucket.name}.`);
