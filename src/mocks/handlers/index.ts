import { userHandle } from "./user.handle";
import { testHandle } from "./test.handler";

export const handlers = [
    ...userHandle,
    ...testHandle,
];