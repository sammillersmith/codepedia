# Conditonals in SQL

## CASE Statement

The `CASE` statement goes through conditions and returns a value when the first condition is met (like an `if`-`else if`-`else` statement). So, once a condition is true, it will stop reading and return the result. If no conditions are true, it returns the value in the `ELSE` clause.

If there is no `ELSE` part and no conditions are true, it returns `NULL`.

```sql
CASE
   WHEN condition1 THEN result1
   WHEN condition2 THEN result2
   WHEN conditionN THEN resultN
   ELSE result
END;
```

Here's an example used to create a new column called `'Review'` that categorize the different `review`s within a `restaurants` table:

```sql
SELECT name,
   CASE
      WHEN review > 4 THEN 'Excellent'
      WHEN review > 3 THEN 'Good'
      WHEN review > 2 THEN 'Fair'
      ELSE 'Poor'
   END AS 'Review'
FROM restaurants;
```