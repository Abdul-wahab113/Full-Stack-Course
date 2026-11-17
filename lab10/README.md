# Lab 10 – PostgreSQL and TypeORM with NestJS

## Setup

```bash
docker run -d --name lab10_postgres -e POSTGRES_USER=lab10 -e POSTGRES_PASSWORD=lab10pass -e POSTGRES_DB=lab10_db -p 5433:5432 postgres:16-alpine
cp .env.example .env   # then set DB_PASSWORD
npm install
npm run start:dev
```

Task 1 SQL is in `task1.sql`. Screenshots go in `screenshots/` (task1.png, task2.png, ...).

## Endpoints

| Method | Path | Task |
|---|---|---|
| POST/GET | `/users`, `/users/:id` | manual |
| GET | `/users/:id/stats` | 5 |
| POST/GET/PATCH/DELETE | `/categories`, `/categories/:id` | 3 |
| POST/GET/PATCH/DELETE | `/notes`, `/notes/:id` | 4 |
| GET | `/notes?page=&limit=&search=&tag=&categoryId=` | 6 |

## Reflection Questions

**1. What problem does an ORM solve, and what is one disadvantage?**
An ORM maps database tables to classes, so we work with objects instead of writing raw SQL for every
query, and it handles relations, type safety and different databases. A disadvantage is that it hides
the generated SQL, which can be inefficient (e.g. N+1 queries) and harder to tune for complex queries.

**2. Difference between `repository.create()` and `repository.save()`?**
`create()` only builds an entity object in memory from plain data; nothing is written to the database.
`save()` actually runs the INSERT (or UPDATE if the entity already exists) and returns the saved entity
with generated values such as `id`.

**3. In a one-to-many relationship, which table holds the foreign key? Which decorator creates the junction table?**
The "many" side holds the foreign key (e.g. `notes.categoryId`, defined with `@ManyToOne`).
In a many-to-many relationship, `@JoinTable()` creates the junction table (here `note_tags`).

**4. Why is `synchronize: true` dangerous in production, and what should be used instead?**
It alters the schema automatically on every start to match the entities, so renaming or removing a
column can silently drop data. In production we turn it off and use migrations, which are versioned,
reviewed and can be rolled back.

**5. Why store database credentials in `.env` instead of source code?**
Source code is shared and pushed to Git, so hardcoded passwords would leak to anyone with access.
`.env` is ignored by Git, keeps secrets out of history, and lets each environment (dev, prod) use its own
values without changing the code. Only `.env.example` without real secrets is committed.
