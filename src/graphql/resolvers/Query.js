// A map of functions which return data for the schema.
const Query = {
  hello: () => 'world',
  stories: (parent, args, context) => context.prisma.stories(),
  story: (parent, { id }, context) => context.prisma.story({ id }),
  me: (parent, args, context) => {
    const id = getUserId(context);
    return context.prisma.user({ id });
  },
  users: (parent, args, context) => context.prisma.users(),
};

export default Query;
