
import { fragmentsRouter } from '../fragments/server/procedures';
import {  createTRPCRouter } from '../init';
import { messagesRouter } from '../messages/server/procedures';
import { projectsRouter } from '../projects/server/procedures';
export const appRouter = createTRPCRouter({
  messages: messagesRouter,
  fragments: fragmentsRouter,
  projects: projectsRouter
});

export type AppRouter = typeof appRouter;