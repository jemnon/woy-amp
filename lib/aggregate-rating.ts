interface RatingsReturnType {
  ratingsAvg: number;
  ratingsTotal: number;
}

export const getAggregteRating = (
  comments?: any[],
): RatingsReturnType | null => {
  if (!comments) return null;
  const mappedComments = comments
    .filter(comment => comment.rating && comment.rating !== 0)
    .map(comment => comment.rating);
  const sum = mappedComments.reduce((acc, val) => {
    if (acc && val) return acc + val;
  });
  const ratingsTotal = mappedComments.length;
  const avg = sum ? sum / ratingsTotal : 0;
  const ratingsAvg = Number(avg.toFixed(2));
  return {
    ratingsAvg,
    ratingsTotal,
  };
};
