SELECT COUNT(*) AS "count", tag FROM "Post" AS s CROSS JOIN LATERAL UNNEST(s."tags") AS tags(tag) GROUP BY tag ORDER BY 1 DESC;


