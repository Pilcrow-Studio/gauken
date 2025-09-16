// /server/api/revalidate.post.ts
interface PrismicDocument {
  type: string;
  uid: string;
}

interface PrismicWebhookPayload {
  documents: PrismicDocument[];
}

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as PrismicWebhookPayload;

  // Optional: Verify webhook secret
  const secret = getQuery(event).secret;
  if (secret !== process.env.REVALIDATE_SECRET) {
    throw createError({ statusCode: 401, statusMessage: "Invalid secret" });
  }

  // Extract paths to revalidate based on document types
  const pathsToRevalidate = new Set(["/"]); // Always revalidate home page

  // Handle Prismic webhook payload
  if (body.documents && Array.isArray(body.documents)) {
    body.documents.forEach((doc: PrismicDocument) => {
      const docType = doc.type;
      const docUid = doc.uid;

      switch (docType) {
        case "front_page":
          pathsToRevalidate.add("/");
          break;
        case "page":
          if (docUid) {
            pathsToRevalidate.add(`/${docUid}`);
          }
          break;
        case "art_piece":
          if (docUid) {
            pathsToRevalidate.add(`/work/${docUid}`);
          }
          // Also revalidate home page since art pieces are displayed there
          pathsToRevalidate.add("/");
          break;
        case "exhibitions":
          if (docUid) {
            pathsToRevalidate.add(`/exhibitions/${docUid}`);
          }
          break;
        case "global_navigation":
          // Global navigation affects all pages
          pathsToRevalidate.add("/");
          break;
        case "footer":
          // Footer affects all pages
          pathsToRevalidate.add("/");
          break;
        default:
          // For unknown types, revalidate home page as fallback
          pathsToRevalidate.add("/");
      }
    });
  }

  // Revalidate all collected paths
  const revalidationPromises = Array.from(pathsToRevalidate).map(
    async (path) => {
      try {
        await $fetch("/api/_nitro/revalidate", {
          method: "POST",
          body: { path },
        });
        console.log(`Revalidated: ${path}`);
      } catch (error) {
        console.error(`Failed to revalidate ${path}:`, error);
      }
    }
  );

  await Promise.all(revalidationPromises);

  return {
    revalidated: true,
    paths: Array.from(pathsToRevalidate),
    count: pathsToRevalidate.size,
  };
});
