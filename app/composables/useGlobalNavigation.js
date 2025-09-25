export const useGlobalNavigation = () => {
  const prismic = usePrismic();

  return useLazyAsyncData(
    "global_navigation",
    () => prismic.client.getSingle("global_navigation"),
    {
      server: true,
      default: () => ({ data: { links: [] } }),
    }
  );
};
