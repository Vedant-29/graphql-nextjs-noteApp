import { Context } from './index';

export const resolvers = {
  Query: {
    notes: async (_: any, __: any, { prisma }: Context) => {
      return await prisma.note.findMany({
        orderBy: { createdAt: 'desc' },
      });
    },

    note: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      return await prisma.note.findUnique({
        where: { id },
      });
    },
  },

  Mutation: {
    createNote: async (
      _:any,
      {title, content} : {title: string, content: string},
      {prisma} : Context
    ) => {
      return await prisma.note.create({
        data: {
          title,
          content,
        },
      });
    },

    updateNote: async (
      _: any,
      { id, title, content }: { id: string; title?: string; content?: string },
      { prisma }: Context
    ) => {
      return await prisma.note.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(content && { content }),
        },
      });
    },

    deleteNote: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      await prisma.note.delete({
        where: { id },
      });
      return true;
    },
  },
};